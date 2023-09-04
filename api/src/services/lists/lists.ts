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

export const updateList: MutationResolvers['updateList'] = ({ id, input }) => {
  return db.list.update({
    data: { ...input, userId: context.currentUser.id },
    where: { id, userId: context.currentUser.id },
  })
}

export const deleteList: MutationResolvers['deleteList'] = ({ id }) => {
  return db.list.delete({
    where: { id },
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