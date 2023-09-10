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

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Logo from 'src/components/Logo/Logo'

type LayoutProps = {
  children: React.ReactNode
}

const LoggedInLayout = ({ children }: LayoutProps) => {
  const { logOut, currentUser } = useAuth()

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
      areas={['header', 'content']}
      rows={['size-900', 'auto']}
      columnGap={0}
    >
      <Provider colorScheme="dark">
        <View paddingX={'size-200'}>
          <Flex
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '3px',
              }}
              to={routes.shuffles()}
            >
              <Logo />
            </Link>
            <MenuTrigger>
              <ActionButton>
                <User /> <Text>{currentUser?.name ?? currentUser?.id} 🞃</Text>
              </ActionButton>
              <Menu onAction={handleUserMenuAction}>
                <Item key="settings">Settings</Item>
                <Item key="logout">Logout</Item>
              </Menu>
            </MenuTrigger>
          </Flex>
        </View>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      </Provider>
      <View backgroundColor={'gray-200'} overflow={'auto'}>
        <View minHeight="90vh">{children}</View>
        <View>{/* Footer */}</View>
      </View>
    </Grid>
  )
}

export default LoggedInLayout
