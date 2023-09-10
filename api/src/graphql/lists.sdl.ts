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
    order: String
    isPrivate: Boolean!
    skipLimit: Int
    themeProperties: String
    customTheme: String
    theme: String
    tags: String!
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
    isPrivate: Boolean
    skipLimit: Int
    themeProperties: String
    customTheme: String
    theme: String
  }

  input UpdateListInput {
    title: String!
    description: String
    webhook: String
    url: String
    isPrivate: Boolean
    skipLimit: Int
    tags: String
    themeProperties: String
    customTheme: String
    theme: String
  }

  type Mutation {
    createList(input: CreateListInput!): List! @requireAuth
    updateList(id: String!, input: UpdateListInput!): List! @requireAuth
    shuffleList(id: String!): List! @requireAuth
    # nextFromList(id: String!): List @requireAuth
    deleteList(id: String!): List! @requireAuth
  }
`
