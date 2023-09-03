import type { Prisma, List } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListCreateArgs>({
  list: {
    one: {
      data: {
        createdBy: {
          create: {
            email: 'String6812844',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        createdBy: {
          create: {
            email: 'String399916',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<List, 'list'>
