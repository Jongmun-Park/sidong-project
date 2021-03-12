import React, { FC, ChangeEvent, useState } from 'react'
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

interface SignUpProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => any
}

interface SignUpInputProps {
  email: string
  password: string
  passwordForCheck: string
}

const SIGN_UP_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      success
    }
  }
`

const SignUp: FC<SignUpProps> = ({ openDialog, handleOpenDialog }) => {
  const [createUser] = useMutation(SIGN_UP_MUTATION)
  const [inputs, setInputs] = useState<SignUpInputProps>({
    email: '',
    password: '',
    passwordForCheck: '',
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

  const handleJoinButton = async () => {
    if (inputs.password === '') {
      alert('비밀번호를 입력해주세요.')
      return
    }

    if (inputs.password !== inputs.passwordForCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    const { data } = await createUser({
      variables: { email: inputs.email, password: inputs.password },
    })

    if (data.createUser.success) {
      alert('회원 가입이 완료됐습니다. 감사합니다.')
      handleOpenDialog(false)
    } else {
      alert('이미 등록된 이메일입니다.')
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="sign-up-dialog">
      <DialogTitle id="sign-up-dialog">회원 가입</DialogTitle>
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
        <TextField
          margin="dense"
          label="비밀번호 확인"
          type="password"
          name="passwordForCheck"
          value={inputs.passwordForCheck}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          취소
        </Button>
        <Button onClick={handleJoinButton} color="primary">
          가입
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SignUp
