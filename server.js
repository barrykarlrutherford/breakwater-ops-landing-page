import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const PORT = process.env.PORT || 3000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.4-nano';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';
const PUBLIC_DIR = process.cwd();
const CONTACT_SECTION_LINK = '[book a consultation](#contact)';

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const systemPrompt = `
You are the Breakwater Operations website assistant.
Your job is to answer briefly, qualify fit, and guide visitors toward booking a 30-minute Calendly consultation.

Business context:
- Breakwater Operations provides strategic AI assessment, readiness review, AI audit and optimization, team training, and advisory support.
- Breakwater serves organizations in northern New Mexico, with a practical focus on operating reality over AI hype.
- Breakwater does not sell bespoke AI implementation, proprietary automation packages, or custom AI builds.
- Barry Rutherford brings senior operating, supply chain, retail, luxury brand, client development, and global strategy experience.
- Griffin Rutherford brings technical AI research credibility through Coherascent Labs.
- Pricing is customized by organization size, scope, and complexity after a consultation.

Behavior:
- Keep responses under 90 words unless the user asks for detail.
- Be direct, grounded, and calm.
- Do not pretend to schedule the appointment yourself.
- When appropriate, use exactly this concise Markdown link: ${CONTACT_SECTION_LINK}
- Do not write out the raw Calendly URL.
- If the user asks for medical, legal, financial, or emergency advice, say Breakwater cannot advise on that and suggest a qualified professional.
`;

function sendJson(response, status, body) {
    response.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    });
    response.end(JSON.stringify(body));
}

function getResponseText(data) {
    if (typeof data.output_text === 'string' && data.output_text.trim()) {
        return data.output_text.trim();
    }

    const text = data.output
        ?.flatMap(item => item.content || [])
        ?.map(content => content.text)
        ?.filter(Boolean)
        ?.join('\n')
        ?.trim();

    return text || `I can help with a few basics, but the best next step is to ${CONTACT_SECTION_LINK}.`;
}

async function readRequestJson(request) {
    const chunks = [];

    for await (const chunk of request) {
        chunks.push(chunk);
    }

    const rawBody = Buffer.concat(chunks).toString('utf8');
    return rawBody ? JSON.parse(rawBody) : {};
}

function normalizeHistory(history) {
    if (!Array.isArray(history)) {
        return [];
    }

    return history
        .filter(item => item && ['user', 'assistant'].includes(item.role) && typeof item.content === 'string')
        .slice(-8)
        .map(item => ({
            role: item.role,
            content: item.content.slice(0, 1200)
        }));
}

async function handleChat(request, response) {
    if (!OPENAI_API_KEY) {
        sendJson(response, 500, { error: 'OPENAI_API_KEY is not configured.' });
        return;
    }

    let body;

    try {
        body = await readRequestJson(request);
    } catch {
        sendJson(response, 400, { error: 'Invalid JSON body.' });
        return;
    }

    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 1600) : '';

    if (!message) {
        sendJson(response, 400, { error: 'Message is required.' });
        return;
    }

    const input = [
        ...normalizeHistory(body.history),
        { role: 'user', content: message }
    ];

    try {
        const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: OPENAI_MODEL,
                instructions: systemPrompt,
                input,
                max_output_tokens: 350
            })
        });

        const data = await openaiResponse.json();

        if (!openaiResponse.ok) {
            console.error('OpenAI API error:', data);
            sendJson(response, 502, { error: 'The chat service is unavailable.' });
            return;
        }

        sendJson(response, 200, { reply: getResponseText(data) });
    } catch (error) {
        console.error('Chat request failed:', error);
        sendJson(response, 502, { error: 'The chat service is unavailable.' });
    }
}

async function serveStatic(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    const requestPath = url.pathname === '/' ? '/index.html' : decodeURIComponent(url.pathname);
    const filePath = normalize(join(PUBLIC_DIR, requestPath));

    if (!filePath.startsWith(PUBLIC_DIR)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
    }

    try {
        const file = await readFile(filePath);
        response.writeHead(200, {
            'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream'
        });
        response.end(file);
    } catch {
        const fallback = await readFile(join(PUBLIC_DIR, 'index.html'));
        response.writeHead(200, { 'Content-Type': mimeTypes['.html'] });
        response.end(fallback);
    }
}

createServer(async (request, response) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (request.method === 'OPTIONS' && url.pathname === '/api/chat') {
        sendJson(response, 204, {});
        return;
    }

    if (request.method === 'POST' && url.pathname === '/api/chat') {
        await handleChat(request, response);
        return;
    }

    if (request.method === 'GET' || request.method === 'HEAD') {
        await serveStatic(request, response);
        return;
    }

    response.writeHead(405);
    response.end('Method Not Allowed');
}).listen(PORT, () => {
    console.log(`Breakwater site listening on port ${PORT}`);
});
