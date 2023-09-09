import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Form,
  Header,
  Heading,
  Text,
} from '@adobe/react-spectrum'
import Add from '@spectrum-icons/workflow/Add'
import Edit from '@spectrum-icons/workflow/Edit'
import type { EditListItemById, UpdateListItemInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListItemForm from 'src/components/ListItem/ListItemForm'

export const QUERY = gql`
  query EditListItemById($id: String!) {
    listItem: listItem(id: $id) {
      id
      title
      description
      createdAt
      listId
      list {
        tags
      }
      webhook
      url
      tags
    }
  }
`
const UPDATE_LIST_ITEM_MUTATION = gql`
  mutation UpdateListItemMutation($id: String!, $input: UpdateListItemInput!) {
    updateListItem(id: $id, input: $input) {
      id
      title
      description
      createdAt
      listId
      webhook
      url
      tags
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  listItem,
  setShowEditModal,
  showEditModal,
}: CellSuccessProps<EditListItemById> & {
  showEditModal: boolean
  setShowEditModal: (_: boolean) => void
}) => {
  const [updateListItem, { loading, error }] = useMutation(
    UPDATE_LIST_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('ListItem updated')
        setShowEditModal(false)
        // navigate(routes.listItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateListItemInput,
    id: EditListItemById['listItem']['id']
  ) => {
    updateListItem({ variables: { id, input } })
  }

  return (
    <DialogTrigger isOpen={showEditModal} onOpenChange={setShowEditModal}>
      <></>
      {(close) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            onSave(
              {
                title: e.target?.title?.value,
                description: e.target?.description?.value,
                url: e.target?.url?.value,
                webhook: e.target?.webhook?.value,
                listId: listItem.listId,
                tags: e.target?.tags?.value,
              },
              listItem.id
            )
          }}
        >
          <Dialog minWidth="size-6000">
            <Heading>Editing &ldquo;{listItem.title}&rdquo;</Heading>
            <Divider />
            <Content>
              <ListItemForm
                listItem={listItem}
                listTags={listItem.list.tags}
                listId={listItem.listId}
                loading={loading}
                error={error}
              />
            </Content>
            <ButtonGroup>
              <Button type="button" variant="secondary" onPress={close}>
                Cancel
              </Button>
              <Button variant="accent" type="submit">
                Save Item
              </Button>
            </ButtonGroup>
          </Dialog>
        </Form>
      )}
    </DialogTrigger>
  )
}
