export const schema = gql`
  type ListItemTag {
    id: String!
    title: String!
    list: List!
    listId: String!
    ListItem: [ListItem]!
  }

  type Query {
    listItemTags: [ListItemTag!]! @requireAuth
    listItemTag(id: String!): ListItemTag @requireAuth
  }

  input CreateListItemTagInput {
    title: String!
    listId: String!
  }

  input UpdateListItemTagInput {
    title: String
    listId: String
  }

  type Mutation {
    createListItemTag(input: CreateListItemTagInput!): ListItemTag! @requireAuth
    updateListItemTag(
      id: String!
      input: UpdateListItemTagInput!
    ): ListItemTag! @requireAuth
    deleteListItemTag(id: String!): ListItemTag! @requireAuth
  }
`
