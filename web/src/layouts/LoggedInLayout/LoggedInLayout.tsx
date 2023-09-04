import { useCallback } from 'react'

import {
  ActionButton,
  Flex,
  Grid,
  Heading,
  Item,
  Menu,
  MenuTrigger,
  Provider,
  Text,
  View,
} from '@adobe/react-spectrum'
import User from '@spectrum-icons/workflow/User'

import { Link, routes, navigate } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

type LayoutProps = {
  children: React.ReactNode
}

const LoggedInLayout = ({ children }: LayoutProps) => {
  const { logOut } = useAuth()

  const handleUserMenuAction = useCallback(
    (key: string) => {
      if (key === 'logout') {
        logOut()
      }
    },
    [logOut]
  )

  return (
    <Grid
      height={'100vh'}
      areas={['header', 'content', 'footer']}
      rows={['size-900', 'auto', 'size-1000']}
      columnGap={0}
    >
      <Provider colorScheme="dark">
        <View paddingX={'size-200'}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Heading level={1}>TaskShuffle</Heading>
            <MenuTrigger>
              <ActionButton>
                <User /> <Text>Nicolette 🞃</Text>
              </ActionButton>
              <Menu onAction={handleUserMenuAction}>
                <Item key="settings">Settings</Item>
                <Item key="logout">Logout</Item>
              </Menu>
            </MenuTrigger>
          </Flex>
        </View>
      </Provider>
      <View backgroundColor={'static-gray-50'} overflow={'auto'}>
        {children}
      </View>
      <View>Footer</View>
    </Grid>
  )
}

export default LoggedInLayout
