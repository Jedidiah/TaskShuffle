import type { DeleteListMutationVariables, FindListById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_LIST_MUTATION = gql`
  mutation DeleteListMutation($id: String!) {
    deleteList(id: $id) {
      id
    }
  }
`

interface Props {
  list: NonNullable<FindListById['list']>
}

const List = ({ list }: Props) => {
  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List deleted')
      navigate(routes.shuffles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete list ' + id + '?')) {
      deleteList({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            List {list.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{list.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{list.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{list.description}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(list.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{list.userId}</td>
            </tr>
            <tr>
              <th>Webhook</th>
              <td>{list.webhook}</td>
            </tr>
            <tr>
              <th>Url</th>
              <td>{list.url}</td>
            </tr>
            <tr>
              <th>Is private</th>
              <td>{checkboxInputTag(list.isPrivate)}</td>
            </tr>
            <tr>
              <th>Skip limit</th>
              <td>{list.skipLimit}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editList({ id: list.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(list.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default List
