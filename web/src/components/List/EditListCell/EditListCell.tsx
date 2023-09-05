import { Breadcrumbs, Flex, Item, View } from '@adobe/react-spectrum'
import type { EditListById, UpdateListInput } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
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
      items {
        id
        title
        description
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
      navigate(routes.shuffles())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateListInput, id: EditListById['list']['id']) => {
    updateList({ variables: { id, input } })
  }

  return (
    <>
      <View
        backgroundColor={'gray-50'}
        // position={'sticky'}
        top={0}
        borderBottomWidth={'thin'}
        borderBottomColor={'gray-300'}
        marginBottom={'size-200'}
      >
        <Flex
          direction={'row'}
          minHeight={'48px'}
          alignItems={'center'}
          // justifyContent={'space-between'}
        >
          <Breadcrumbs size="L" flexGrow={1}>
            <Item key="home">
              <Link to={routes.shuffles()}>Shuffles</Link>
            </Item>
            <Item key="edit">{`Editing '${list.title}'`}</Item>
          </Breadcrumbs>
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
