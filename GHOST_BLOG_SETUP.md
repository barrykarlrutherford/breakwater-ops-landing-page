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

The code below inserts the same header and footer used by the homepage and hides the Ghost theme's native versions.

Go to **Settings** -> **Advanced** -> **Code injection** in Ghost Admin. Delete the existing contents of both code-injection boxes before pasting these replacements. The header is fully contained in the Site Header box; it no longer depends on the Site Footer script.

### Site Header Injection

Paste this block into the **Site Header** box:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&amp;family=Plus+Jakarta+Sans:wght@400;500;600;700&amp;display=swap" rel="stylesheet">

<style>
    :root {
        --color-ink: #17202a;
        --color-muted: #53616f;
        --color-paper: #ffffff;
        --color-navy: #1d3548;
        --color-teal: #287271;
        --ghost-accent-color: var(--color-teal);
    }

    body,
    .gh-body,
    .gh-content {
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: var(--color-ink);
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
        color: var(--color-ink) !important;
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
        color: var(--color-navy);
        font-weight: 700;
    }

    .site-content a {
        color: var(--color-teal);
        transition: color 0.2s ease, text-decoration 0.2s ease;
    }

    .site-content a:hover {
        color: var(--color-navy);
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
        color: var(--color-muted) !important;
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
        color: var(--color-paper) !important;
        background: var(--color-teal) !important;
        font-family: "Plus Jakarta Sans", sans-serif !important;
        font-weight: 600 !important;
        transition: background-color 0.2s ease, transform 0.2s ease !important;
    }

    .site-content .gh-button:hover,
    .site-content .button:hover,
    .site-content .btn:hover,
    .site-content .gh-signup-btn:hover,
    .site-content input[type="submit"]:hover {
        color: var(--color-paper) !important;
        background: var(--color-navy) !important;
    }

    /* Hide Rand's header and any header left by the previous injection. */
    .gh-head,
    .site-header,
    #bw-header {
        display: none !important;
    }
</style>

<script>
    (() => {
        const elementName = "breakwater-site-header";

        if (!customElements.get(elementName)) {
            class BreakwaterSiteHeader extends HTMLElement {
                connectedCallback() {
                    if (this.shadowRoot) {
                        return;
                    }

                    const root = this.attachShadow({ mode: "open" });
                    root.innerHTML = `
                        <style>
                            * {
                                box-sizing: border-box;
                            }

                            :host {
                                position: sticky;
                                top: 0;
                                z-index: 10;
                                display: block;
                                color: #17202a;
                                font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                                font-size: 16px;
                                line-height: 1.6;
                            }

                            a {
                                color: #287271;
                                text-decoration: none;
                            }

                            a:hover {
                                text-decoration: underline;
                            }

                            .container {
                                width: min(1120px, calc(100% - 40px));
                                margin: 0 auto;
                            }

                            .nav {
                                position: relative;
                                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                                background: #fcfaf7;
                                backdrop-filter: blur(12px);
                                transition: all 0.3s ease-in-out;
                            }

                            .nav .container {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                gap: 24px;
                                min-height: 120px;
                                padding: 10px 0;
                                transition: all 0.3s ease-in-out;
                            }

                            .nav.scrolled {
                                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                                background: #fcfaf7;
                            }

                            .nav.scrolled .container {
                                min-height: 80px;
                            }

                            .menu-toggle {
                                z-index: 20;
                                display: none;
                                padding: 10px;
                                border: 0;
                                background: transparent;
                                cursor: pointer;
                            }

                            .hamburger {
                                position: relative;
                                display: block;
                                width: 24px;
                                height: 2px;
                                background: #17202a;
                                transition: background 0.2s ease-out;
                            }

                            .hamburger::before,
                            .hamburger::after {
                                position: absolute;
                                display: block;
                                width: 100%;
                                height: 100%;
                                background: #17202a;
                                content: "";
                                transition: all 0.2s ease-out;
                            }

                            .hamburger::before {
                                top: 8px;
                            }

                            .hamburger::after {
                                bottom: 8px;
                            }

                            .menu-toggle.active .hamburger {
                                background: transparent;
                            }

                            .menu-toggle.active .hamburger::before {
                                top: 0;
                                transform: rotate(45deg);
                            }

                            .menu-toggle.active .hamburger::after {
                                bottom: 0;
                                transform: rotate(-45deg);
                            }

                            .logo {
                                display: flex;
                                align-items: center;
                                max-height: 160px;
                            }

                            .logo img {
                                display: block;
                                width: auto;
                                height: 160px;
                                max-width: 100%;
                                object-fit: contain;
                                transition: all 0.3s ease-in-out;
                            }

                            .nav.scrolled .logo img {
                                height: 90px;
                            }

                            .nav-links {
                                display: flex;
                                align-items: center;
                                flex-wrap: wrap;
                                gap: 18px;
                            }

                            .nav-links a {
                                color: #17202a;
                                font-size: 0.92em;
                                font-weight: 600;
                            }

                            .nav-links a.cta-button {
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                min-height: 40px;
                                padding: 8px 20px;
                                border: 1px solid transparent;
                                border-radius: 6px;
                                color: #fff;
                                background: #287271;
                                font-weight: 700;
                                line-height: 1.2;
                            }

                            @media (max-width: 960px) {
                                .nav .container {
                                    min-height: 80px;
                                }

                                .logo {
                                    max-height: 100px;
                                }

                                .menu-toggle {
                                    display: block;
                                }

                                .nav-links {
                                    position: absolute;
                                    top: 100%;
                                    right: 0;
                                    left: 0;
                                    display: none;
                                    flex-direction: column;
                                    gap: 24px;
                                    padding: 40px;
                                    border-bottom: 1px solid #d9e0e6;
                                    background: #fcfaf7;
                                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                                }

                                .nav-links.active {
                                    display: flex;
                                }

                                .nav-links a {
                                    width: 100%;
                                    font-size: 1.2em;
                                    text-align: center;
                                }

                                .logo img {
                                    height: 120px;
                                }
                            }
                        </style>

                        <nav class="nav" aria-label="Main navigation">
                            <div class="container">
                                <a href="https://breakwaterops.com/" class="logo">
                                    <img src="https://breakwaterops.com/images/breakwater-logo.png" alt="Breakwater Operations">
                                </a>
                                <button class="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false">
                                    <span class="hamburger"></span>
                                </button>
                                <div class="nav-links">
                                    <a href="https://breakwaterops.com/#how-we-help">How We Help</a>
                                    <a href="https://breakwaterops.com/#services">Services</a>
                                    <a href="https://breakwaterops.com/#approach">Approach</a>
                                    <a href="https://breakwaterops.com/#team">Team</a>
                                    <a href="https://blog.breakwaterops.com">Blog</a>
                                    <a href="https://breakwaterops.com/#contact" class="cta-button">Get Started</a>
                                </div>
                            </div>
                        </nav>
                    `;

                    this.nav = root.querySelector(".nav");
                    this.menuToggle = root.querySelector(".menu-toggle");
                    this.navLinks = root.querySelector(".nav-links");

                    this.closeMenu = () => {
                        this.menuToggle.classList.remove("active");
                        this.navLinks.classList.remove("active");
                        this.menuToggle.setAttribute("aria-expanded", "false");
                    };

                    this.handleScroll = () => {
                        this.nav.classList.toggle("scrolled", window.scrollY > 50);
                    };

                    this.handleResize = () => {
                        if (window.innerWidth > 960) {
                            this.closeMenu();
                        }
                    };

                    this.menuToggle.addEventListener("click", () => {
                        const isOpen = this.navLinks.classList.toggle("active");
                        this.menuToggle.classList.toggle("active", isOpen);
                        this.menuToggle.setAttribute("aria-expanded", String(isOpen));
                    });

                    this.navLinks.querySelectorAll("a").forEach((link) => {
                        link.addEventListener("click", this.closeMenu);
                    });

                    window.addEventListener("scroll", this.handleScroll);
                    window.addEventListener("resize", this.handleResize);
                    this.handleScroll();
                }

                disconnectedCallback() {
                    window.removeEventListener("scroll", this.handleScroll);
                    window.removeEventListener("resize", this.handleResize);
                }
            }

            customElements.define(elementName, BreakwaterSiteHeader);
        }

        const mountHeader = () => {
            document.querySelectorAll("#bw-header").forEach((header) => header.remove());

            const nativeHeader = document.querySelector(".gh-head, .site-header");
            if (nativeHeader) {
                nativeHeader.hidden = true;
            }

            if (!document.querySelector(elementName)) {
                document.body.prepend(document.createElement(elementName));
            }
        };

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", mountHeader, { once: true });
        } else {
            mountHeader();
        }
    })();
</script>
```

### Site Footer Injection

Paste this block into the **Site Footer** box:

```html
<style>
    .gh-foot,
    .site-footer {
        display: none !important;
    }

    #bw-footer,
    #bw-footer * {
        box-sizing: border-box;
    }

    #bw-footer {
        padding: 54px 0 28px;
        color: rgba(255, 255, 255, 0.82);
        background: #1d3548;
        font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        font-size: 16px;
        line-height: 1.6;
    }

    #bw-footer .bw-container {
        width: min(1120px, calc(100% - 40px));
        margin: 0 auto;
    }

    #bw-footer .bw-footer-content {
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

    #bw-footer .bw-footer-links {
        margin: 14px 0 0;
        padding: 0;
        list-style: none;
    }

    #bw-footer .bw-footer-bottom {
        margin-top: 34px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.18);
    }

    @media (max-width: 960px) {
        #bw-footer .bw-footer-content {
            grid-template-columns: 1fr;
        }
    }
</style>

<script>
    (() => {
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

        document.querySelectorAll("#bw-footer").forEach((footer) => footer.remove());

        const nativeFooter = document.querySelector(".gh-foot, .site-footer");
        if (nativeFooter) {
            nativeFooter.insertAdjacentHTML("beforebegin", footerMarkup);
            nativeFooter.hidden = true;
        } else {
            document.body.insertAdjacentHTML("beforeend", footerMarkup);
        }
    })();
</script>
```

## Verification

After Ghost activates the domain and the code injection is saved:

1. Open the blog homepage and a post page at desktop and mobile widths.
2. Inspect the page and confirm there is one `<breakwater-site-header>` element and no visible Ghost or legacy `#bw-header`.
3. Compare the header with the homepage at the same viewport width before and after scrolling 50 pixels.
4. Confirm the content width is 1120 pixels with 20-pixel minimum side margins.
5. Confirm the logo renders at 160 pixels tall before scrolling and 90 pixels after scrolling.
6. Confirm the mobile menu opens, closes, and updates `aria-expanded`.
7. Confirm every homepage section link leaves the blog and opens the correct section on `breakwaterops.com`.
8. Confirm the logo loads from `https://breakwaterops.com/images/breakwater-logo.png`.

Check the domain from a terminal:

```sh
dig +short blog.breakwaterops.com CNAME
curl -I https://blog.breakwaterops.com
```

The first command should return the Ghost hostname. The second should return a successful HTTPS response.
