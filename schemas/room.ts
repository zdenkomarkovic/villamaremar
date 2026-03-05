import { defineType, defineField } from 'sanity'

export const room = defineType({
  name: 'room',
  title: 'Sobe i Apartmani',
  type: 'document',
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
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'priceLow',
      title: 'Cena — niža sezona (€/noć)  [1.6.–30.6. / 1.9.–30.9.]',
      type: 'number',
    }),
    defineField({
      name: 'priceHigh',
      title: 'Cena — visoka sezona (€/noć)  [1.7.–31.8.]',
      type: 'number',
    }),
    defineField({
      name: 'guests',
      title: 'Maks. broj gostiju (odrasli)',
      type: 'number',
    }),
    defineField({
      name: 'children',
      title: 'Maks. dece (do 12 god.)',
      type: 'number',
    }),
    defineField({
      name: 'doubleBeds',
      title: 'Bračnih kreveta (double)',
      type: 'number',
    }),
    defineField({
      name: 'singleBeds',
      title: 'Singl kreveta (single)',
      type: 'number',
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
      title: 'Redosled (niži = prikazuje se pre)',
      type: 'number',
    }),
  ],
  orderings: [
    { title: 'Redosled', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name.sr', subtitle: 'priceLow', media: 'images.0' },
    prepare(selection: any) {
      return {
        title: selection.title ?? 'Bez naziva',
        subtitle: selection.subtitle ? `od ${selection.subtitle} € / noć` : '',
        media: selection.media,
      }
    },
  },
})
