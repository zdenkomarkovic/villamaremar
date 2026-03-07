import { defineType, defineField } from 'sanity'

export const pricing = defineType({
  name: 'cenovnik',
  title: 'Cenovnik – Cene',
  type: 'document',
  icon: () => '💶',
  fields: [
    // Row 1 – Max 3, veliki balkon direktan pogled
    defineField({ name: 'r1low',  title: 'Max 3 · Veliki balkon direktan pogled na more  [1.6. – 30.6. / 1.9. – 30.9.]', type: 'string' }),
    defineField({ name: 'r1high', title: 'Max 3 · Veliki balkon direktan pogled na more  [1.7. – 31.8.]',                  type: 'string' }),
    // Row 2 – Max 3, bočni pogled
    defineField({ name: 'r2low',  title: 'Max 3 · Bočni pogled na more  [1.6. – 30.6. / 1.9. – 30.9.]', type: 'string' }),
    defineField({ name: 'r2high', title: 'Max 3 · Bočni pogled na more  [1.7. – 31.8.]',                  type: 'string' }),
    // Row 3 – Max 3, bez balkona
    defineField({ name: 'r3low',  title: 'Max 3 · Bez balkona  [1.6. – 30.6. / 1.9. – 30.9.]', type: 'string' }),
    defineField({ name: 'r3high', title: 'Max 3 · Bez balkona  [1.7. – 31.8.]',                  type: 'string' }),
    // Row 4 – Max 2, veliki balkon direktan pogled
    defineField({ name: 'r4low',  title: 'Max 2 · Veliki balkon direktan pogled na more  [1.6. – 30.6. / 1.9. – 30.9.]', type: 'string' }),
    defineField({ name: 'r4high', title: 'Max 2 · Veliki balkon direktan pogled na more  [1.7. – 31.8.]',                  type: 'string' }),
    // Row 5 – Max 2, bočni pogled
    defineField({ name: 'r5low',  title: 'Max 2 · Bočni pogled na more  [1.6. – 30.6. / 1.9. – 30.9.]', type: 'string' }),
    defineField({ name: 'r5high', title: 'Max 2 · Bočni pogled na more  [1.7. – 31.8.]',                  type: 'string' }),
    // Row 6 – Max 2, soba/studio bez balkona
    defineField({ name: 'r6low',  title: 'Max 2 · Soba/Studio bez balkona  [1.6. – 30.6. / 1.9. – 30.9.]', type: 'string' }),
    defineField({ name: 'r6high', title: 'Max 2 · Soba/Studio bez balkona  [1.7. – 31.8.]',                  type: 'string' }),
  ],
  preview: {
    prepare() {
      return { title: 'Cenovnik 2026' }
    },
  },
})
