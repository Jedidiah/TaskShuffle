import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const LogoutPage = () => {
  const { isAuthenticated, logOut } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      logOut()
    } else {
      navigate(routes.home())
    }
  }, [isAuthenticated, logOut])

  return (
    <>
      <MetaTags title="Logging Out" />
    </>
  )
}

export default LogoutPage
