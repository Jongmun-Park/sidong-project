import React, { FunctionComponent, ChangeEvent, useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

interface LoginProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => any
}

interface LoginInputProps {
  email: string
  password: string
}

const LOGIN_MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
    }
  }
`

const Login: FunctionComponent<LoginProps> = ({ openDialog, handleOpenDialog }) => {
  const [loginUser] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      alert('이메일과 비밀번호를 확인해주세요.')
    },
  })

  const [inputs, setInputs] = useState<LoginInputProps>({
    email: '',
    password: '',
  })

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const handleLoginButton = async () => {
    if (inputs.password === '') {
      alert('비밀번호를 입력해주세요.')
      return
    }

    const result = await loginUser({
      variables: { email: inputs.email, password: inputs.password },
    })

    if (result) {
      sessionStorage.setItem('token', result.data.tokenAuth.token)
      window.location.reload()
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="login-dialog">
      <DialogTitle id="login-dialog">로그인</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="이메일 주소"
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="비밀번호"
          type="password"
          name="password"
          value={inputs.password}
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
