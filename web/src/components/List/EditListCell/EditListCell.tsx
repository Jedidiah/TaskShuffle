import type { EditListById, UpdateListInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListForm from 'src/components/List/ListForm'

export const QUERY = gql`
  query EditListById($id: String!) {
    list: list(id: $id) {
      id
      title
      description
      createdAt
      userId
      webhook
      url
      isPrivate
      skipLimit
    }
  }
`
const UPDATE_LIST_MUTATION = gql`
  mutation UpdateListMutation($id: String!, $input: UpdateListInput!) {
    updateList(id: $id, input: $input) {
      id
      title
      description
      createdAt
      userId
      webhook
      url
      isPrivate
      skipLimit
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ list }: CellSuccessProps<EditListById>) => {
  const [updateList, { loading, error }] = useMutation(UPDATE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List updated')
      navigate(routes.lists())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateListInput, id: EditListById['list']['id']) => {
    updateList({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit List {list?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ListForm list={list} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}