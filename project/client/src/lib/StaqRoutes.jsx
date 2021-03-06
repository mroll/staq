import React, { useEffect, useState } from 'react'
import { Redirect, Route, useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'

import staqConfig from '../../../staq'

import { withAuth } from './Auth'

import LandingPage from '../pages/LandingPage/LandingPage'
import SignUpPage from '../pages/SignUpPage/SignUpPage'
import SignInPage from '../pages/SignInPage/SignInPage'
import PricingPage from '../pages/PricingPage/PricingPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage/ForgotPasswordPage'

import * as Footers from '../components/Footer'
import * as Navbars from '../components/Navigation'
import * as Routes from '../constants/routes'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function PrivateRouteBase({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return auth.currentUser ? (
          <Component auth={auth} {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }}
    />
  )
}

const footerRoutes = [
  '/',
  '/demo',
  '/signin',
  '/signup',
  '/pricing',
  '/forgot-password',
]

function StaqRoutes() {
  const history = useHistory()
  const [pathname, setPathname] = useState(history.location.pathname)

  history.listen((location) => {
    setPathname(location.pathname)
  })

  const template = staqConfig.get('Template.Name')

  const navbarRoutes = staqConfig.get('navbarRoutes')
  const Navbar = Navbars[`Navbar${template}`]

  const footerColumns = staqConfig.get('Template.Config.Footer.Columns', {})
  const copyright = staqConfig.get('Template.Config.Footer.Copyright')
  const poweredByStaq = staqConfig.get(
    'Template.Config.Footer.PoweredByStaq',
    false,
  )
  const Footer = Footers[`Footer${template}`]

  return (
    <>
      <ScrollToTop />
      {_.isNil(navbarRoutes) ? (
        <Navbar />
      ) : navbarRoutes.includes(pathname) ? (
        <Navbar />
      ) : null}

      <Route exact path={Routes.Landing} component={LandingPage} />
      <Route path={Routes.SignUp} component={SignUpPage} />
      <Route path={Routes.SignIn} component={SignInPage} />
      <Route path={Routes.Pricing} component={PricingPage} />

      <Route path={Routes.ForgotPassword} component={ForgotPasswordPage} />

      {footerRoutes.includes(pathname) ? (
        <Footer
          Columns={footerColumns}
          Copyright={copyright}
          PoweredByStaq={poweredByStaq}
        />
      ) : null}
    </>
  )
}

const PrivateRoute = withAuth(PrivateRouteBase)

export default StaqRoutes
export { PrivateRoute }
