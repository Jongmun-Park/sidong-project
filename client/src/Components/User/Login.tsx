import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles({
  dialogContent: {
    '&.MuiDialogContent-root:first-child': {
      paddingTop: '0px',
    },
  },
})

interface LoginProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => void
}

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    tokenAuth(username: $email, password: $password) {
      token
    }
  }
`

const CHECK_USER_EMAIL = gql`
  mutation CheckUserEmail($email: String!) {
    checkUserEmail(email: $email) {
      result
    }
  }
`

const Login: FC<LoginProps> = ({ openDialog, handleOpenDialog }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm()
  const [checkUserEmail] = useMutation(CHECK_USER_EMAIL)
  const [loginUser] = useMutation(LOGIN_MUTATION, {
    onError: (error) => {
      alert('비밀번호를 확인해주세요.')
    },
  })

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const onSubmit = async (data: any) => {
    const resultOfEmail = await checkUserEmail({
      variables: {
        email: data.email,
      },
    })

    if (!resultOfEmail.data.checkUserEmail.result) {
      alert('존재하지 않는 이메일 주소입니다.')
      return
    }

    const result = await loginUser({
      variables: { email: data.email, password: data.password },
    })

    if (result) {
      sessionStorage.setItem('token', result.data.tokenAuth.token)
      window.location.reload()
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="login-dialog">
      <DialogTitle id="login-dialog">로그인</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            label="이메일 주소"
            type="email"
            name="email"
            required={true}
            inputRef={register}
            fullWidth
          />
          <TextField
            margin="dense"
            label="비밀번호"
            type="password"
            name="password"
            required={true}
            inputRef={register}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
          <Button type="submit" color="primary">
            확 인
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default Login
