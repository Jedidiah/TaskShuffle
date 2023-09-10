import { useEffect } from 'react'

import { Provider, View } from '@adobe/react-spectrum'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Logo from 'src/components/Logo/Logo'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.shuffles())
    }
  }, [isAuthenticated])
  return (
    <Provider colorScheme="dark">
      <View minHeight="100vh">
        <MetaTags title="Login" />

        <div
          style={{
            fontSize: '4em',
            paddingTop: '0.25em',
            textAlign: 'center',
            paddingRight: '20vw',
          }}
        >
          <Logo />
        </div>

        <MetaTags title="Home" description="Home page" />

        <p style={{ textAlign: 'center', fontSize: '2em' }}>
          <Link to={routes.signup()}>Register</Link> or{' '}
          <Link to={routes.login()}>Login</Link>
        </p>
      </View>
    </Provider>
  )
}

export default HomePage
