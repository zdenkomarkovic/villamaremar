import { defineType, defineField } from 'sanity'

export const room = defineType({
  name: 'room',
  title: 'Sobe i Apartmani',
  type: 'document',
  icon: () => '🛏️',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv sobe',
      type: 'object',
      fields: [
        { name: 'sr', title: 'Srpski', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ru', title: 'Русский', type: 'string' },
        { name: 'de', title: 'Deutsch', type: 'string' },
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Opis',
      type: 'object',
      fields: [
        { name: 'sr', title: 'Srpski', type: 'text', rows: 4 },
        { name: 'en', title: 'English', type: 'text', rows: 4 },
        { name: 'ru', title: 'Русский', type: 'text', rows: 4 },
        { name: 'de', title: 'Deutsch', type: 'text', rows: 4 },
      ],
    }),

    defineField({
      name: 'images',
      title: 'Slike',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt tekst', type: 'string' }],
        },
      ],
      validation: (rule) => rule.min(1).error('Dodajte barem jednu sliku'),
    }),

    defineField({
      name: 'price',
      title: 'Cena po noći (€)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),

    defineField({
      name: 'guests',
      title: 'Maks. broj gostiju',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
    }),

    defineField({
      name: 'beds',
      title: 'Broj kreveta',
      type: 'number',
      validation: (rule) => rule.required().positive().integer(),
    }),

    defineField({
      name: 'size',
      title: 'Veličina (m²)',
      type: 'number',
    }),

    defineField({
      name: 'features',
      title: 'Sadržaji sobe',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🏖️ Privatna plaža', value: 'beach' },
          { title: '🌊 Pogled na more', value: 'seaView' },
          { title: '🏡 Terasa', value: 'terrace' },
          { title: '🪟 Balkon', value: 'balcony' },
          { title: '❄️ Klima-uređaj', value: 'ac' },
          { title: '📶 Besplatan WiFi', value: 'wifi' },
          { title: '🍳 Kuhinja', value: 'kitchen' },
          { title: '🚿 Kupatilo', value: 'bathroom' },
          { title: '📺 Flat-screen TV', value: 'tv' },
          { title: '🅿️ Parking', value: 'parking' },
          { title: '🔥 Roštilj', value: 'bbq' },
          { title: '🌿 Bašta', value: 'garden' },
          { title: '🔒 Sef', value: 'safe' },
        ],
        layout: 'grid',
      },
    }),

    defineField({
      name: 'available',
      title: 'Dostupno za rezervaciju',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'order',
      title: 'Redosled prikazivanja',
      type: 'number',
      description: 'Niži broj = prikazuje se pre (npr. 1, 2, 3...)',
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
    select: { title: 'name.sr', subtitle: 'price', media: 'images.0' },
    prepare({ title, subtitle, media }: { title: string; subtitle: number; media: unknown }) {
      return {
        title: title ?? 'Bez naziva',
        subtitle: subtitle ? `${subtitle} € / noć` : '',
        media,
      }
    },
  },
})
