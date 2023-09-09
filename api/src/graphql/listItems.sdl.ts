export const schema = gql`
  type ListItem {
    id: String!
    title: String!
    description: String
    createdAt: DateTime!
    createdBy: User!
    listId: String!
    list: List!
    webhook: String
    url: String
    tags: String!
  }

  type Query {
    listItems(listId: String!): [ListItem!]! @requireAuth
    listItem(id: String!): ListItem @requireAuth
  }

  input CreateListItemInput {
    title: String!
    description: String
    listId: String!
    webhook: String
    url: String
    tags: String
  }

  input UpdateListItemInput {
    title: String
    description: String
    listId: String
    webhook: String
    url: String
    tags: String
  }

  type Mutation {
    createListItem(input: CreateListItemInput!): ListItem! @requireAuth
    updateListItem(id: String!, input: UpdateListItemInput!): ListItem!
      @requireAuth
    deleteListItem(id: String!): ListItem! @requireAuth
  }
`
