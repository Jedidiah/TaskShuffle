import { useCallback } from 'react'

import {
  ActionGroup,
  Divider,
  Flex,
  Header,
  Heading,
  Item,
  Link,
  Text,
  View,
} from '@adobe/react-spectrum'
import Delete from '@spectrum-icons/workflow/Delete'
import Edit from '@spectrum-icons/workflow/Edit'
import OpenIn from '@spectrum-icons/workflow/OpenIn'
import type { DeleteListMutationVariables, FindLists } from 'types/graphql'

import { Link as RouterLink, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/List/ListsCell'

export const DELETE_LIST_MUTATION = gql`
  mutation DeleteListMutation($id: String!) {
    deleteList(id: $id) {
      id
    }
  }
`

const ListBlock = ({
  list,
  handleDeleteAction,
}: {
  list: FindLists['lists'][0]
  handleDeleteAction: (id: string) => void
}) => {
  const handleAction = useCallback(
    (key: string) => {
      switch (key) {
        case 'edit': {
          navigate(routes.editList({ id: list.id }))
          break
        }
        case 'delete': {
          handleDeleteAction(list.id)
          break
        }
        default: {
          break
        }
      }
    },
    [list, handleDeleteAction]
  )
  return (
    <View
      key={list.id}
      backgroundColor={'gray-100'}
      borderRadius={'large'}
      padding={'size-100'}
      borderColor={'dark'}
      borderWidth={'thin'}
      width={'size-4600'}
      maxWidth={'90vw'}
      minHeight={'size-3000'}
      marginBottom={'size-150'}
    >
      <Flex
        height={'100%'}
        direction={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Header>
          <Heading level={3}>{list.title}</Heading>
        </Header>
        <Text>
          <p style={{ textAlign: 'center', padding: '0 2em' }}>
            {list.description}
          </p>
        </Text>
        <footer>
          <Divider
            marginBottom={'size-100'}
            size="S"
            orientation="horizontal"
          />

          <Flex direction={'row'}>
            <Link isQuiet variant="secondary">
              <RouterLink
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
              </RouterLink>
            </Link>
            <ActionGroup
              isQuiet={true}
              density="compact"
              onAction={handleAction}
            >
              <Item key="edit">
                <Edit /> <Text>Edit</Text>
              </Item>
              <Item key="delete">
                <Delete />
                <Text>Delete</Text>
              </Item>
            </ActionGroup>
          </Flex>
        </footer>
      </Flex>
    </View>
  )
}

const ListsList = ({ lists }: FindLists) => {
  const [deleteList] = useMutation(DELETE_LIST_MUTATION, {
    onCompleted: () => {
      toast.success('List deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteListMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete list ' + id + '?')) {
      deleteList({ variables: { id } })
    }
  }

  return (
    <Flex direction="row" gap="size-200" wrap justifyContent={'center'}>
      {lists.map((list) => {
        return (
          <ListBlock
            key={list.id}
            list={list}
            handleDeleteAction={onDeleteClick}
          />
        )
      })}
    </Flex>
  )
}

export default ListsList
