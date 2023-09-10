import { Breadcrumbs, Button, Flex, Item, View } from '@adobe/react-spectrum'

import { Link, navigate, routes } from '@redwoodjs/router'

import ListsCell from 'src/components/List/ListsCell'

const ListsPage = () => {
  return (
    <>
      <View
        backgroundColor={'gray-50'}
        // position={'sticky'}
        top={0}
        borderBottomWidth={'thin'}
        borderBottomColor={'gray-300'}
        marginBottom={'size-200'}
        minHeight={'48px'}
      >
        <Flex direction={'row'} alignItems={'center'} justifyContent={'end'}>
          {/* <Breadcrumbs size="L">
            <Item key="home">Your Shuffles</Item>
          </Breadcrumbs> */}
          <Button
            margin={'size-100'}
            variant="primary"
            style="fill"
            onPress={() => navigate(routes.newList())}
          >
            {/* <Link to={routes.newList()}> */}
            <div className="rw-button-icon">+</div> New Shuffle
            {/* </Link> */}
          </Button>
        </Flex>
      </View>
      <ListsCell />
    </>
  )
}

export default ListsPage
