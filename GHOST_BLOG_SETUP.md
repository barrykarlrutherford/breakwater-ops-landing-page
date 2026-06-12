# Ghost blog setup

Goal: publish the Breakwater blog at `https://blog.breakwaterops.com` while keeping the main site at `https://breakwaterops.com`.

## DNS

`breakwaterops.com` is using Namecheap nameservers, so add this record in Namecheap DNS:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| CNAME | `blog` | `[your-ghost-publication].ghost.io` | Automatic |

Do not change the root `@` records for `breakwaterops.com`; the blog should live only on the `blog` subdomain.

## Ghost Admin

In Ghost Admin, sign in as the staff owner and go to:

`Settings` -> `Ghost(Pro)` -> `Domain`

Set the custom domain to:

`blog.breakwaterops.com`

Ghost(Pro) will validate DNS and issue SSL automatically after the CNAME resolves.

## Brand settings

Use these values in Ghost so the transition from the main site feels consistent:

- Publication name: `Breakwater Operations`
- Site URL: `https://blog.breakwaterops.com`
- Logo: `images/breakwater-logo.png`
- Icon: `images/breakwater-logo-no-text.png`
- Primary navigation:
  - `Home` -> `https://breakwaterops.com`
  - `Services` -> `https://breakwaterops.com/#services`
  - `Team` -> `https://breakwaterops.com/#team`
  - `Contact` -> `https://breakwaterops.com/#contact`
- Secondary navigation:
  - `Northern New Mexico Nonprofits` -> `https://breakwaterops.com/nonprofits`

## Code Injection (Theme Styling)

To match the styling of the main Breakwater site, go to **Settings** -> **Advanced** -> **Code injection** in Ghost Admin and paste the following code snippets.

### Site Header Injection

Paste this block into the **Site Header** box:

```html
<!-- Import Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">

<style>
    /* 1. Define Breakwater Design Tokens */
    :root {
        --color-ink: #17202a;
        --color-muted: #53616f;
        --color-line: #d9e0e6;
        --color-paper: #ffffff;
        --color-logo-bg: #fcfaf7;
        --color-soft: #f4f7f8;
        --color-navy: #1d3548;
        --color-teal: #287271;
        --color-gold: #b7791f;

        /* Override Ghost core accent variables */
        --ghost-accent-color: var(--color-teal) !important;
    }

    /* 2. Global Typography & Core Elements */
    body, 
    p, 
    span, 
    li, 
    input, 
    textarea, 
    button,
    .gh-body,
    .gh-content {
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        color: var(--color-ink) !important;
        line-height: 1.6 !important;
    }

    h1, h2, h3, h4, h5, h6, 
    .gh-card-title,
    .post-title,
    .site-title,
    .gh-header h1 {
        font-family: "Playfair Display", Georgia, serif !important;
        font-weight: 700 !important;
        color: var(--color-navy) !important;
    }

    /* 3. Link & Nav Overrides */
    a {
        color: var(--color-teal);
        transition: color 0.2s ease, text-decoration 0.2s ease;
    }

    a:hover {
        color: var(--color-navy);
        text-decoration: underline;
    }

    /* 4. Header / Navigation Customization */
    .gh-head, 
    .site-header,
    header,
    .gh-navigation {
        background-color: var(--color-logo-bg) !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    }

    .gh-head-link,
    .nav a {
        color: var(--color-ink) !important;
        font-weight: 500 !important;
    }

    .gh-head-link:hover,
    .nav a:hover {
        color: var(--color-teal) !important;
    }

    /* 5. Post Cards & Lists Hover States */
    .gh-card,
    .post-card {
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
    }

    .gh-card:hover,
    .post-card:hover {
        transform: translateY(-4px);
    }

    .gh-card-excerpt,
    .post-excerpt {
        color: var(--color-muted) !important;
        font-size: 0.95rem !important;
    }

    /* 6. Buttons / Portal Elements */
    .gh-button,
    .button,
    .btn,
    .gh-signup-btn,
    .gh-portal-btn,
    input[type="submit"] {
        background-color: var(--color-teal) !important;
        color: var(--color-paper) !important;
        font-family: "Plus Jakarta Sans", sans-serif !important;
        font-weight: 600 !important;
        border-radius: 6px !important;
        border: none !important;
        transition: background-color 0.2s ease, transform 0.2s ease !important;
    }

    .gh-button:hover,
    .button:hover,
    .btn:hover,
    .gh-signup-btn:hover,
    input[type="submit"]:hover {
        background-color: var(--color-navy) !important;
        color: var(--color-paper) !important;
    }

    /* 7. Footer Customization */
    .gh-foot,
    footer,
    .site-footer {
        background-color: var(--color-navy) !important;
        color: var(--color-paper) !important;
        border-top: 1px solid var(--color-line) !important;
        padding: 40px 0 !important;
    }

    .gh-foot a,
    footer a,
    .site-footer a {
        color: rgba(255, 255, 255, 0.8) !important;
    }

    .gh-foot a:hover,
    footer a:hover,
    .site-footer a:hover {
        color: var(--color-paper) !important;
        text-decoration: underline !important;
    }
</style>
```

### Site Footer Injection

Paste this block into the **Site Footer** box:

```html
<!-- Load Lucide Icons if used in any theme content/cards -->
<script src="https://unpkg.com/lucide@1.17.0"></script>
<script>
    if (window.lucide) {
        window.lucide.createIcons({
            attrs: {
                'aria-hidden': 'true',
                'stroke-width': 1.8
            }
        });
    }

    // Scroll listener for sticky navbar effect on Ghost headers if applicable
    const nav = document.querySelector('.gh-head') || document.querySelector('.site-header');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
</script>
```

## Verification

After Ghost activates the domain, check:

```sh
dig +short blog.breakwaterops.com CNAME
curl -I https://blog.breakwaterops.com
```

The first command should return the Ghost hostname. The second should return a successful HTTPS response.
