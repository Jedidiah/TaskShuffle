import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>TaskShuffle</h1>
      <p>
        <Link to={routes.signup()}>Register</Link> or{' '}
        <Link to={routes.login()}>Login</Link>
      </p>
    </>
  )
}

export default HomePage
