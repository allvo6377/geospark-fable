# GeoSpark Website — Content Editing Guide

*A guide for editing the website without touching any code.*

---

## 1. Signing in

1. Open **`https://your-domain.com/admin`** (during development: `http://localhost:3000/admin`).
2. Sign in with your editor account.
   - The first admin account was created during setup: `admin@geospark.co.ke`
     (the password was shared separately — **please change it after first login**
     via the account menu, top-right → *Account* → *Change password*).

Everything below happens inside this admin panel. Changes appear on the live
site within about two minutes of pressing **Save** (the site rebuilds those
pages automatically).

---

## 2. What you can edit — the map

The left sidebar has two areas:

### Globals (one-of-a-kind settings and pages)

| Global | What it controls |
|---|---|
| **Site Settings** | Company name, tagline, logo, phone, WhatsApp, email, address, map coordinates, navigation menu, footer text and links, social links, default SEO description |
| **Home Page** | Every text on the home page: hero badge, headline, intro, buttons, statistics (120+ projects etc.), section headings, mission/vision text, values, marquee technology chips |
| **Services Page** | Hero text, "How we work" process steps, FAQs |
| **About Page** | Hero, story paragraphs, mission & vision cards, values, journey timeline, technology chips |
| **Projects Page** | Hero text and the floating map labels |
| **Contact Page** | Hero text, the dropdown options in the enquiry form, direct-contact cards |
| **Blog Page** | Blog hero text and labels |

### Collections (lists of things)

| Collection | What it holds |
|---|---|
| **Services** | The six service cards (name, description, bullet list, icon, order) |
| **Team Members** | Founders/staff: photo, name, role, bio, skill tags |
| **Testimonials** | Client quotes with attribution |
| **Projects** | Portfolio entries: title, category, location, map coordinates, description |
| **Blog Posts** | Articles — see section 4 |
| **Categories** | Blog categories |
| **Media** | Every image on the site — upload once, reuse anywhere |
| **Form Submissions** | Enquiries sent through the contact form (read-only inbox) |

> **Rule of thumb:** if it repeats (cards, people, posts), it's a Collection.
> If it appears once (a headline, the footer), it's in a Global.

---

## 3. Common tasks

### Change a headline or paragraph
Globals → open the page (e.g. *Home Page*) → edit the field → **Save**.

### Replace an image (e.g. a team photo)
1. Collections → **Media** → **Create New** → upload the image (give it a
   descriptive *Alt text* — this matters for Google and accessibility).
2. Go to the place that uses it (e.g. *Team Members* → the person) and select
   the new image in the photo field → **Save**.

### Add / edit a service, team member, testimonial or project
Open the collection → **Create New** (or click an existing entry) → fill the
fields → **Save**. Cards appear on the site automatically, ordered by the
*Order* field where present.

### Read contact-form enquiries
Collections → **Form Submissions**. Every message sent through the website
form is stored here with name, phone, email, service and message.

### Change the phone number / email / WhatsApp everywhere at once
Globals → **Site Settings** → *Contact* — these feed the navbar button, the
contact page cards, the CTA banner and the footer simultaneously.

---

## 4. Writing a blog post

1. Collections → **Blog Posts** → **Create New**.
2. Fill in:
   - **Title** — the slug (web address) is generated automatically.
   - **Excerpt** — the short teaser shown on the blog page and on Google.
   - **Cover image** — pick from Media (or upload right there).
   - **Category** and **Tags**.
   - **Reading time** — minutes, shown on the card.
   - **Featured** — tick this to make the post the big "survey sheet" card at
     the top of the blog page. Only the newest featured post gets the big slot.
   - **Body** — full rich-text editor: headings, bold, lists, quotes, images.
3. **SEO tab** (optional): custom Google title/description if you want them
   different from the post title/excerpt.
4. Set **Status: Published** and **Save**. Drafts stay invisible until published.

---

## 5. Things to know

- **Nothing you do in the admin can break the design.** Layout, colours and
  animations are fixed in code; you're editing content in safe slots.
- **Save often.** Every save is versioned — an administrator can restore an
  older version of any document if needed.
- **Images:** upload photos around 1600px wide or larger; the site generates
  the small/fast versions automatically.
- **Dark mode** is automatic — you never need to provide separate dark images
  or colours.
- If something looks wrong on the site after an edit, wait two minutes and
  refresh; if it persists, contact the developer.

---

## 6. For the developer (quick reference)

```bash
npm install          # first time
npm run dev          # develop at http://localhost:3000
npm run seed         # (re)seed initial content — idempotent
npm run build        # production build
npm start            # serve production build
```

- Environment: copy `.env.example` → `.env`, set `PAYLOAD_SECRET`,
  `DATABASE_URL=file:./geospark.db`, `NEXT_PUBLIC_SERVER_URL`.
- Backups: copy `geospark.db` + the `media/` folder. That's the whole site state.
- Architecture decisions: see `docs/adr/ADR-001-tech-stack.md`.
