import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core/'
import { Close } from '@material-ui/icons'
import ArtDetail from './ArtDetail'

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialogTitle-root': {
      '@media (max-width: 834px)': {
        padding: '12px 24px',
      },
    },
    '& .MuiDialogActions-root': {
      '@media (max-width: 834px)': {
        padding: '4px',
      },
    },
    '& .MuiDialog-paperWidthSm': {
      width: '95%',
      maxWidth: 'none',
      '@media (min-width: 1024px)': {
        width: '80%',
      },
    },
    '& .MuiDialog-paper': {
      margin: '0',
    },
    '& .MuiDialogContent-dividers': {
      borderTop: 'none',
    },
    '& h2': {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1rem',
      '@media (max-width: 834px)': {
        fontSize: '14px',
      },
    },
    '& .MuiIconButton-root': {
      padding: '0',
    },
  },
})

interface ArtDialogProps {
  openDialog: boolean
  setOpenDialog: (arg0: boolean) => void
  artId: number
  artName: string
}

const ArtDialog: FC<ArtDialogProps> = ({ openDialog, setOpenDialog, artId, artName }) => {
  const classes = useStyles()
  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog
      className={classes.dialog}
      open={openDialog}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="art-dialog-title"
    >
      <DialogTitle id="art-dialog-title">
        <span>작품 상세 정보</span>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <ArtDetail artId={artId} />
      </DialogContent>
    </Dialog>
  )
}

export default ArtDialog
