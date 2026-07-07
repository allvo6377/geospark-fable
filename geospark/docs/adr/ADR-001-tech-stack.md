# ADR-001: Tech stack for the GeoSpark website + client-editable CMS

**Status:** Accepted (implemented)
**Date:** 2026-07-07
**Deciders:** Alvin (developer/owner), GeoSpark founders (content owners)

## Context

GeoSpark Onestop Solution needs a production marketing site built from a finished
HTML/CSS/JS design prototype (5 pages + shared components, heavy on animation:
scroll reveals, magnetic buttons, cursor-follow lighting, page-transition veil,
Leaflet maps, marquees, dark/light theme). Hard requirements:

- **Client editability:** a non-technical client must be able to change any text,
  image, service, team member, project, testimonial, FAQ or blog post without code.
- **SEO:** pages must be server-rendered/static with full control of metadata,
  sitemap and structured data.
- **Speed & security:** fast first paint on Kenyan mobile networks; no plugin
  attack surface; minimal external services.
- **Blog:** a distinctive, non-generic blog layout.
- **Budget/ops:** small team, no dedicated DevOps; hosting should be one deployable
  unit with a clear backup story.

## Decision

Build one Next.js 16 (App Router) application with **Payload CMS 3 embedded** in
the same app (`/admin`), using the **SQLite** database adapter and local media
storage with `sharp` image processing. All page content is modelled as Payload
globals (one per page + site settings) and collections (services, team,
testimonials, projects, posts, categories, media, form submissions). The frontend
server-renders everything from the CMS with ISR-style revalidation; all prototype
animations are ported as small client components.

## Options Considered

### Option A: Next.js + embedded Payload CMS + SQLite (chosen)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium — one codebase, one deploy; CMS schema is code |
| Cost | Hosting only (~$5–10/mo VPS or Railway/Fly volume); CMS is MIT-licensed |
| Scalability | Far beyond this site's needs; swap SQLite → Postgres adapter if ever needed |
| Team familiarity | React/TypeScript mainstream; Payload admin needs no training for editors |

**Pros:** single deployable; admin UI auto-generated from schema; drafts + uploads
+ auth + access control built in; no third-party data processor (good for privacy);
contact-form submissions land in the same admin; local API = no network hop at render.
**Cons:** self-hosted responsibility (backups = copy one `.db` file + `media/`);
SQLite requires a persistent-disk host (not serverless-only Vercel without swapping DB).

### Option B: Next.js + hosted headless CMS (Sanity/Contentful)

| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium — two systems (site + CMS studio/schema) |
| Cost | Free tier initially; paid seats/bandwidth as content grows |
| Scalability | Excellent (vendor-managed) |
| Team familiarity | Editors face a third-party studio; another login/vendor |

**Pros:** zero CMS ops; CDN-served assets; real-time collaboration.
**Cons:** vendor lock-in and pricing risk; content lives off-shore from the codebase;
API keys/webhooks to manage; harder to hand a small Kenyan business one self-contained unit.

### Option C: WordPress + page builder

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low to start, high to maintain (plugins, updates) |
| Cost | Hosting + likely premium plugins |
| Scalability | Adequate with caching plugins |
| Team familiarity | Editors know it; devs fight the theme to match a bespoke design |

**Pros:** ubiquitous editor familiarity.
**Cons:** reproducing this design's animation system in a builder is impractical;
largest CMS attack surface on the web; PHP stack diverges from the design handoff
(React-style prototype); performance requires constant plugin curation.

### Option D: Pure static site (Astro/Next export) + git-based CMS (Decap/Tina)

**Pros:** fastest possible delivery; nearly zero attack surface.
**Cons:** git-based editing is fragile for non-technical users (merge conflicts,
build failures on content errors); no built-in media pipeline or submissions inbox;
"edit anything without code" would be only partially true.

## Trade-off Analysis

The deciding constraint is **who owns the system after handover**: a non-technical
client and one developer. Option A is the only choice where the editor UI, content,
media, form inbox, and site are one unit with one backup artifact and no recurring
vendor decisions. It trades away serverless hosting convenience (SQLite needs a
disk), which is acceptable: a $5 VPS or Railway volume serves this traffic easily,
and the Payload DB adapter interface keeps Postgres as a drop-in escape hatch.
Option B is the strongest runner-up and remains the fallback if hosting must be
serverless. Options C/D fail the animation-fidelity and safe-editing requirements
respectively.

## Consequences

- Easier: content changes (client self-serves in `/admin`), SEO iteration
  (metadata fields per page), adding content types (one schema file + regenerate types).
- Harder: hosting must provide a persistent volume; OS-level updates are ours.
- Revisit: move to `@payloadcms/db-postgres` + S3 storage adapter if the site adds
  high-volume content or multiple concurrent editors; add an email adapter (Resend)
  when notification-on-enquiry is wanted (submissions are stored regardless).

## Action Items

1. [x] Implement schema, pages, animations, blog, SEO (done in this repo)
2. [x] Seed CMS with launch content and brand assets
3. [ ] Choose host with persistent disk (Railway/Fly/VPS), set `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`
4. [ ] Set up nightly backup of `geospark.db` + `media/` (cron + object storage)
5. [ ] Change the seeded admin password on first login; create client editor account with restricted role
