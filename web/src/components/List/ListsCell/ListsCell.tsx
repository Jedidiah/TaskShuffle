import type { FindLists } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Lists from 'src/components/List/Lists'

export const QUERY = gql`
  query FindLists {
    lists {
      id
      title
      description
      createdAt
      webhook
      url
      isPrivate
      skipLimit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No lists yet. '}
      <Link to={routes.newList()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ lists }: CellSuccessProps<FindLists>) => {
  return <Lists lists={lists} />
}
