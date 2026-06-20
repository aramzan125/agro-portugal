# VerdeCampo Portugal — Company Website

Professional website for a Portuguese agriculture company featuring services showcase and careers/recruitment pages for domestic and international workers.

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home — hero, company overview, services preview, careers CTA |
| `services.html` | Full catalog of 12 agricultural services |
| `careers.html` | Job listings, benefits, application form, international worker FAQ |
| `contact.html` | Contact form, office details, map |

## Features

- **Bilingual** — English and Portuguese (toggle in header)
- **Responsive** — Mobile-friendly layout
- **Careers focus** — Work permit status, nationality, international hiring FAQ
- **No build step** — Plain HTML/CSS/JS, open directly in a browser

## Quick Start

Open `index.html` in your browser, or serve locally:

```bash
cd agro-portugal
python3 -m http.server 8080
```

Then visit http://localhost:8080

## Customization

- Replace **VerdeCampo** with your company name across HTML files
- Update contact details (address, phone, email) in `contact.html` and footers
- Edit job listings in `careers.html`
- Add your logo by replacing the emoji in `.logo-icon`
- Replace Unsplash image URLs with your own photos

## Forms

Application and contact forms show a success toast on submit. To receive real submissions, connect a backend (e.g. Formspree, Netlify Forms, or your own API) by updating the form handlers in `js/main.js`.

## Deploy

Upload the folder to any static host:

- **Netlify** — drag & drop the folder
- **GitHub Pages** — push to a repo and enable Pages
- **Cloudflare Pages** — connect repo or upload
