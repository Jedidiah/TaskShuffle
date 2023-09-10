import sample from 'lodash/sample'
import shuffle from 'lodash/shuffle'
import uniq from 'lodash/uniq'
import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const lists: QueryResolvers['lists'] = () => {
  return db.list.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const list: QueryResolvers['list'] = ({ id }) => {
  return db.list.findUnique({
    where: { id },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  return db.list.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const shuffleList: MutationResolvers['shuffleList'] = async ({ id }) => {
  const currentListItems = await db.listItem.findMany({ where: { listId: id } })
  const itemIds = currentListItems?.map((i) => i.id)

  return db.list.update({
    data: { order: JSON.stringify(shuffle(itemIds)) },
    where: { id },
  })
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  return db.list.update({
    data: { ...input, userId: context.currentUser.id },
    where: { id, userId: context.currentUser.id },
  })
}

export const updateListTags = async ({
  id,
  tags,
}: {
  id: string
  tags: string
}) => {
  const tagsFromString = (str: string) =>
    str.length > 0 ? str.split(',').map((t) => t.trim()) : []
  const currentList = await list({ id })
  const newTags = tagsFromString(tags)
  const currentTags = tagsFromString(currentList.tags)
  const updatedTags: string = uniq([...newTags, ...currentTags]).join(',')
  return updateList({ id, input: { ...currentList, tags: updatedTags } })
}

export const nextItemFromList = async ({
  id,
  tag,
}: {
  id: string
  tag?: string
}) => {
  const currentList = await db.list.findUnique({ where: { id } })
  if (!tag) {
    const [nextItem, ...newOrder] = JSON.parse(currentList.order)

    if (newOrder.length >= 1) {
      await db.list.update({
        data: { order: JSON.stringify(newOrder) },
        where: { id },
      })
    } else {
      await shuffleList({ id })
    }
    return nextItem
  }

  const matchingItems = await db.listItem.findMany({
    where: { listId: id, AND: [{ tags: { contains: tag } }] },
  })

  return sample(matchingItems)?.id
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return db.list.delete({
    where: { id, userId: context.currentUser.id },
  })
}

export const List: ListRelationResolvers = {
  createdBy: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).createdBy()
  },
  items: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).items()
  },
}
