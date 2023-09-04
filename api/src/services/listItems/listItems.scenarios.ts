import type { Prisma, ListItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListItemCreateArgs>({
  listItem: {
    one: {
      data: {
        title: 'String',
        createdBy: {
          create: {
            email: 'String1164382',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        list: {
          create: {
            title: 'String',
            createdBy: {
              create: {
                email: 'String7937274',
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
        createdBy: {
          create: {
            email: 'String3016779',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        list: {
          create: {
            title: 'String',
            createdBy: {
              create: {
                email: 'String6143717',
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

export type StandardScenario = ScenarioData<ListItem, 'listItem'>
