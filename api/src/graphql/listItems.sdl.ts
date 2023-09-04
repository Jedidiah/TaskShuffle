export const schema = gql`
  type ListItem {
    id: String!
    title: String!
    description: String
    createdAt: DateTime!
    createdBy: User!
    userId: String!
    listId: String!
    list: List!
    webhook: String
    tags: [ListItemTag]!
  }

  type Query {
    listItems: [ListItem!]! @requireAuth
    listItem(id: String!): ListItem @requireAuth
  }

  input CreateListItemInput {
    title: String!
    description: String
    userId: String!
    listId: String!
    webhook: String
  }

  input UpdateListItemInput {
    title: String
    description: String
    userId: String
    listId: String
    webhook: String
  }

  type Mutation {
    createListItem(input: CreateListItemInput!): ListItem! @requireAuth
    updateListItem(id: String!, input: UpdateListItemInput!): ListItem!
      @requireAuth
    deleteListItem(id: String!): ListItem! @requireAuth
  }
`
