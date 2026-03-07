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
      description: 'Kratki opis slike za pristupačnost',
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikazivanja',
      type: 'number',
      description: 'Niži broj = prikazuje se pre. Sanity slike se prikazuju PRE lokalnih.',
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
    prepare({ title, media, order }: { title: string; media: unknown; order: number }) {
      return {
        title: title || `Slika ${order}`,
        subtitle: `Redosled: ${order}`,
        media,
      }
    },
  },
})
