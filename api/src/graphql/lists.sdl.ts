export const schema = gql`
  type List {
    id: String!
    title: String!
    description: String
    createdAt: DateTime!
    createdBy: User!
    items: [ListItem]!
    userId: String!
    webhook: String
    url: String
    isPrivate: Boolean!
    skipLimit: Int
    ListItemTag: [ListItemTag]!
  }

  type Query {
    lists: [List!]! @requireAuth
    list(id: String!): List @requireAuth
  }

  input CreateListInput {
    title: String!
    description: String
    webhook: String
    url: String
    isPrivate: Boolean!
    skipLimit: Int
  }

  input UpdateListInput {
    title: String!
    description: String
    webhook: String
    url: String
    isPrivate: Boolean
    skipLimit: Int
  }

  type Mutation {
    createList(input: CreateListInput!): List! @requireAuth
    updateList(id: String!, input: UpdateListInput!): List! @requireAuth
    deleteList(id: String!): List! @requireAuth
  }
`
