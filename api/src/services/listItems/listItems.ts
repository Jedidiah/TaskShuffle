import type {
  QueryResolvers,
  MutationResolvers,
  ListItemRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { shuffleList } from '../lists/lists'

export const listItems: QueryResolvers['listItems'] = async ({ listId }) => {
  const items = await db.listItem.findMany({ where: { listId } })
  return items
}

export const listItem: QueryResolvers['listItem'] = ({ id }) => {
  return db.listItem.findUnique({
    where: { id },
  })
}

export const createListItem: MutationResolvers['createListItem'] = async ({
  input,
}) => {
  const listItem = await db.listItem.create({
    data: { ...input, userId: context.currentUser.id },
  })
  await shuffleList({ id: input.listId })
  return listItem
}

export const updateListItem: MutationResolvers['updateListItem'] = ({
  id,
  input,
}) => {
  return db.listItem.update({
    data: { ...input, userId: context.currentUser.id },
    where: { id },
  })
}

export const deleteListItem: MutationResolvers['deleteListItem'] = async ({
  id,
}) => {
  const listItem = await db.listItem.delete({
    where: { id },
  })
  await shuffleList({ id: listItem.listId })
  return listItem
}

export const ListItem: ListItemRelationResolvers = {
  createdBy: (_obj, { root }) => {
    return db.listItem.findUnique({ where: { id: root?.id } }).createdBy()
  },
  list: (_obj, { root }) => {
    return db.listItem.findUnique({ where: { id: root?.id } }).list()
  },
  tags: (_obj, { root }) => {
    return db.listItem.findUnique({ where: { id: root?.id } }).tags()
  },
}
