import React, { FC, useState, ChangeEvent } from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  select: {
    width: '100px',
    margin: '0px 30px 18px 0px',
    fontSize: '13px',
    '@media (min-width: 1500px)': {
      margin: '0px 100px 18px 0px',
    },
    '@media (max-width: 823px)': {
      margin: '0px',
      fontSize: '11px',
    },
  },
})

interface OrderFilterProps {
  filters: any
  setFilters: (arg0: any) => void
}

const OrderFilter: FC<OrderFilterProps> = ({ filters, setFilters }) => {
  const classes = useStyles()
  const [orderBy, setOrderBy] = useState<string>('latest')

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string
    let orderingPriority: Array<string> = []
    setOrderBy(value)
    if (value === 'latest') {
      orderingPriority = ['-id']
    } else if (value === 'oldest') {
      orderingPriority = ['id']
    } else if (value === 'likeCount') {
      orderingPriority = ['-like_count', '-id']
    }
    setFilters({
      ...filters,
      orderingPriority,
    })
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
      <MenuItem value="likeCount">좋아요순</MenuItem>
    </Select>
  )
}

export default OrderFilter
