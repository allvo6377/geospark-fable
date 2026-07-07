/* Seeds the CMS with the full content of the design handoff.
   Run with: npm run seed  (idempotent — skips anything that already exists) */

import config from '@payload-config'
import path from 'path'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import { bold, doc, h2, h3, ol, p, quote, text, ul } from './lexical'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (name: string) => path.resolve(dirname, 'assets', name)

async function seed() {
  console.log('[seed] starting — initialising Payload…')
  const payload = await getPayload({ config })
  console.log('[seed] Payload initialised')
  const log = (msg: string) => console.log(`[seed] ${msg}`)

  /* ---------- admin user ---------- */
  const users = await payload.find({ collection: 'users', limit: 1 })
  if (users.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@geospark.co.ke',
        password: 'GeoSpark-Admin-2026!',
      },
    })
    log('Admin user created: admin@geospark.co.ke / GeoSpark-Admin-2026! — change this after first login.')
  }

  /* ---------- media ---------- */
  const findMedia = async (alt: string) => {
    const res = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return res.docs[0] ?? null
  }
  const upload = async (file: string, alt: string) => {
    const existing = await findMedia(alt)
    if (existing) return existing
    const created = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: asset(file),
    })
    log(`Uploaded ${file}`)
    return created
  }

  const logo = await upload('logo-full.png', 'GeoSpark Onestop Solution logo')
  const joshPhoto = await upload('team-josh.jpg', 'Joshua Njuguna')
  const alvinPhoto = await upload('team-alvin.jpg', 'Alvin Maingi')
  const maggiePhoto = await upload('team-maggie.jpg', 'Margaret Kimani')

  /* ---------- services ---------- */
  const servicesCount = await payload.count({ collection: 'services' })
  if (servicesCount.totalDocs === 0) {
    const services = [
      {
        order: 1,
        icon: 'survey' as const,
        title: 'Land Survey & Geospatial',
        description:
          'Topographic, cadastral, engineering and boundary surveys, GIS analysis, drone/UAV mapping and land valuation. Data-driven decisions for planning, development and titling.',
        tagline: 'Precision data for planning, development and titling.',
        items: [
          'Topographic surveys',
          'Cadastral & boundary surveys',
          'Engineering surveys',
          'GIS mapping & analysis',
          'Drone / UAV mapping',
          'Land valuation support',
        ],
      },
      {
        order: 2,
        icon: 'construction' as const,
        title: 'Construction',
        description:
          'Residential, commercial and affordable housing, roads, bridges and water infrastructure, renewable-energy projects, delivered on time and on budget with sustainable practice.',
        tagline: 'Sustainable builds delivered on time and on budget.',
        items: [
          'Residential & commercial buildings',
          'Affordable housing',
          'Roads & bridges',
          'Water & sanitation infrastructure',
          'Renewable-energy projects',
        ],
      },
      {
        order: 3,
        icon: 'planning' as const,
        title: 'Urban Planning',
        description:
          'Land-use planning, urban design, EIAs, county planning support, transportation planning and slum upgrading. Smart land use for Kenya’s growing towns and cities.',
        tagline: 'Smart land use for Kenya’s growing towns and cities.',
        items: [
          'Land-use planning & urban design',
          'Environmental impact assessments',
          'County planning support',
          'Transportation planning',
          'Slum upgrading programmes',
        ],
      },
      {
        order: 4,
        icon: 'interior' as const,
        title: 'Interior Design',
        description:
          'Space planning, design consultancy, custom furniture and fittings, sustainable materials and full project management. Style meets practicality for homes and offices.',
        tagline: 'Style meets practicality for homes and offices.',
        items: [
          'Space planning',
          'Design consultancy',
          'Custom furniture & fittings',
          'Sustainable materials',
          'Full project management',
        ],
      },
      {
        order: 5,
        icon: 'landscape' as const,
        title: 'Landscaping',
        description:
          'Garden design, hardscaping, water-efficient irrigation systems and ongoing maintenance, bringing green, thriving outdoor spaces to homes, offices and public areas.',
        tagline: 'Green, thriving outdoor spaces.',
        items: ['Garden design', 'Hardscaping', 'Water-efficient irrigation', 'Ongoing maintenance'],
      },
      {
        order: 6,
        icon: 'realestate' as const,
        title: 'Real Estate Management',
        description:
          'Property consulting, feasibility studies and valuations, tenant and lease management, and asset optimisation for residential, commercial and industrial portfolios.',
        tagline: 'Asset value protected and grown.',
        items: [
          'Property consulting',
          'Feasibility studies & valuations',
          'Tenant & lease management',
          'Asset optimisation',
        ],
      },
    ]
    for (const s of services) {
      await payload.create({
        collection: 'services',
        data: { ...s, items: s.items.map((t) => ({ text: t })) },
      })
    }
    log('Services seeded')
  }

  /* ---------- team ---------- */
  const teamCount = await payload.count({ collection: 'team-members' })
  const teamIds: Record<string, number | string> = {}
  if (teamCount.totalDocs === 0) {
    const members = [
      {
        order: 1,
        name: 'Joshua Njuguna',
        role: 'Co-Founder · Land Surveyor',
        bio: 'BTech Surveying Technology (Technical University of Kenya). Leads GeoSpark’s push to become Kenya’s leader in geospatial solutions and sustainable infrastructure.',
        photo: joshPhoto.id,
        tags: ['TOPOGRAPHIC', 'CADASTRAL', 'GIS'],
      },
      {
        order: 2,
        name: 'Alvin Maingi',
        role: 'Co-Founder · Land Surveyor',
        bio: 'BTech Surveying Technology (Technical University of Kenya). Leads the charge for modern geospatial practice and innovative construction across Kenya.',
        photo: alvinPhoto.id,
        tags: ['ENGINEERING', 'REMOTE SENSING', 'GIS'],
      },
      {
        order: 3,
        name: 'Margaret Kimani',
        role: 'Co-Founder · Investment & Sustainability',
        bio: 'Investment banker structuring deals and funding for large-scale projects, driving GeoSpark’s adoption of green construction and energy-efficient design.',
        photo: maggiePhoto.id,
        tags: ['DEAL STRUCTURING', 'GREEN BUILDING'],
      },
    ]
    for (const m of members) {
      const created = await payload.create({
        collection: 'team-members',
        data: { ...m, tags: m.tags.map((t) => ({ text: t })) },
      })
      teamIds[m.name] = created.id
    }
    log('Team seeded')
  } else {
    const existing = await payload.find({ collection: 'team-members', limit: 10 })
    existing.docs.forEach((d) => (teamIds[d.name] = d.id))
  }

  /* ---------- testimonials ---------- */
  const testimonialCount = await payload.count({ collection: 'testimonials' })
  if (testimonialCount.totalDocs === 0) {
    const testimonials = [
      {
        order: 1,
        quote:
          'GeoSpark set our boundary in a single visit and handed over a clean deed plan. The county approved it first try, no back and forth.',
        authorTitle: 'Property Owner',
        context: 'Kiambu Subdivision',
      },
      {
        order: 2,
        quote:
          'Their topographic survey was accurate to the centimetre. Our engineers designed off it with total confidence. Zero surprises on site.',
        authorTitle: 'Project Engineer',
        context: 'Commercial Development',
      },
      {
        order: 3,
        quote:
          'Clear communication from quote to title. GeoSpark explained every step and delivered ahead of schedule, which is rare in this field.',
        authorTitle: 'Managing Director',
        context: 'Real Estate Firm',
      },
    ]
    for (const t of testimonials) await payload.create({ collection: 'testimonials', data: t })
    log('Testimonials seeded')
  }

  /* ---------- projects ---------- */
  const projectsCount = await payload.count({ collection: 'projects' })
  if (projectsCount.totalDocs === 0) {
    const projects = [
      { title: 'Ridge Estate Cadastral Survey', category: 'Survey', locationLabel: 'KIAMBU · -1.171, 36.836', lat: -1.171, lng: 36.836, description: 'Boundary re-establishment and subdivision of a 42-acre parcel into 60 titled plots.' },
      { title: 'County Road Corridor Mapping', category: 'GIS', locationLabel: 'NAKURU · -0.303, 36.080', lat: -0.303, lng: 36.08, description: 'Drone-captured GIS basemap for a 12 km road upgrade, delivered in ArcGIS and QGIS.' },
      { title: 'Green Terrace Apartments', category: 'Construction', locationLabel: 'NAIROBI · -1.300, 36.790', lat: -1.3, lng: 36.79, description: 'Design-and-build of a 24-unit energy-efficient residential block, survey to handover.' },
      { title: 'Township Structure Plan', category: 'Planning', locationLabel: 'MACHAKOS · -1.516, 37.263', lat: -1.516, lng: 37.263, description: 'Land-use plan and EIA for a 300-ha peri-urban expansion zone.' },
      { title: 'Lakeview Villa Interiors', category: 'Interior', locationLabel: 'KISUMU · -0.091, 34.768', lat: -0.091, lng: 34.768, description: 'Full space planning, custom joinery and sustainable-material fit-out.' },
      { title: 'Riverside Corporate Gardens', category: 'Landscape', locationLabel: 'NAIROBI · -1.267, 36.812', lat: -1.267, lng: 36.812, description: 'Water-efficient landscape design and hardscaping for a 1.5-acre HQ campus.' },
      { title: 'Highland Farm Topo Survey', category: 'Survey', locationLabel: 'NYERI · -0.417, 36.951', lat: -0.417, lng: 36.951, description: 'Topographic survey and contour model for a coffee-estate irrigation scheme.' },
      { title: 'Solar Site Feasibility GIS', category: 'GIS', locationLabel: 'GARISSA · -0.453, 39.646', lat: -0.453, lng: 39.646, description: 'Remote-sensing suitability analysis for a 20 MW solar installation.' },
    ] as const
    let order = 1
    for (const pr of projects) {
      await payload.create({ collection: 'projects', data: { ...pr, order: order++ } })
    }
    log('Projects seeded')
  }

  /* ---------- blog categories + posts ---------- */
  const catCount = await payload.count({ collection: 'categories' })
  const catIds: Record<string, number | string> = {}
  if (catCount.totalDocs === 0) {
    for (const title of ['Land & Titles', 'Drone & GIS', 'Construction', 'Planning']) {
      const c = await payload.create({ collection: 'categories', data: { title } })
      catIds[title] = c.id
    }
    log('Categories seeded')
  } else {
    const existing = await payload.find({ collection: 'categories', limit: 20 })
    existing.docs.forEach((d) => (catIds[d.title] = d.id))
  }

  const postCount = await payload.count({ collection: 'posts' })
  if (postCount.totalDocs === 0) {
    const posts = [
      {
        title: 'How to verify a title deed in Kenya before you buy land',
        excerpt:
          'A clean-looking title deed is not proof of ownership. Here is the exact search process our surveyors run before any client commits money to a parcel.',
        category: catIds['Land & Titles'],
        author: teamIds['Joshua Njuguna'],
        featured: true,
        publishedDate: '2026-06-22T09:00:00.000Z',
        content: doc(
          p(
            text(
              'Every month we meet buyers who paid a deposit — sometimes the full price — for land whose title could never have been transferred to them. The document looked official. The seller was convincing. The parcel was real. But the title was not what it seemed.',
            ),
          ),
          p(
            text(
              'Verifying a title deed in Kenya is neither expensive nor slow, and it is dramatically cheaper than litigation. This is the process we run for clients before any transaction.',
            ),
          ),
          h2('Step 1: Run an official land search'),
          p(
            text('A search at the relevant land registry (or through the '),
            bold('Ardhi Sasa'),
            text(
              ' platform for digitised counties) confirms who the registered owner is, the size of the parcel, and whether there are encumbrances — caveats, cautions, charges or court orders sitting on the title.',
            ),
          ),
          ul(
            'Get a copy of the title deed and the seller’s ID from the seller.',
            'Apply for the search with the title number — results usually take one to three days.',
            'Compare the registered owner’s details with the person selling to you.',
            'Read the encumbrance section line by line.',
          ),
          h2('Step 2: Confirm the parcel on the ground'),
          p(
            text(
              'The registry tells you who owns the title. It does not tell you the title matches the fence line you were shown. A licensed surveyor obtains the Registry Index Map (RIM) or deed plan and re-establishes the boundaries with GNSS equipment, checking that:',
            ),
          ),
          ul(
            'The parcel’s position on the map matches the parcel you walked.',
            'The acreage on the title matches the acreage on the ground.',
            'There are no overlaps with neighbouring titles or road reserves.',
          ),
          quote(
            'Most land fraud in Kenya is not forged paper — it is genuine paper pointing at the wrong piece of ground.',
          ),
          h2('Step 3: Check the seller and the history'),
          p(
            text(
              'Ask for the green card (the register’s history) at the registry. It shows every transfer the parcel has gone through. Gaps, rapid flips or transfers during succession disputes are red flags worth a lawyer’s time.',
            ),
          ),
          h2('What this costs versus what it saves'),
          p(
            text(
              'A search, a surveyor’s boundary confirmation and an advocate’s opinion typically cost well under one percent of the land price. We have never met a client who regretted spending it — and we have met many who regretted skipping it.',
            ),
          ),
          p(
            text(
              'If you are considering a parcel anywhere in Kenya, talk to us before you pay. One field visit can settle the question for good.',
            ),
          ),
        ),
      },
      {
        title: 'Drone mapping vs. traditional survey: cost, accuracy and when to use each',
        excerpt:
          'UAV photogrammetry has changed the economics of site data. But it has not made the total station obsolete. Here is how we choose between them.',
        category: catIds['Drone & GIS'],
        author: teamIds['Alvin Maingi'],
        featured: false,
        publishedDate: '2026-06-08T09:00:00.000Z',
        content: doc(
          p(
            text(
              'Ten years ago, mapping a 50-acre site meant a crew walking every ridge with a total station for a week. Today a drone covers the same ground in an afternoon and produces a photorealistic 3D model as a bonus. So why do we still bring the total station?',
            ),
          ),
          h2('What drones do brilliantly'),
          ul(
            'Topographic surveys of open sites — orthophotos, contours and surface models from a single flight.',
            'Progress monitoring on construction sites, flown weekly for a fraction of a ground crew’s cost.',
            'Stockpile volumes, quarry measurements and earthworks quantities.',
            'Large agricultural parcels where centimetre accuracy is unnecessary.',
          ),
          h2('Where ground survey still wins'),
          ul(
            'Boundary and cadastral work — legal boundaries need control points and beacons, not pixels.',
            'Dense canopy — photogrammetry cannot see the ground through trees.',
            'Engineering set-out, where millimetres matter.',
            'Small urban plots, where mobilising a drone saves nothing.',
          ),
          h2('Accuracy, honestly stated'),
          p(
            text(
              'With RTK on board and proper ground control, drone photogrammetry reliably delivers 2–5 cm horizontal accuracy. Our GNSS base-rover work is ±8 mm. Both numbers are excellent — for different jobs. The mistake is paying for accuracy you do not need, or accepting accuracy that will not survive a county approval.',
            ),
          ),
          quote('The right question is not “drone or total station?” — it is “what decision will this data support?”'),
          h2('The hybrid workflow we actually use'),
          ol(
            'Establish survey control with GNSS — the legal and geometric backbone.',
            'Fly the site for surface, imagery and context.',
            'Pick up detail the drone cannot see: fences under trees, culvert inverts, service covers.',
            'Fuse everything in GIS and deliver one consistent dataset.',
          ),
          p(
            text(
              'The result costs less than a full ground survey and holds up anywhere a pure drone survey would be questioned. If you have a site in mind, send us the location — we will recommend the leanest method that gets you approvable data.',
            ),
          ),
        ),
      },
      {
        title: 'The land subdivision process in Kenya, step by step',
        excerpt:
          'From mother title to new deed in your hand: the approvals, the professionals involved, realistic timelines and where the process usually stalls.',
        category: catIds['Land & Titles'],
        author: teamIds['Joshua Njuguna'],
        featured: false,
        publishedDate: '2026-05-18T09:00:00.000Z',
        content: doc(
          p(
            text(
              'Subdivision looks simple on paper — one parcel becomes several. In practice it is a relay race between a surveyor, a physical planner, county officers and the land registry, and dropping the baton at any handover point can cost months. Here is the whole course.',
            ),
          ),
          h2('The eight steps'),
          ol(
            'Confirm the mother title is clean — search, encumbrances, and rates/rent clearance.',
            'Engage a licensed surveyor to re-establish the mother parcel’s boundaries.',
            'A physical planner prepares the subdivision scheme plan (PDP) showing plots and access roads.',
            'Submit for county approval — planning, survey and public health check compliance.',
            'The surveyor sets out the new plots, places beacons and prepares mutation forms.',
            'Survey of Kenya checks and approves the mutation.',
            'New numbers are issued and the registry opens a register for each new parcel.',
            'Collect the new title deeds and, if selling, proceed to transfer.',
          ),
          h2('Realistic timelines'),
          p(
            text(
              'A straightforward agricultural subdivision in a cooperative county runs three to six months end to end. Complications — disputed boundaries, unpaid land rates, succession issues on the mother title — can stretch it past a year. The single best predictor of speed is how clean the mother title is on day one.',
            ),
          ),
          h2('Where it stalls, and how to prevent it'),
          ul(
            'Access roads drawn too narrow for county standards — fix at scheme-plan stage, not after.',
            'Beacons placed but not protected — replacing them means re-survey fees.',
            'Mutation forms bouncing for small drafting errors — this is why the surveyor’s experience matters.',
            'Missing clearances discovered late — pay rates and rent before you start, not during.',
          ),
          quote('Every month a subdivision stalls is a month of interest, rain on open beacons, and cooling buyers.'),
          p(
            text(
              'GeoSpark handles the full chain — survey, planning, mutation and registry follow-up — under one engagement, so no baton gets dropped between professionals. Ask us for a fixed quote for your parcel.',
            ),
          ),
        ),
      },
      {
        title: 'What an Environmental Impact Assessment is — and when your project needs one',
        excerpt:
          'EIAs are not red tape for big factories only. Housing estates, boreholes and even some fences trigger them. A plain-language guide for developers.',
        category: catIds['Planning'],
        author: teamIds['Margaret Kimani'],
        featured: false,
        publishedDate: '2026-04-27T09:00:00.000Z',
        content: doc(
          p(
            text(
              'The question we hear most often from first-time developers is some version of: “It’s just a small project — surely I don’t need NEMA?” Sometimes the answer is genuinely no. Often it is yes, and finding out after ground-breaking is the expensive way to learn.',
            ),
          ),
          h2('What an EIA actually is'),
          p(
            text(
              'An Environmental Impact Assessment is a structured study of how a proposed project will affect its environment — water, soil, air, neighbours, traffic, drainage — and what will be done about those effects. In Kenya it is administered by NEMA under the Environmental Management and Co-ordination Act, and for listed project types it is a legal precondition to starting work.',
            ),
          ),
          h2('Projects that commonly trigger an EIA'),
          ul(
            'Housing developments beyond a handful of units, and most gated estates.',
            'Boreholes and water abstraction works.',
            'Petrol stations, workshops and anything storing fuels or chemicals.',
            'Roads, bridges and quarrying of any scale.',
            'Projects near rivers, wetlands, forests or protected areas — even small ones.',
          ),
          h2('The process, compressed'),
          ol(
            'A NEMA-licensed expert prepares the study — site visits, public consultation, impact analysis.',
            'The report is submitted with the prescribed fee.',
            'NEMA may request clarifications or a site inspection.',
            'A licence is issued, usually with conditions your contractor must follow.',
          ),
          p(
            text(
              'Budget six to twelve weeks for a routine project. The cost scales with project size but is trivial next to a stop order served on an active site.',
            ),
          ),
          quote('A stop order does not pause your loan repayments.'),
          h2('How this connects to planning'),
          p(
            text(
              'The EIA is strongest when it is done alongside the physical planning work rather than bolted on afterwards — drainage, access and density decisions all feed both documents. That is why our planning team scopes the EIA question in the first site meeting, not after the drawings are done.',
            ),
          ),
        ),
      },
      {
        title: 'Five questions to ask before breaking ground on a rural build',
        excerpt:
          'Water, access, soils, power and neighbours: the pre-construction homework that decides whether your countryside project runs smoothly or bleeds money.',
        category: catIds['Construction'],
        author: teamIds['Alvin Maingi'],
        featured: false,
        publishedDate: '2026-04-06T09:00:00.000Z',
        content: doc(
          p(
            text(
              'Building outside town is where budgets are made or broken. Materials cost the same everywhere; what varies wildly is everything around the build. These are the five questions we work through with every rural client before a single lorry is hired.',
            ),
          ),
          h3('1. Where will construction water come from?'),
          p(
            text(
              'Concrete is thirsty. If the answer is “we’ll buy from bowsers,” price it into the bill of quantities now — for a typical three-bedroom build it is a real line item. A borehole drilled early can serve the build and then the home.',
            ),
          ),
          h3('2. Can a loaded lorry actually reach the site?'),
          p(
            text(
              'A road that carries a pickup in January may swallow a seven-tonne lorry in April. We check gradients, bridges and the rainy-season record — sometimes the cheapest first structure on site is 200 metres of murram.',
            ),
          ),
          h3('3. What is under the topsoil?'),
          p(
            text(
              'Black cotton soil, loose fill and high water tables all change your foundation design and cost. A geotechnical check costs a fraction of one redesigned foundation. Your structural engineer will thank you; your wallet more so.',
            ),
          ),
          h3('4. How far is power, really?'),
          p(
            text(
              'Quotes for a transformer or line extension can take months and surprise you. For many rural homes, going solar-first is now cheaper than waiting — but that decision changes wiring design, so make it before the slab, not after.',
            ),
          ),
          h3('5. Do the neighbours agree where the boundary is?'),
          p(
            text(
              'The most expensive wall in Kenya is the one built on someone else’s land. A boundary re-establishment survey before setting out costs little and turns your fence line from an opinion into a fact.',
            ),
          ),
          quote('Rural builds fail on logistics, not engineering.'),
          p(
            text(
              'Our construction and survey teams handle these five questions as a single pre-construction package. If you own a parcel and a dream, that package is the first thing to buy — before the architect’s fancy renders.',
            ),
          ),
        ),
      },
    ]
    for (const post of posts) {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          excerpt: post.excerpt,
          category: post.category,
          author: post.author,
          featured: post.featured,
          publishedDate: post.publishedDate,
          content: post.content,
          _status: 'published',
        },
      })
    }
    log('Blog posts seeded')
  }

  /* ---------- globals ---------- */
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  if (!settings?.nav?.length) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        brandName: 'GeoSpark',
        brandTagline: 'Onestop Solution',
        logo: logo.id,
        nav: [
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'About', href: '/about' },
          { label: 'Projects', href: '/projects' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
        ],
        navCtaLabel: 'Request Proposal',
        navCtaHref: '/contact',
        email: 'hello@geospark.co.ke',
        phone: '+254 704 453 850',
        phoneRaw: '+254704453850',
        address: 'Nairobi, Kenya',
        coordsLabel: '-1.2921° S · 36.8219° E',
        responseTime: 'Within one working day',
        ctaBadge: 'Booking new projects',
        ctaTitle: 'Let’s build something',
        ctaTitleGradient: 'extraordinary.',
        ctaText:
          'From a single boundary survey to a full development, tell us about your project and we’ll respond within one working day.',
        ctaButtonLabel: 'Start your project',
        ctaButtonHref: '/contact',
        footerBlurb:
          'Licensed land surveyors and built-environment specialists. Turning ground truth into buildable, bankable, titled land across Kenya.',
        footerColumns: [
          {
            heading: 'Who we are',
            links: [
              { label: 'About us', href: '/about' },
              { label: 'Our team', href: '/about#team' },
              { label: 'Projects', href: '/projects' },
              { label: 'Field notes', href: '/blog' },
            ],
          },
          {
            heading: 'Our services',
            links: [
              { label: 'Land survey', href: '/services' },
              { label: 'Construction', href: '/services' },
              { label: 'Urban planning', href: '/services' },
              { label: 'Real estate', href: '/services' },
            ],
          },
        ],
        legalLinks: [
          { label: 'Privacy', href: '/contact' },
          { label: 'Terms', href: '/contact' },
        ],
        copyright: '© 2026 GeoSpark Onestop Solution. All rights reserved.',
        siteTitle: 'GeoSpark Onestop Solution | Spatial intelligence for Kenya',
        siteDescription:
          'Licensed land surveyors and built-environment specialists in Nairobi, Kenya — land survey, construction, urban planning, interior design, landscaping and real-estate management.',
      },
    })
    log('Site settings seeded')
  }

  {
    await payload.updateGlobal({
      slug: 'home-page',
      data: {
        hero: {
          badge: 'Licensed land surveyors & built-environment specialists · Nairobi, Kenya',
          title: 'Innovation meets',
          titleGradient: 'Kenya’s future.',
          intro:
            'GeoSpark Onestop Solution is an integrated practice spanning land survey, construction, urban planning, interior design, landscaping and real-estate management, from precision geospatial data to finished, sustainable spaces.',
          primaryCtaLabel: 'Explore our services',
          primaryCtaHref: '/#services',
          secondaryCtaLabel: 'Contact us',
          secondaryCtaHref: '/contact',
          coords: [
            { text: '-1.2921° · 36.8219° NAIROBI' },
            { text: 'GRID · UTM ZONE 37S' },
            { text: 'RTK FIX · H ±8 MM' },
            { text: '0.0236° · 37.9062° KENYA' },
          ],
          stats: [
            { value: '120', suffix: '+', label: 'Projects delivered', animate: true },
            { value: '15', suffix: '', label: 'Counties served', animate: true },
            { value: '98', suffix: '%', label: 'On-time delivery', animate: true },
            { value: '±8', suffix: 'mm', label: 'RTK accuracy', animate: false },
          ],
        },
        services: {
          kicker: 'What we do',
          heading: 'One partner, from boundary beacon to finished build.',
          sub: 'Six integrated service lines that keep your project on one accountable team: surveyed, planned, built and managed.',
          cardCtaLabel: 'Enquire',
        },
        about: {
          kicker: 'Who we are',
          heading: 'Building smart, green and resilient spaces.',
          missionText:
            'To shape Kenya’s future with sustainable, innovative solutions in infrastructure, spaces and communities.',
          visionText: 'To be Kenya’s leading partner in building smart, green and resilient spaces.',
          linkLabel: 'Meet the founders',
          values: [
            { title: 'Innovation', desc: 'Pushing boundaries for better solutions.' },
            { title: 'Sustainability', desc: 'Building for Kenya’s tomorrow.' },
            { title: 'Integrity', desc: 'Transparent, ethical delivery.' },
            { title: 'Collaboration', desc: 'Partnering for growth.' },
          ],
        },
        marquee: {
          label: 'Field-to-finish technology',
          items: [
            { text: 'GNSS' },
            { text: 'RTK' },
            { text: 'GIS' },
            { text: 'Remote Sensing' },
            { text: 'LiDAR' },
            { text: 'Drone Mapping' },
            { text: 'AutoCAD' },
            { text: 'ArcGIS' },
            { text: 'QGIS' },
            { text: 'DroneDeploy' },
          ],
        },
        team: {
          kicker: 'Leadership',
          heading: 'Surveyors, builders and financiers. One founding team.',
        },
        testimonials: {
          kicker: 'What clients say',
          heading: 'Trusted by people building on the ground.',
        },
      },
    })
    log('Home page seeded')
  }

  {
    await payload.updateGlobal({
      slug: 'services-page',
      data: {
        hero: {
          kicker: 'Services',
          title: 'Integrated spatial &',
          titleGradient: 'infrastructure solutions.',
          intro:
            'Six service lines, one accountable team. Every capability below is delivered in-house, from the first coordinate to ongoing property management.',
          coords: [
            { text: '-1.2921° · 36.8219° NAIROBI' },
            { text: '6 SERVICE LINES' },
            { text: 'FIELD → FINISH' },
            { text: 'UTM ZONE 37S' },
          ],
        },
        process: {
          kicker: 'How we work',
          heading: 'A straight line from brief to handover.',
          steps: [
            { step: '01 · BRIEF', title: 'Scope & site visit', desc: 'We listen, walk the site and define deliverables, timeline and cost, with no obligation.' },
            { step: '02 · DATA', title: 'Survey & analysis', desc: 'RTK GNSS, drone capture and GIS analysis establish the ground truth everything else builds on.' },
            { step: '03 · DELIVER', title: 'Design & build', desc: 'Plans, approvals and construction run under one accountable team with weekly reporting.' },
            { step: '04 · SUPPORT', title: 'Handover & care', desc: 'Documentation, titles and ongoing management or maintenance where you need it.' },
          ],
        },
        faq: {
          kicker: 'FAQ',
          heading: 'Common questions.',
          items: [
            { q: 'How fast can a boundary survey start?', a: 'Typically within one week of confirming the parcel details. Most residential boundary surveys are completed in 1–3 field days plus reporting.' },
            { q: 'Do you handle titles and county approvals?', a: 'Yes. We prepare survey plans to Survey of Kenya standards and walk them through mutation, approval and registration alongside your lawyer.' },
            { q: 'Can you take a project from bare land to a finished building?', a: 'That is the point of Onestop: survey, planning approvals, design, construction and even landscaping and property management under one contract.' },
            { q: 'Which areas do you cover?', a: 'We are Nairobi-based and work across Kenya — county projects, farms, estates and infrastructure corridors.' },
            { q: 'How is drone mapping priced?', a: 'By area and required accuracy. Send the parcel location for a same-day quote; small sites start at a flat day rate.' },
          ],
        },
      },
    })
    log('Services page seeded')
  }

  {
    await payload.updateGlobal({
      slug: 'about-page',
      data: {
        hero: {
          kicker: 'About GeoSpark',
          title: 'Engineering Kenya’s future through',
          titleGradient: 'spatial intelligence.',
          intro:
            'Founded by two licensed land surveyors and an investment banker, GeoSpark Onestop Solution brings precision geospatial data, sustainable construction and smart planning under one roof.',
          coords: [
            { text: '-1.2921° · 36.8219° NAIROBI' },
            { text: 'EST · TU KENYA' },
            { text: 'VISION · SMART · GREEN' },
            { text: '0.0236° · 37.9062° KENYA' },
          ],
        },
        story: {
          kicker: 'Our story',
          heading: 'From boundary beacons to whole communities.',
          paragraphs: [
            { text: 'GeoSpark began in the field: two surveying graduates of the Technical University of Kenya watching projects stall between the surveyor, the planner, the contractor and the financier. The answer was a single accountable practice.' },
            { text: 'Today GeoSpark spans land survey and geospatial services, construction, urban planning, interior design, landscaping and real-estate management, with one team from the first coordinate to the finished, sustainable space.' },
          ],
        },
        mission: {
          title: 'Mission',
          text: 'To shape Kenya’s future with sustainable, innovative solutions in infrastructure, spaces and communities.',
        },
        vision: {
          title: 'Vision',
          text: 'To be Kenya’s leading partner in building smart, green and resilient spaces.',
        },
        values: [
          { title: 'Innovation', desc: 'Pushing boundaries.' },
          { title: 'Sustainability', desc: 'Built for tomorrow.' },
          { title: 'Integrity', desc: 'Transparent delivery.' },
          { title: 'Collaboration', desc: 'Partnering for growth.' },
        ],
        timeline: {
          kicker: 'Journey',
          heading: 'From founding to future.',
          items: [
            { label: 'FOUNDED', title: 'Two surveyors, one banker', desc: 'GeoSpark Onestop Solution is registered in Nairobi with a field-first survey practice.', color: 'accent' },
            { label: 'EXPANSION', title: 'Six service lines', desc: 'Construction, planning, interiors, landscaping and property management join the survey core.', color: 'accent' },
            { label: 'TODAY', title: 'Drone & GIS at scale', desc: 'UAV mapping, RTK GNSS and GIS analysis serving counties, developers and landowners.', color: 'emerald' },
            { label: 'VISION', title: 'Kenya’s leading partner', desc: 'Smart, green, resilient spaces, nationwide.', color: 'emerald' },
          ],
        },
        team: { kicker: 'Leadership', heading: 'The founding team.' },
        tech: {
          kicker: 'Technology',
          heading: 'Field-to-finish stack.',
          chips: [
            { text: 'GNSS' },
            { text: 'RTK' },
            { text: 'GIS' },
            { text: 'Remote Sensing' },
            { text: 'LiDAR' },
            { text: 'Drone Mapping' },
            { text: 'AutoCAD' },
            { text: 'ArcGIS' },
            { text: 'QGIS' },
            { text: 'DroneDeploy' },
          ],
        },
      },
    })
    log('About page seeded')
  }

  {
    await payload.updateGlobal({
      slug: 'projects-page',
      data: {
        hero: {
          kicker: 'Projects',
          title: 'Surveyed, planned and',
          titleGradient: 'built across Kenya.',
          intro: 'A selection of our work. Filter by service or explore live on the map.',
          coords: [
            { text: '8 SITES · MAPPED' },
            { text: 'GRID · UTM ZONE 37S' },
            { text: 'RTK FIX · ±8 MM' },
            { text: '-0.09° · 34.77° KISUMU' },
          ],
        },
        map: { centerLat: -0.6, centerLng: 37.2, zoom: 6 },
      },
    })
    log('Projects page seeded')
  }

  {
    await payload.updateGlobal({
      slug: 'contact-page',
      data: {
        hero: {
          kicker: 'Contact',
          title: 'Tell us about',
          titleGradient: 'your site.',
          intro: 'We respond within one working day, by email, phone or WhatsApp, whichever you prefer.',
          coords: [
            { text: '-1.2921° · 36.8219° NAIROBI' },
            { text: 'REPLY < 24 HRS' },
            { text: 'RTK FIX · ONLINE' },
            { text: 'WGS84 · EPSG:4326' },
          ],
        },
        form: {
          serviceOptions: [
            { label: 'Land survey / boundary' },
            { label: 'Drone mapping / GIS' },
            { label: 'Construction' },
            { label: 'Urban planning' },
            { label: 'Interior design' },
            { label: 'Landscaping' },
            { label: 'Property management' },
          ],
          servicePlaceholder: 'What do you need?',
          messagePlaceholder: 'Describe your project or parcel (location, size, timeline)…',
          submitLabel: 'Send message',
          directLabel: 'Or write directly:',
          successTitle: 'Message sent',
          successText: 'Thank you — your enquiry is with our team. We’ll reply within one working day.',
          successButton: 'Send another',
        },
        office: {
          lat: -1.2921,
          lng: 36.8219,
          zoom: 6,
          popupTitle: 'GeoSpark Onestop Solution',
          popupSubtitle: 'Nairobi, Kenya',
        },
      },
    })
    log('Contact page seeded')
  }

  {
    await payload.updateGlobal({
      slug: 'blog-page',
      data: {
        hero: {
          kicker: 'Field Notes',
          title: 'Dispatches from',
          titleGradient: 'the field.',
          intro:
            'Surveying, land, construction and planning in Kenya — explained by the people who set the beacons.',
          coords: [
            { text: 'LOG · UPDATED WEEKLY' },
            { text: 'WGS84 · EPSG:4326' },
            { text: 'FIELD NOTES · OPEN' },
            { text: '-1.2921° · 36.8219° NAIROBI' },
          ],
        },
        featuredLabel: 'Featured dispatch',
        allCategoriesLabel: 'All entries',
        readLabel: 'Read dispatch',
        minReadLabel: 'min read',
        emptyText: 'No dispatches in this category yet — check back soon.',
        backToLogLabel: 'Back to field notes',
        relatedLabel: 'Adjacent parcels',
        metaTitle: 'Field Notes | GeoSpark Onestop Solution',
        metaDescription:
          'Surveying, land, construction and planning in Kenya — explained by the people who set the beacons.',
      },
    })
    log('Blog page seeded')
  }

  log('Seed complete ✔')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
