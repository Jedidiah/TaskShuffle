import type {
  QueryResolvers,
  MutationResolvers,
  ListItemTagRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const listItemTags: QueryResolvers['listItemTags'] = () => {
  return db.listItemTag.findMany()
}

export const listItemTag: QueryResolvers['listItemTag'] = ({ id }) => {
  return db.listItemTag.findUnique({
    where: { id },
  })
}

export const createListItemTag: MutationResolvers['createListItemTag'] = ({
  input,
}) => {
  return db.listItemTag.create({
    data: input,
  })
}

export const updateListItemTag: MutationResolvers['updateListItemTag'] = ({
  id,
  input,
}) => {
  return db.listItemTag.update({
    data: input,
    where: { id },
  })
}

export const deleteListItemTag: MutationResolvers['deleteListItemTag'] = ({
  id,
}) => {
  return db.listItemTag.delete({
    where: { id },
  })
}

export const ListItemTag: ListItemTagRelationResolvers = {
  list: (_obj, { root }) => {
    return db.listItemTag.findUnique({ where: { id: root?.id } }).list()
  },
  ListItem: (_obj, { root }) => {
    return db.listItemTag.findUnique({ where: { id: root?.id } }).ListItem()
  },
}
