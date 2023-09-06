import type {
  DeleteListItemMutationVariables,
  FindListItemById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DeleteListItemMutation($id: String!) {
    deleteListItem(id: $id) {
      id
    }
  }
`

interface Props {
  listItem: NonNullable<FindListItemById['listItem']>
}

const ListItem = ({ listItem }: Props) => {
  const [deleteListItem] = useMutation(DELETE_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('ListItem deleted')
      navigate(routes.listItems())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteListItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete listItem ' + id + '?')) {
      deleteListItem({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            ListItem {listItem.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{listItem.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{listItem.title}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{listItem.description}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(listItem.createdAt)}</td>
            </tr>

            <tr>
              <th>List id</th>
              <td>{listItem.listId}</td>
            </tr>
            <tr>
              <th>Webhook</th>
              <td>{listItem.webhook}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editListItem({ id: listItem.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(listItem.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default ListItem
