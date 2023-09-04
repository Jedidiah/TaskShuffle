import type { Prisma, List } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListCreateArgs>({
  list: {
    one: {
      data: {
        title: 'String',
        createdBy: {
          create: {
            email: 'String769717',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        createdBy: {
          create: {
            email: 'String4682110',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<List, 'list'>
