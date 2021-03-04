import React, { FC, useState } from 'react'
import { Chip, Collapse, List, ListItem, ListItemText, Slider, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { currencyFormatter } from '../../utils'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    '& .MuiTypography-body1': {
      fontSize: '15px',
      fontWeight: 600,
    },
  },
  chips: {
    margin: '5px 0 15px 0',
    paddingLeft: '18px',
    '& div.inactive': {
      backgroundColor: theme.palette.greyFont.main,
    },
  },
  slider: {
    width: '90%',
  },
  priceBox: {
    textAlign: 'right',
    paddingRight: '30px',
  },
}))

const FilterContainer: FC = () => {
  const classes = useStyles()
  const [saleStatus, setSaleStatus] = useState({
    onSale: true,
    soldOut: true,
    notForSale: true,
  })
  const [openSaleStatus, setOpenSaleStatus] = useState(true)
  const [openPrice, setOpenPrice] = useState(true)
  const [price, setPrice] = useState<number[]>([10000, 1000000])

  const handlePriceRange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[])
  }

  return (
    <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
      <ListItem
        button
        onClick={() => {
          setOpenSaleStatus(!openSaleStatus)
        }}
      >
        <ListItemText primary="판매 상태" />
        {openSaleStatus ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse className={classes.chips} in={openSaleStatus} timeout="auto" unmountOnExit>
        <Chip
          className={saleStatus.onSale ? '' : 'inactive'}
          label="판매품"
          clickable
          color="primary"
          size="small"
          onClick={() => {
            setSaleStatus({ ...saleStatus, onSale: true })
          }}
          onDelete={() => {
            setSaleStatus({ ...saleStatus, onSale: false })
          }}
        />
        <Chip
          className={saleStatus.soldOut ? '' : 'inactive'}
          label="판매 완료"
          clickable
          color="primary"
          size="small"
          onClick={() => {
            setSaleStatus({ ...saleStatus, soldOut: true })
          }}
          onDelete={() => {
            setSaleStatus({ ...saleStatus, soldOut: false })
          }}
        />
        <Chip
          className={saleStatus.notForSale ? '' : 'inactive'}
          label="비매품"
          clickable
          color="primary"
          size="small"
          onClick={() => {
            setSaleStatus({ ...saleStatus, notForSale: true })
          }}
          onDelete={() => {
            setSaleStatus({ ...saleStatus, notForSale: false })
          }}
        />
      </Collapse>
      <ListItem
        button
        onClick={() => {
          setOpenPrice(!openPrice)
        }}
      >
        <ListItemText primary="판매 가격" />
        {openPrice ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse style={{ paddingLeft: '18px' }} in={openPrice} timeout="auto" unmountOnExit>
        <Slider
          className={classes.slider}
          value={price}
          min={10000}
          max={5000000}
          step={100000}
          onChange={handlePriceRange}
          valueLabelDisplay="off"
          getAriaValueText={(value) => `${value}원`}
        />
        <div className={classes.priceBox}>
          <Typography variant="caption">{currencyFormatter(price[0])} ~</Typography>
          <Typography variant="caption"> {currencyFormatter(price[1])}</Typography>
        </div>
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
