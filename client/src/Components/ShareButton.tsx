import React, { FC, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  DialogTitle,
} from '@material-ui/core'
import ShareIcon from '@material-ui/icons/Share'
import Clipboard from 'clipboard'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    '& h2': {
      fontSize: '1rem',
    },
  },
}))

interface ShareButtonProps {
  shareUrl: string
}

const ShareButton: FC<ShareButtonProps> = ({ shareUrl }) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const inputEl = useRef(null)

  new Clipboard('#copyButton', {
    target: () => inputEl.current as any,
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <ShareIcon fontSize="small" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="share-dialog-title"
        aria-describedby="share-dialog-text"
      >
        <DialogTitle id="share-dialog-title" className={classes.dialogTitle}>
          공유 URL
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="share-dialog-text">
            <input ref={inputEl} type="text" defaultValue={shareUrl} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            id="copyButton"
            color="primary"
            size="small"
            onClick={() => {
              alert('주소 복사 완료!')
            }}
          >
            복사하기
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ShareButton
