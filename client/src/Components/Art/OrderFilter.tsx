import React, { FC, useState, ChangeEvent } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  select: {
    width: '100px',
    margin: '0px 30px 18px 0px',
    alignSelf: 'flex-end',
    fontSize: '13px',
  },
})

const OrderFilter: FC = () => {
  const classes = useStyles()
  const [orderBy, setOrderBy] = useState('latest')

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setOrderBy(event.target.value as string)
  }

  return (
    <Select
      defaultValue="latest"
      className={classes.select}
      value={orderBy}
      onChange={handleChange}
    >
      <MenuItem value="latest">최신순</MenuItem>
      <MenuItem value="oldest">오래된 순</MenuItem>
      <MenuItem value="like">좋아요순</MenuItem>
      <MenuItem value="lowPrice">낮은 가격순</MenuItem>
      <MenuItem value="highPrice">높은 가격순</MenuItem>
    </Select>
  )
}

export default OrderFilter
