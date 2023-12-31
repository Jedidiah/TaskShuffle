import { useState } from 'react'

import {
  ActionMenu,
  Flex,
  Item,
  ListView,
  TagGroup,
  Text,
  View,
} from '@adobe/react-spectrum'
import Delete from '@spectrum-icons/workflow/Delete'
import Edit from '@spectrum-icons/workflow/Edit'
import type { FindListItems, ListItem } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/ListItem/ListItemsCell'

import EditListItemCell from '../EditListItemCell'

const DELETE_LIST_ITEM_MUTATION = gql`
  mutation DeleteListItemMutation($id: String!) {
    deleteListItem(id: $id) {
      id
    }
  }
`

const ListItemsList = ({ listItems }: FindListItems) => {
  const [editId, setEditId] = useState<string | undefined>(undefined)
  const [deleteListItem] = useMutation(DELETE_LIST_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('ListItem deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [
      { query: QUERY, variables: { listId: listItems[0].listId } },
    ],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (item: Partial<ListItem>) => {
    if (confirm('Are you sure you want to delete "' + item.title + '"?')) {
      deleteListItem({ variables: { id: item.id } })
    }
  }

  const onEditClick = (item: Partial<ListItem>) => {
    setEditId(item.id)
  }

  return (
    <View height="100%">
      <ListView
        aria-label="ListView example with complex items"
        onAction={(key) => setEditId(String(key))}
        density="spacious"
        flexGrow={1}
        // minHeight="90%"
      >
        {listItems.map((item) => (
          <Item key={item.id} textValue="Utilities" hasChildItems>
            <Text>{item.title}</Text>
            <Text slot="description">{item.description}</Text>
            <ActionMenu
              onAction={(key) => {
                switch (key) {
                  case 'delete':
                    onDeleteClick(item)
                    break
                  case 'edit':
                    onEditClick(item)
                    break

                  default:
                    break
                }
              }}
            >
              <Item key="edit" textValue="Edit">
                <Edit />
                <Text>Edit</Text>
              </Item>
              <Item key="delete" textValue="Delete">
                <Delete />
                <Text>Delete</Text>
              </Item>
            </ActionMenu>
          </Item>
        ))}
      </ListView>
      {editId !== undefined && (
        <EditListItemCell
          id={editId}
          showEditModal={Boolean(editId)}
          setShowEditModal={() => setEditId(undefined)}
        />
      )}
    </View>
  )
}

export default ListItemsList
