import type { Prisma, List } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ListCreateArgs>({
  list: {
    one: {
      data: {
        createdBy: {
          create: {
            email: 'String2419226',
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
            email: 'String9085628',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<List, 'list'>
