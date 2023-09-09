// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Private } from '@redwoodjs/router'

import { useAuth } from './auth'
import LoggedInLayout from './layouts/LoggedInLayout/LoggedInLayout'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Private wrap={LoggedInLayout} unauthenticated="home">
        <Route path="/shuffles/new" page={ListNewListPage} name="newList" />
        <Route path="/shuffles/{id}/edit" page={ListEditListPage} name="editList" />
        <Route path="/shuffles" page={ListListsPage} name="shuffles" />
      </Private>
      <Route path="/shuffles/{id}" page={ListListPage} name="shuffle" />

      <Route path="/" page={HomePage} name="home" />
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
