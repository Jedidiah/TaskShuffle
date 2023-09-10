import type { FindListById } from 'types/graphql'

import { type CellSuccessProps, type CellFailureProps } from '@redwoodjs/web'

import List from 'src/components/List/List'

export const QUERY = gql`
  query FindListById($id: String!) {
    list: list(id: $id) {
      id
      title
      description
      createdAt
      isPrivate
      themeProperties
      customTheme
      theme
      skipLimit
      tags
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>List not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ list }: CellSuccessProps<FindListById>) => {
  return (
    <>
      <List list={list} />
    </>
  )
}
