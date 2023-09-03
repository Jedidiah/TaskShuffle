import type { Prisma, ListItemTag } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListItemTagCreateArgs>({
  listItemTag: {
    one: {
      data: {
        title: 'String',
        list: {
          create: {
            createdBy: {
              create: {
                email: 'String5576251',
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
            createdBy: {
              create: {
                email: 'String5889128',
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
