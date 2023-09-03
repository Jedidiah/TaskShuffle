import type { Prisma, ListItem } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListItemCreateArgs>({
  listItem: {
    one: {
      data: {
        createdBy: {
          create: {
            email: 'String8355624',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        list: {
          create: {
            createdBy: {
              create: {
                email: 'String4511230',
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
            email: 'String209405',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        list: {
          create: {
            createdBy: {
              create: {
                email: 'String2226295',
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
