import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Checkbox,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
} from '@material-ui/core'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const useStyles = makeStyles({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '450px',
    '&.MuiDialogContent-root:first-child': {
      paddingTop: '0px',
    },
    '@media (max-width: 834px)': {
      minWidth: '300px',
    },
  },
  error: {
    color: 'red',
  },
  checkBox: {
    marginTop: '8px',
    '& .MuiTypography-body1': {
      fontSize: '12px',
    },
  },
})

interface SignUpProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => void
}

const SIGN_UP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      success
    }
  }
`

const SignUp: FC<SignUpProps> = ({ openDialog, handleOpenDialog }) => {
  const classes = useStyles()
  const [checkedPolicy, setCheckedPolicy] = useState<boolean>(false)
  const { register, handleSubmit, errors } = useForm()
  const [createUser] = useMutation(SIGN_UP_MUTATION)

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedPolicy(event.target.checked)
  }

  const onSubmit = async (data: any) => {
    if (data.password !== data.passwordForCheck) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    if (!checkedPolicy) {
      alert('이용약관과 개인정보 취급방침에 동의하셔야 가입이 가능합니다.')
      return
    }

    const result = await createUser({
      variables: { email: data.email, password: data.password },
    })

    if (result.data.createUser.success) {
      alert('회원 가입이 완료됐습니다. 감사합니다.')
      handleOpenDialog(false)
    } else {
      alert('이미 등록된 이메일입니다.')
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="sign-up-dialog">
      <DialogTitle id="sign-up-dialog">회원 가입</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            label="이메일 주소"
            type="email"
            name="email"
            required={true}
            inputRef={register({
              pattern: {
                value: /\S+@\w+\.\w+/,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
          />
          {errors.email?.type && <p className={classes.error}>{errors.email?.message}</p>}
          <TextField
            margin="dense"
            label="비밀번호"
            type="password"
            name="password"
            required={true}
            inputRef={register({
              minLength: {
                value: 8,
                message: '8자 이상으로 입력해주세요.',
              },
            })}
          />
          {errors.password?.type && <p className={classes.error}>{errors.password?.message}</p>}
          <TextField
            margin="dense"
            label="비밀번호 확인"
            type="password"
            name="passwordForCheck"
            required={true}
            inputRef={register}
          />
          <FormControlLabel
            className={classes.checkBox}
            control={
              <Checkbox
                size="small"
                checked={checkedPolicy}
                onChange={handleCheckBox}
                color="primary"
              />
            }
            label={
              <div>
                <a href="/service-policy.html">이용약관</a>과{' '}
                <a href="/privacy-policy.html">개인정보 취급방침</a>에 동의합니다.
              </div>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
          <Button type="submit" color="primary">
            가 입
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default SignUp
