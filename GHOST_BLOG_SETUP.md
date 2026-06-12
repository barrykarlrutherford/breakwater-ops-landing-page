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
  - `How We Help` -> `https://breakwaterops.com/#how-we-help`
  - `Services` -> `https://breakwaterops.com/#services`
  - `Approach` -> `https://breakwaterops.com/#approach`
  - `Team` -> `https://breakwaterops.com/#team`
  - `Blog` -> `https://blog.breakwaterops.com`
  - `Get Started` -> `https://breakwaterops.com/#contact`
- Secondary navigation:
  - `Northern New Mexico Nonprofits` -> `https://breakwaterops.com/nonprofits`

## Code Injection

The code below inserts the same header and footer markup used by the homepage and hides the Ghost theme's native header and footer. The custom components use `bw-` class names so Ghost theme styles do not alter their layout.

Go to **Settings** -> **Advanced** -> **Code injection** in Ghost Admin and paste the following code snippets.

### Site Header Injection

Paste this block into the **Site Header** box:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">

<style>
    :root {
        --bw-ink: #17202a;
        --bw-muted: #53616f;
        --bw-line: #d9e0e6;
        --bw-paper: #ffffff;
        --bw-logo-bg: #fcfaf7;
        --bw-navy: #1d3548;
        --bw-teal: #287271;
        --ghost-accent-color: var(--bw-teal);
    }

    body,
    .gh-body,
    .gh-content {
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--bw-ink);
    }

    .site-content p,
    .site-content span,
    .site-content li,
    .site-content input,
    .site-content textarea,
    .site-content button,
    .gh-body,
    .gh-content {
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
        color: var(--bw-ink) !important;
        line-height: 1.6 !important;
    }

    .site-content h1,
    .site-content h2,
    .site-content h3,
    .site-content h4,
    .site-content h5,
    .site-content h6,
    .gh-card-title,
    .post-title,
    .site-title,
    .gh-header h1 {
        font-family: "Playfair Display", Georgia, serif;
        color: var(--bw-navy);
        font-weight: 700;
    }

    .site-content a {
        color: var(--bw-teal);
        transition: color 0.2s ease, text-decoration 0.2s ease;
    }

    .site-content a:hover {
        color: var(--bw-navy);
        text-decoration: underline;
    }

    .gh-card,
    .post-card {
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
    }

    .gh-card:hover,
    .post-card:hover {
        transform: translateY(-4px);
    }

    .gh-card-excerpt,
    .post-excerpt {
        color: var(--bw-muted) !important;
        font-size: 0.95rem !important;
    }

    .site-content .gh-button,
    .site-content .button,
    .site-content .btn,
    .site-content .gh-signup-btn,
    .site-content .gh-portal-btn,
    .site-content input[type="submit"] {
        border: 0 !important;
        border-radius: 6px !important;
        color: var(--bw-paper) !important;
        background: var(--bw-teal) !important;
        font-family: "Plus Jakarta Sans", sans-serif !important;
        font-weight: 600 !important;
        transition: background-color 0.2s ease, transform 0.2s ease !important;
    }

    .site-content .gh-button:hover,
    .site-content .button:hover,
    .site-content .btn:hover,
    .site-content .gh-signup-btn:hover,
    .site-content input[type="submit"]:hover {
        color: var(--bw-paper) !important;
        background: var(--bw-navy) !important;
    }

    /* Prevent the native theme chrome from appearing before JavaScript runs. */
    .gh-head,
    .site-header,
    .gh-foot,
    .site-footer {
        display: none !important;
    }

    #bw-header,
    #bw-header *,
    #bw-footer,
    #bw-footer * {
        box-sizing: border-box;
    }

    .bw-container {
        width: min(1120px, calc(100% - 40px));
        margin: 0 auto;
    }

    #bw-header {
        position: sticky;
        top: 0;
        z-index: 1000;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        background: var(--bw-logo-bg);
        backdrop-filter: blur(12px);
        transition: all 0.3s ease-in-out;
    }

    #bw-header .bw-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        min-height: 120px;
        padding: 10px 0;
        transition: all 0.3s ease-in-out;
    }

    #bw-header.bw-scrolled {
        border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    #bw-header.bw-scrolled .bw-container {
        min-height: 80px;
    }

    .bw-logo {
        display: flex;
        align-items: center;
        max-height: 160px;
    }

    .bw-logo img {
        display: block;
        width: auto;
        height: 160px;
        max-width: 100%;
        object-fit: contain;
        transition: all 0.3s ease-in-out;
    }

    #bw-header.bw-scrolled .bw-logo img {
        height: 90px;
    }

    .bw-nav-links {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 18px;
    }

    .bw-nav-links a {
        color: var(--bw-ink);
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 0.92rem;
        font-weight: 600;
        line-height: 1.6;
        text-decoration: none;
    }

    .bw-nav-links a:hover {
        text-decoration: underline;
    }

    .bw-nav-links .bw-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 40px;
        padding: 8px 20px;
        border: 1px solid transparent;
        border-radius: 6px;
        color: #fff;
        background: var(--bw-teal);
        font-weight: 700;
        line-height: 1.2;
    }

    .bw-menu-toggle {
        display: none;
        z-index: 20;
        padding: 10px;
        border: 0;
        background: transparent;
        cursor: pointer;
    }

    .bw-hamburger {
        position: relative;
        display: block;
        width: 24px;
        height: 2px;
        background: var(--bw-ink);
        transition: background 0.2s ease-out;
    }

    .bw-hamburger::before,
    .bw-hamburger::after {
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
        background: var(--bw-ink);
        content: "";
        transition: all 0.2s ease-out;
    }

    .bw-hamburger::before {
        top: 8px;
    }

    .bw-hamburger::after {
        bottom: 8px;
    }

    .bw-menu-toggle.bw-active .bw-hamburger {
        background: transparent;
    }

    .bw-menu-toggle.bw-active .bw-hamburger::before {
        top: 0;
        transform: rotate(45deg);
    }

    .bw-menu-toggle.bw-active .bw-hamburger::after {
        bottom: 0;
        transform: rotate(-45deg);
    }

    #bw-footer {
        padding: 54px 0 28px;
        color: rgba(255, 255, 255, 0.82);
        background: var(--bw-navy);
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 16px;
        line-height: 1.6;
    }

    .bw-footer-content {
        display: grid;
        grid-template-columns: 1.5fr 1fr 1fr;
        gap: 24px;
    }

    #bw-footer h4 {
        margin: 0;
        color: #fff;
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 16px;
        line-height: 1.15;
    }

    #bw-footer p {
        margin: 0 0 16px;
        color: rgba(255, 255, 255, 0.82);
        font-size: 16px;
        line-height: 1.6;
    }

    #bw-footer a {
        color: #fff;
        text-decoration: none;
    }

    #bw-footer a:hover {
        text-decoration: underline;
    }

    .bw-footer-links {
        margin: 14px 0 0;
        padding: 0;
        list-style: none;
    }

    .bw-footer-bottom {
        margin-top: 34px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.18);
    }

    @media (max-width: 960px) {
        #bw-header .bw-container {
            min-height: 80px;
        }

        .bw-logo {
            max-height: 120px;
        }

        .bw-logo img {
            height: 120px;
        }

        #bw-header.bw-scrolled .bw-logo img {
            height: 90px;
        }

        .bw-menu-toggle {
            display: block;
        }

        .bw-nav-links {
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            display: none;
            flex-direction: column;
            gap: 24px;
            padding: 40px;
            border-bottom: 1px solid var(--bw-line);
            background: var(--bw-logo-bg);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .bw-nav-links.bw-active {
            display: flex;
        }

        .bw-nav-links a {
            width: 100%;
            font-size: 1.2rem;
            text-align: center;
        }

        .bw-footer-content {
            grid-template-columns: 1fr;
        }
    }
</style>
```

### Site Footer Injection

Paste this block into the **Site Footer** box:

```html
<script>
    (() => {
        const headerMarkup = `
            <nav id="bw-header" aria-label="Main navigation">
                <div class="bw-container">
                    <a href="https://breakwaterops.com/" class="bw-logo">
                        <img src="https://breakwaterops.com/images/breakwater-logo.png" alt="Breakwater Operations">
                    </a>
                    <button class="bw-menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
                        <span class="bw-hamburger"></span>
                    </button>
                    <div class="bw-nav-links">
                        <a href="https://breakwaterops.com/#how-we-help">How We Help</a>
                        <a href="https://breakwaterops.com/#services">Services</a>
                        <a href="https://breakwaterops.com/#approach">Approach</a>
                        <a href="https://breakwaterops.com/#team">Team</a>
                        <a href="https://blog.breakwaterops.com">Blog</a>
                        <a href="https://breakwaterops.com/#contact" class="bw-cta">Get Started</a>
                    </div>
                </div>
            </nav>
        `;

        const footerMarkup = `
            <footer id="bw-footer">
                <div class="bw-container">
                    <div class="bw-footer-content">
                        <div class="bw-footer-section">
                            <h4>Breakwater Operations</h4>
                            <p>Independent operational and AI advisory. Clear decisions. Practical delivery.</p>
                        </div>
                        <div class="bw-footer-section">
                            <h4>Connect</h4>
                            <ul class="bw-footer-links">
                                <li><a href="https://barryrutherford.com" target="_blank" rel="noopener">barryrutherford.com</a></li>
                                <li><a href="https://griffinrutherford.com" target="_blank" rel="noopener">griffinrutherford.com</a></li>
                                <li><a href="https://malestrum.com" target="_blank" rel="noopener">Malestrum</a></li>
                                <li><a href="https://breakwaterops.com/nonprofits">Northern New Mexico Nonprofits</a></li>
                                <li><a href="https://blog.breakwaterops.com">Breakwater Blog</a></li>
                            </ul>
                        </div>
                        <div class="bw-footer-section">
                            <h4>Contact</h4>
                            <p><a href="mailto:barry@breakwaterops.com">barry@breakwaterops.com</a></p>
                        </div>
                    </div>
                    <div class="bw-footer-bottom">
                        <p>&copy; 2026 Breakwater Operations. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;

        document.body.insertAdjacentHTML("afterbegin", headerMarkup);

        const nativeHeader = document.querySelector(
            ".gh-head:not(#bw-header), .site-header:not(#bw-header)"
        );
        const nativeFooter = document.querySelector(
            ".gh-foot:not(#bw-footer), .site-footer:not(#bw-footer)"
        );

        if (nativeHeader) {
            nativeHeader.hidden = true;
        }

        if (nativeFooter) {
            nativeFooter.insertAdjacentHTML("beforebegin", footerMarkup);
            nativeFooter.hidden = true;
        } else {
            document.body.insertAdjacentHTML("beforeend", footerMarkup);
        }

        const header = document.querySelector("#bw-header");
        const menuToggle = header.querySelector(".bw-menu-toggle");
        const navLinks = header.querySelector(".bw-nav-links");

        const closeMenu = () => {
            menuToggle.classList.remove("bw-active");
            navLinks.classList.remove("bw-active");
            menuToggle.setAttribute("aria-expanded", "false");
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("bw-active");
            menuToggle.classList.toggle("bw-active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("scroll", () => {
            header.classList.toggle("bw-scrolled", window.scrollY > 50);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 960) {
                closeMenu();
            }
        });
    })();
</script>
```

## Verification

After Ghost activates the domain and the code injection is saved:

1. Open the blog homepage and a post page at desktop and mobile widths.
2. Confirm there is only one header and one footer.
3. Confirm the header shrinks after scrolling 50 pixels.
4. Confirm the mobile menu opens, closes, and updates `aria-expanded`.
5. Confirm every homepage section link leaves the blog and opens the correct section on `breakwaterops.com`.
6. Confirm the logo loads from `https://breakwaterops.com/images/breakwater-logo.png`.

Check the domain from a terminal:

```sh
dig +short blog.breakwaterops.com CNAME
curl -I https://blog.breakwaterops.com
```

The first command should return the Ghost hostname. The second should return a successful HTTPS response.
