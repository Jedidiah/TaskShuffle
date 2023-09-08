import { useEffect } from 'react'

import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.shuffles())
    }
  }, [isAuthenticated])
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Shuffle</h1>
      <p>
        <Link to={routes.signup()}>Register</Link> or{' '}
        <Link to={routes.login()}>Login</Link>
      </p>
    </>
  )
}

export default HomePage
