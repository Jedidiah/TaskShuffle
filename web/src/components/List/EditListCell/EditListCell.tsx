import {
  Breadcrumbs,
  Flex,
  Item,
  Text,
  View,
  Link as SpectrumLink,
  ActionButton,
} from '@adobe/react-spectrum'
import Delete from '@spectrum-icons/workflow/Delete'
import OpenIn from '@spectrum-icons/workflow/OpenIn'
import Share from '@spectrum-icons/workflow/Share'
import type { EditListById, UpdateListInput } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListForm from 'src/components/List/ListForm'

import { DELETE_LIST_MUTATION } from '../Lists'

export const QUERY = gql`
  query EditListById($id: String!) {
    list: list(id: $id) {
      id
      title
      description
      createdAt
      isPrivate
      skipLimit
      tags
      items {
        id
        title
        description
        tags
        webhook
        url
      }
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
      navigate(routes.shuffles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateListInput, id: EditListById['list']['id']) => {
    updateList({ variables: { id, input } })
  }

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

  const onDeleteClick = () => {
    if (
      confirm(
        `Are you sure you want to delete the shuffle '${list.title}' and its ${list.items.length} items? You can not undo this.`
      )
    ) {
      deleteList({ variables: { id: list.id } })
    }
  }

  return (
    <>
      <View
        backgroundColor={'gray-50'}
        top={0}
        borderBottomWidth={'thin'}
        borderBottomColor={'gray-300'}
        marginBottom={'size-200'}
      >
        <Flex
          direction={'row'}
          minHeight={'48px'}
          alignItems={'center'}
          marginX={10}
        >
          <Breadcrumbs size="L" flexGrow={1}>
            <Item key="home">
              <Link to={routes.shuffles()}>Shuffles</Link>
            </Item>
            <Item key="edit">{`Editing '${list.title}'`}</Item>
          </Breadcrumbs>
          <SpectrumLink isQuiet variant="secondary">
            <Link
              style={{
                padding: '0 10px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: '14px',
                fontFamily:
                  'adobe-clean, Source Sans Pro, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Ubuntu, Trebuchet MS, Lucida Grande, sans-serif',
              }}
              to={routes.shuffle({ id: list.id })}
            >
              <OpenIn size="S" marginEnd="size-50" />
              <Text>View Shuffle</Text>
            </Link>
          </SpectrumLink>

          <ActionButton
            isQuiet
            onPress={() => {
              navigator.share({
                title: list.title,
                text: list.description,
                url: routes.shuffle({ id: list.id }),
              })
            }}
            key="share"
          >
            <Share />
            <Text>Share</Text>
          </ActionButton>
          <ActionButton isQuiet onPress={onDeleteClick} key="delete">
            <Delete />
            <Text>Delete</Text>
          </ActionButton>
        </Flex>
      </View>
      <View
        borderRadius="regular"
        margin="size-200"
        backgroundColor="gray-50"
        padding="size-200"
      >
        <ListForm list={list} onSave={onSave} error={error} loading={loading} />
      </View>
    </>
  )
}
