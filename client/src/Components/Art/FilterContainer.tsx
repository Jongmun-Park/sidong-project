import React, { FC, useState } from 'react'
import { Chip, Collapse, List, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
  },
  chips: {
    marginBottom: '15px',
    '& div.inactive': {
      backgroundColor: theme.palette.greyFont.main,
    },
  },
}))

const FilterContainer: FC = () => {
  const classes = useStyles()
  const [saleStatus, setSaleStatus] = useState({
    onSale: true,
    notForSale: false,
    soldOut: false,
  })
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
      <div className={classes.chips}>
        <Chip
          className={saleStatus.onSale ? '' : 'inactive'}
          label="판매품"
          clickable
          color="primary"
          onClick={() => {
            setSaleStatus({ ...saleStatus, onSale: true })
          }}
          onDelete={() => {
            setSaleStatus({ ...saleStatus, onSale: false })
          }}
        />
        <Chip
          className={saleStatus.notForSale ? '' : 'inactive'}
          label="비매품"
          clickable
          color="primary"
          onClick={() => {
            setSaleStatus({ ...saleStatus, notForSale: true })
          }}
          onDelete={() => {
            setSaleStatus({ ...saleStatus, notForSale: false })
          }}
        />
        <Chip
          className={saleStatus.soldOut ? '' : 'inactive'}
          label="판매 완료"
          clickable
          color="primary"
          onClick={() => {
            setSaleStatus({ ...saleStatus, soldOut: true })
          }}
          onDelete={() => {
            setSaleStatus({ ...saleStatus, soldOut: false })
          }}
        />
      </div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="판매 가격" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>- Price</ListItem>
        </List>
      </Collapse>
      <br />- Medium
      <br />- Theme
      <br />- Style
      <br />- Technique
      <br />- size
      <br />- orientation
      <br />- isFramed
    </List>
  )
}

export default FilterContainer
