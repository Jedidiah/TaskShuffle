import type { FindListItemById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ListItem from 'src/components/ListItem/ListItem'

export const QUERY = gql`
  query FindListItemById($id: String!) {
    listItem: listItem(id: $id) {
      id
      title
      description
      createdAt
      listId
      webhook
      tags
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>ListItem not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ listItem }: CellSuccessProps<FindListItemById>) => {
  return <ListItem listItem={listItem} />
}
