import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/List/ListsCell'
import { checkboxInputTag, timeTag, truncate } from 'src/lib/formatters'

import type { DeleteListMutationVariables, FindLists } from 'types/graphql'

const DELETE_LIST_MUTATION = gql`
  mutation DeleteListMutation($id: String!) {
    deleteList(id: $id) {
      id
    }
  }
`

const ListsList = ({ lists }: FindLists) => {
  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete list ' + id + '?')) {
      deleteList({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created at</th>
            <th>User id</th>
            <th>Webhook</th>
            <th>Url</th>
            <th>Is private</th>
            <th>Skip limit</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.id}>
              <td>{truncate(list.id)}</td>
              <td>{truncate(list.title)}</td>
              <td>{truncate(list.description)}</td>
              <td>{timeTag(list.createdAt)}</td>
              <td>{truncate(list.userId)}</td>
              <td>{truncate(list.webhook)}</td>
              <td>{truncate(list.url)}</td>
              <td>{checkboxInputTag(list.isPrivate)}</td>
              <td>{truncate(list.skipLimit)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.list({ id: list.id })}
                    title={'Show list ' + list.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editList({ id: list.id })}
                    title={'Edit list ' + list.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete list ' + list.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(list.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListsList
