import shuffle from 'lodash/shuffle'
import type {
  QueryResolvers,
  MutationResolvers,
  ListRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { listItems } from '../listItems/listItems'

export const lists: QueryResolvers['lists'] = () => {
  return db.list.findMany({
    where: {
      userId: context.currentUser.id,
    },
  })
}

export const list: QueryResolvers['list'] = ({ id }) => {
  return db.list.findUnique({
    where: { id, userId: context.currentUser.id },
  })
}

export const createList: MutationResolvers['createList'] = ({ input }) => {
  return db.list.create({
    data: { ...input, userId: context.currentUser.id },
  })
}

export const shuffleList: MutationResolvers['shuffleList'] = async ({ id }) => {
  const currentListItems = await listItems({ listId: id })
  const itemIds = currentListItems?.map((i) => i.id)

  return db.list.update({
    data: { order: JSON.stringify(shuffle(itemIds)) },
    where: { id, userId: context.currentUser.id },
  })
}

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  return db.list.update({
    data: { ...input, userId: context.currentUser.id },
    where: { id, userId: context.currentUser.id },
  })
}

export const nextItemFromList: MutationResolvers['nextFromList'] = async ({
  id,
}) => {
  const currentList = await list({ id })
  const [nextItem, ...newOrder] = JSON.parse(currentList.order)

  if (newOrder.length >= 1) {
    await db.list.update({
      data: { order: JSON.stringify(newOrder) },
      where: { id, userId: context.currentUser.id },
    })
  } else {
    await shuffleList({ id })
  }
  return nextItem
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
  ListItemTag: (_obj, { root }) => {
    return db.list.findUnique({ where: { id: root?.id } }).ListItemTag()
  },
}
