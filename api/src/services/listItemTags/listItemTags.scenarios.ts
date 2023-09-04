import type { Prisma, ListItemTag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListItemTagCreateArgs>({
  listItemTag: {
    one: {
      data: {
        title: 'String',
        list: {
          create: {
            title: 'String',
            createdBy: {
              create: {
                email: 'String2760542',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        list: {
          create: {
            title: 'String',
            createdBy: {
              create: {
                email: 'String6725329',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<ListItemTag, 'listItemTag'>
