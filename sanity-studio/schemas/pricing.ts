import { defineType, defineField } from 'sanity'

export const pricing = defineType({
  name: 'pricingRow',
  title: 'Cenovnik – Red',
  type: 'document',
  icon: () => '💶',
  fields: [
    defineField({
      name: 'nameSr',
      title: 'Naziv studija (srpski)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameEn',
      title: 'Naziv studija (English)',
      type: 'string',
    }),
    defineField({
      name: 'capacity',
      title: 'Kapacitet',
      type: 'string',
      description: 'npr. "Max 3" ili "Max 2"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'extra',
      title: 'Dopunska info kapaciteta',
      type: 'string',
      description: 'npr. "2 adl + 1 chd <12y" – ostavi prazno ako nije potrebno',
    }),
    defineField({
      name: 'priceLow',
      title: 'Cena – niža sezona (1.6–30.6 / 1.9–30.9)',
      type: 'string',
      description: 'npr. "80" ili "40 / 46" za soba/studio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceHigh',
      title: 'Cena – visoka sezona (1.7–31.8)',
      type: 'string',
      description: 'npr. "95" ili "45 / 56" za soba/studio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlight',
      title: 'Istaknut red (zlatna/koraljno boja)',
      type: 'boolean',
      initialValue: false,
      description: 'Uključi za studije sa direktnim pogledom na more',
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikazivanja',
      type: 'number',
      description: 'Niži broj = prikazuje se pre (1, 2, 3...)',
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
    select: { title: 'nameSr', subtitle: 'capacity', low: 'priceLow', high: 'priceHigh' },
    prepare({ title, subtitle, low, high }: { title: string; subtitle: string; low: string; high: string }) {
      return {
        title: title ?? 'Bez naziva',
        subtitle: `${subtitle} · ${low}€ / ${high}€`,
      }
    },
  },
})
