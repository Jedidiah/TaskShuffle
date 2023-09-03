import type { ListItemTag } from '@prisma/client'

import {
  listItemTags,
  listItemTag,
  createListItemTag,
  updateListItemTag,
  deleteListItemTag,
} from './listItemTags'
import type { StandardScenario } from './listItemTags.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('listItemTags', () => {
  scenario('returns all listItemTags', async (scenario: StandardScenario) => {
    const result = await listItemTags()

    expect(result.length).toEqual(Object.keys(scenario.listItemTag).length)
  })

  scenario(
    'returns a single listItemTag',
    async (scenario: StandardScenario) => {
      const result = await listItemTag({ id: scenario.listItemTag.one.id })

      expect(result).toEqual(scenario.listItemTag.one)
    }
  )

  scenario('creates a listItemTag', async (scenario: StandardScenario) => {
    const result = await createListItemTag({
      input: { title: 'String', listId: scenario.listItemTag.two.listId },
    })

    expect(result.title).toEqual('String')
    expect(result.listId).toEqual(scenario.listItemTag.two.listId)
  })

  scenario('updates a listItemTag', async (scenario: StandardScenario) => {
    const original = (await listItemTag({
      id: scenario.listItemTag.one.id,
    })) as ListItemTag
    const result = await updateListItemTag({
      id: original.id,
      input: { title: 'String2' },
    })

    expect(result.title).toEqual('String2')
  })

  scenario('deletes a listItemTag', async (scenario: StandardScenario) => {
    const original = (await deleteListItemTag({
      id: scenario.listItemTag.one.id,
    })) as ListItemTag
    const result = await listItemTag({ id: original.id })

    expect(result).toEqual(null)
  })
})
