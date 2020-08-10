import React, { FunctionComponent, useReducer, useCallback } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import { changeValueReducer } from '../../utils'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

interface LoginProps {
  open: boolean
  setOpen: (arg: boolean) => any
}

const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
    }
  }
`

const Login: FunctionComponent<LoginProps> = ({ open, setOpen }) => {
  const [loginUser] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      alert('이메일과 비밀번호를 확인해주세요.')
    },
  })

  const handleClose = () => {
    setOpen(false)
  }

  const [inputState, dispatch] = useReducer(changeValueReducer, {
    email: '',
    password: '',
  })

  const handleLoginButton = useCallback(async () => {
    if (inputState.password === '') {
      alert('비밀번호를 입력해주세요.')
      return
    }

    const result = await loginUser({
      variables: { email: inputState.email, password: inputState.password },
    })

    if (result) {
      sessionStorage.setItem('token', result.data.tokenAuth.token)
      window.location.reload()
    }
  }, [inputState, loginUser])

  const handleInputChange = useCallback((event) => {
    dispatch(event.target)
  }, [])

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="login-dialog">
      <DialogTitle id="login-dialog">로그인</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이메일 주소"
          type="email"
          name="email"
          value={inputState.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="비밀번호"
          type="password"
          name="password"
          value={inputState.password}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleLoginButton} color="primary">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Login
