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

interface SignUpProps {
  open: boolean
  setOpen: (arg: boolean) => any
}

const SIGN_UP_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      user {
        id
        username
      }
      success
    }
  }
`

const SignUp: FunctionComponent<SignUpProps> = ({ open, setOpen }) => {
  const [createUser] = useMutation(SIGN_UP_MUTATION)
  const handleClose = () => {
    setOpen(false)
  }

  const [inputState, dispatch] = useReducer(changeValueReducer, {
    email: '',
    password: '',
    passwordForCheck: '',
  })

  const handleJoinButton = useCallback(async () => {
    if (inputState.password === '') {
      alert('비밀번호를 입력해주세요.')
      return
    }

    if (inputState.password !== inputState.passwordForCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    const { data } = await createUser({
      variables: { email: inputState.email, password: inputState.password },
    })

    if (data.createUser.success) {
      alert('회원 가입이 완료됐습니다. 감사합니다.')
    } else {
      alert('이미 등록된 이메일입니다.')
    }
  }, [inputState, createUser])

  const handleInputChange = useCallback((event) => {
    dispatch(event.target)
  }, [])

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="sign-up-dialog">
      <DialogTitle id="sign-up-dialog">회원 가입</DialogTitle>
      <DialogContent>
        {/* <DialogContentText></DialogContentText> */}
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
        <TextField
          margin="dense"
          label="비밀번호 확인"
          type="password"
          name="passwordForCheck"
          value={inputState.passwordForCheck}
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
