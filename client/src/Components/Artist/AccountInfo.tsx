import React, { FC, useState, ChangeEvent } from 'react'
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
import { useMutation, useQuery } from '@apollo/react-hooks'
import { ArtistAccountInfo } from '../../types'

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
})

interface AccountInfoProps {
  openDialog: boolean
  handleOpenDialog: (arg: boolean) => void
}

const ACCOUNT_INFO = gql`
  query AccountInfo {
    artistAccountInfo {
      bankName
      master
      number
    }
  }
`

const REGISTER_ACCOUNT_INFO = gql`
  mutation RegisterAccountInfo($bankName: String!, $master: String!, $number: String!) {
    registerAccountInfo(bankName: $bankName, master: $master, number: $number) {
      success
    }
  }
`

const AccountInfo: FC<AccountInfoProps> = ({ openDialog, handleOpenDialog }) => {
  const classes = useStyles()
  const [accountInfo, setAccountInfo] = useState<ArtistAccountInfo>({
    bankName: '',
    master: '',
    number: '',
  })
  const { register, handleSubmit } = useForm()
  const [registerAccountInfo] = useMutation(REGISTER_ACCOUNT_INFO)

  const { refetch } = useQuery(ACCOUNT_INFO, {
    onCompleted: (data) => {
      if (data?.artistAccountInfo) {
        setAccountInfo(data.artistAccountInfo)
      }
    },
    onError: (error) => console.error(error.message),
  })

  const handleClose = () => {
    handleOpenDialog(false)
  }

  const onSubmit = async (data: any) => {
    const result = await registerAccountInfo({
      variables: { bankName: data.bankName, master: data.master, number: data.number },
    })

    if (result.data.registerAccountInfo.success) {
      alert('정산 계좌 등록이 완료됐습니다.')
      refetch()
    } else {
      alert('등록 중 문제가 발생했습니다. (관리자 문의)')
    }
  }

  return (
    <Dialog open={openDialog} onClose={handleClose} aria-labelledby="account-info-dialog">
      <DialogTitle id="account-info-dialog">정산 계좌 관리</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            autoFocus
            margin="dense"
            label="은행명"
            name="bankName"
            required={true}
            inputRef={register}
            value={accountInfo.bankName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAccountInfo({
                ...accountInfo,
                bankName: e.target.value,
              })
            }}
          />
          <TextField
            margin="dense"
            label="예금주"
            name="master"
            required={true}
            inputRef={register}
            value={accountInfo.master}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAccountInfo({
                ...accountInfo,
                master: e.target.value,
              })
            }}
          />
          <TextField
            margin="dense"
            label="계좌번호"
            name="number"
            required={true}
            inputRef={register}
            value={accountInfo.number}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAccountInfo({
                ...accountInfo,
                number: e.target.value,
              })
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취 소
          </Button>
          <Button type="submit" color="primary">
            등 록
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AccountInfo
