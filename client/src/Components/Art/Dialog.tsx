import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core/'

const useStyles = makeStyles({
  dialog: {
    '& .MuiDialog-paperWidthSm': {
      width: '95%',
      maxWidth: 'none',
    },
  },
})

interface ArtDialogProps {
  openDialog: boolean
  setOpenDialog: (arg0: boolean) => void
}

const ArtDialog: FC<ArtDialogProps> = ({ openDialog, setOpenDialog }) => {
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
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
          {[...new Array(50)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          닫 기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ArtDialog
