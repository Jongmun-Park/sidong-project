import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  loadMoreButton: {
    width: '40%',
    maxWidth: '300px',
    height: '39px',
    margin: 'auto',
    fontWeight: 500,
    backgroundColor: theme.palette.primary.light,
    borderRadius: '8px',
    '@media (max-width: 834px)': {
      height: '33px',
      fontSize: '12px',
    },
  },
}))

interface LoadMoreButtonProps {
  onClick: () => void
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick }) => {
  const classes = useStyles()
  return (
    <Button
      className={classes.loadMoreButton}
      variant="contained"
      color="primary"
      endIcon={<ExpandMoreIcon />}
      onClick={onClick}
    >
      더 보기
    </Button>
  )
}

export default LoadMoreButton
