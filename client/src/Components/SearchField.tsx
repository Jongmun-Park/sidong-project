import React from 'react'
import { InputBase, Button } from '@material-ui/core'
import { makeStyles, fade } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  search: {
    width: '85%',
    maxWidth: '300px',
    height: '100%',
    margin: 'auto 15px auto auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: '8px',
    marginRight: '5px',
    transition: theme.transitions.create('width'),
    width: '100%',
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
    },
  },
}))

export default function SearchField() {
  const classes = useStyles()

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="search word"
        autoFocus={true}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <Button color="primary">search</Button>
    </div>
  )
}
