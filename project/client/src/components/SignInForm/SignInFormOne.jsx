import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField, Typography } from '@material-ui/core'

import { withFirebase } from '../../lib/Firebase'

const useStyles = makeStyles((theme) => ({
  signInFormContainer: {
    width: 500,
  },
  signInForm: {
    boxShadow: '0 0 4px #888',
    padding: 10,
    borderRadius: 4,
  },
  title: {
    marginBottom: 15,
    fontWeight: 600,
    fontSize: 18,
  },
  input: {
    width: '100%',
    marginBottom: 5,
  },
  submitBtn: {
    width: '100%',
    marginBottom: 10,
  },
  inputs: {
    marginBottom: 20,
  },
  errorContainer: {
    marginTop: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
  forgotPassword: {
    color: theme.palette.secondary.main,
  },
}))

function SignInFormOne(props) {
  const classes = useStyles()
  const history = useHistory()
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const { firebase } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setField = (field, value) => {
    setState({
      ...state,
      [field]: value,
    })
  }

  const onSubmit = (e) => {
    firebase
      .doSignInWithEmailAndPassword(state.email, state.password)
      .then(() => {
        setState({
          email: '',
          password: '',
        })
      })
      .catch((error) => {
        setError('Please enter a valid username and password.')
      })

    e.preventDefault()
  }

  return (
    <div className={classes.signInFormContainer}>
      <Typography className={classes.title}>Sign In</Typography>

      <div className={classes.signInForm}>
        <form onSubmit={onSubmit}>
          <div className={classes.inputs}>
            <TextField
              value={state.email}
              onChange={(event) => setField('email', event.target.value)}
              className={classes.input}
              label="Email"
            />

            <TextField
              type="password"
              value={state.password}
              onChange={(event) => setField('password', event.target.value)}
              className={classes.input}
              label="Password"
            />
          </div>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submitBtn}
          >
            Login
          </Button>

          <Link className={classes.forgotPassword} to={'/'}>
            Forgot your password?
          </Link>

          {error && (
            <div className={classes.errorContainer}>
              <span className={classes.error}>{error}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default withFirebase(SignInFormOne)
