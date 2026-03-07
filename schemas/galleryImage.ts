import { defineType, defineField } from 'sanity'

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Galerija – Slike',
  type: 'document',
  icon: () => '🖼️',
  fields: [
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt tekst (opciono)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikazivanja (niži = pre)',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'alt', media: 'image', order: 'order' },
    prepare(s: any) {
      return {
        title: s.title || `Slika ${s.order}`,
        subtitle: `Redosled: ${s.order}`,
        media: s.media,
      }
    },
  },
})
