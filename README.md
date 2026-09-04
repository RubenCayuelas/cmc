# Carpintería Metálica Cayuelas

Corporate website for **Carpintería Metálica Cayuelas**

## Stack

- Pure **HTML5 / CSS3 / vanilla JS** — no framework, no bundler, no dependencies
- **Font Awesome 6.5** loaded via CDN CSS (`all.min.css`) — icons rendered as web font
- **Poppins** + **JetBrains Mono** via Google Fonts (`<link>` in each page `<head>`)
- Custom brand system in `assets/css/theme.css` (design tokens, typography, buttons, placeholders)
- Shared layout/components in `assets/css/site.css` (header, footer, sections, CTA band, feature cards, icon badges, mobile nav)
- Page-specific styles in dedicated files: `home.css`, `servicios.css`, `galeria.css`, `contacto.css` (linked per page)

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero, services overview, why-us, gallery preview, contact CTA |
| Services | `/servicios/` | Cancelas y herrería, forja, aluminio y cerramientos |
| Gallery | `/galeria/` | Filterable masonry photo gallery |
| Contact | `/contacto/` | Phone, email, address, map |

## SEO

- Canonical URLs, `robots` meta, `author`, `geo.region` / `geo.placename` on all pages
- Open Graph + Twitter Card on all pages (with `og:image:alt`, `og:image:type`)
- **JSON-LD structured data** on every page:
  - `LocalBusiness` (all pages)
  - `BreadcrumbList` (subpages)
  - `ContactPage` / `WebPage` / `CollectionPage` (subpages)
- `sitemap.xml` with priorities and change frequencies
- Fonts loaded via `<link rel="preconnect">` + stylesheet (not CSS `@import`); Font Awesome via CSS
- `theme-color` meta on all pages

