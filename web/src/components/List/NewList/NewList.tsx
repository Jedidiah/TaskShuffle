import { Breadcrumbs, Flex, Item, View } from '@adobe/react-spectrum'
import type { CreateListInput } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ListForm from 'src/components/List/ListForm'

const CREATE_LIST_MUTATION = gql`
  mutation CreateListMutation($input: CreateListInput!) {
    createList(input: $input) {
      id
    }
  }
`

const NewList = () => {
  const [createList, { loading, error }] = useMutation(CREATE_LIST_MUTATION, {
    onCompleted: ({ createList }) => {
      toast.success('Shuffle created')
      navigate(routes.editList({ id: createList.id }))
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = async (input: CreateListInput) => {
    const list = await createList({ variables: { input } })
  }

  return (
    // <>
    //   <View
    //     backgroundColor={'gray-50'}
    //     // position={'sticky'}
    //     top={0}
    //     borderBottomWidth={'thin'}
    //     borderBottomColor={'gray-300'}
    //     marginBottom={'size-200'}
    //   >
    //     <Flex
    //       direction={'row'}
    //       minHeight={'48px'}
    //       alignItems={'center'}
    //       // justifyContent={'space-between'}
    //     >
    //       <Breadcrumbs size="L" flexGrow={1}>
    //         <Item key="home">
    //           <Link to={routes.shuffles()}>Shuffles</Link>
    //         </Item>
    //         <Item key="new">New Shuffle</Item>
    //       </Breadcrumbs>
    //     </Flex>
    //   </View>
    //   <div className="rw-segment">
    //     <header className="rw-segment-header">
    //       <h2 className="rw-heading rw-heading-secondary">New List</h2>
    //     </header>
    //     <div className="rw-segment-main">
    //       <ListForm
    //         onSave={onSave}
    //         loading={loading}
    //         error={error}
    //         isCreating
    //       />
    //     </div>
    //   </div>
    // </>
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
            <Item key="edit">{`New Shuffle`}</Item>
          </Breadcrumbs>
        </Flex>
      </View>
      <View
        borderRadius="regular"
        margin="size-200"
        backgroundColor="gray-50"
        padding="size-200"
      >
        <ListForm isCreating onSave={onSave} error={error} loading={loading} />
      </View>
    </>
  )
}

export default NewList
