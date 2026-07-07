import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { TeamMembers } from './collections/TeamMembers'
import { Testimonials } from './collections/Testimonials'
import { Projects } from './collections/Projects'
import { Posts } from './collections/Posts'
import { Categories } from './collections/Categories'
import { Submissions } from './collections/Submissions'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { ServicesPage } from './globals/ServicesPage'
import { AboutPage } from './globals/AboutPage'
import { ProjectsPage } from './globals/ProjectsPage'
import { ContactPage } from './globals/ContactPage'
import { BlogPage } from './globals/BlogPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · GeoSpark CMS',
    },
  },
  collections: [
    Posts,
    Categories,
    Services,
    Projects,
    TeamMembers,
    Testimonials,
    Submissions,
    Media,
    Users,
  ],
  globals: [SiteSettings, HomePage, ServicesPage, AboutPage, ProjectsPage, ContactPage, BlogPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URL || 'file:./geospark.db',
    },
  }),
  sharp,
})
