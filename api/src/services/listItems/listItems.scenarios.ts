import type { Prisma, ListItem } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListItemCreateArgs>({
  listItem: {
    one: {
      data: {
        createdBy: {
          create: {
            email: 'String9242070',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        list: {
          create: {
            title: 'String',
            createdBy: {
              create: {
                email: 'String9045288',
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
        createdBy: {
          create: {
            email: 'String79265',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        list: {
          create: {
            title: 'String',
            createdBy: {
              create: {
                email: 'String9245097',
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
