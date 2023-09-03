export const schema = gql`
  type User {
    id: String!
    name: String
    lists: [List]!
    listItems: [ListItem]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
  }

  input UpdateUserInput {
    name: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    # deleteUser(id: String!): User! @requireAuth
  }
`
