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
import type { CreateListItemInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as EditListQuery } from 'src/components/List/EditListCell'
import ListItemForm from 'src/components/ListItem/ListItemForm'

import { QUERY as ListItemsQuery } from '../ListItemsCell'

const CREATE_LIST_ITEM_MUTATION = gql`
  mutation CreateListItemMutation($input: CreateListItemInput!) {
    createListItem(input: $input) {
      id
    }
  }
`

const NewListItem = (props: {
  listTitle: string
  listId: string
  showCreateModal: boolean
  setShowCreateModal: (s: boolean) => void
}) => {
  const [createListItem, { loading, error }] = useMutation(
    CREATE_LIST_ITEM_MUTATION,
    {
      onCompleted: ({ createListItem }) => {
        toast.success('ListItem created')
        navigate(
          `${routes.editList({ id: props.listId })}?created=${
            createListItem?.id
          }`,
          {
            replace: true,
          }
        )
        props.setShowCreateModal(false)
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        { query: EditListQuery, variables: { id: props.listId } },
        { query: ListItemsQuery, variables: { listId: props.listId } },
      ],
    }
  )

  const onSave = (input: CreateListItemInput) => {
    createListItem({ variables: { input } })
  }

  return (
    <DialogTrigger
      isOpen={props.showCreateModal}
      onOpenChange={props.setShowCreateModal}
    >
      <Button type="button" variant="primary" style="fill">
        <Text>Add New Item</Text>
        <Add />
      </Button>
      {(close) => (
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            onSave({
              title: e.target?.title?.value,
              description: e.target?.description?.value,
              url: e.target?.url?.value,
              webhook: e.target?.webhook?.value,
              listId: props.listId,
            })
          }}
        >
          <Dialog minWidth="size-6000">
            <Heading>Adding New Item</Heading>
            <Header>Shuffle: {props.listTitle}</Header>
            <Divider />
            <Content>
              <ListItemForm
                listId={props.listId}
                loading={loading}
                error={error}
                isCreating
              />
            </Content>
            <ButtonGroup>
              <Button type="button" variant="secondary" onPress={close}>
                Cancel
              </Button>
              <Button variant="accent" type="submit">
                Create Item
              </Button>
            </ButtonGroup>
          </Dialog>
        </Form>
      )}
    </DialogTrigger>
  )
}

export default NewListItem
