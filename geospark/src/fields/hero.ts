import type { Field } from 'payload'

/** Shared page-hero fields: mono kicker, two-part headline, intro, floating coordinate chips. */
export const heroFields = (defaults: {
  kicker: string
  title: string
  titleGradient: string
  intro: string
  coords?: string[]
}): Field[] => [
  {
    name: 'hero',
    type: 'group',
    fields: [
      { name: 'kicker', type: 'text', required: true, defaultValue: defaults.kicker },
      {
        name: 'title',
        type: 'text',
        required: true,
        defaultValue: defaults.title,
        admin: { description: 'First (plain) part of the headline.' },
      },
      {
        name: 'titleGradient',
        type: 'text',
        required: true,
        defaultValue: defaults.titleGradient,
        admin: { description: 'Second part of the headline, shown in the green-blue gradient.' },
      },
      { name: 'intro', type: 'textarea', required: true, defaultValue: defaults.intro },
      {
        name: 'coords',
        type: 'array',
        maxRows: 4,
        admin: {
          description:
            'Decorative floating survey labels around the hero (up to 4). Hidden on small screens.',
        },
        defaultValue: (defaults.coords || []).map((text) => ({ text })),
        fields: [{ name: 'text', type: 'text', required: true }],
      },
    ],
  },
]
