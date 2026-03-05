import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'

export default defineConfig({
  name: 'villa-mare-mar',
  title: 'Villa Mare Mar',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemas,
  },
})
