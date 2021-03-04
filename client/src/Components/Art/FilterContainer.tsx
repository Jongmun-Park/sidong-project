import React, { FC, useState } from 'react'
import {
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { currencyFormatter } from '../../utils'
import { Medium } from '../../types'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    '& .MuiTypography-body1': {
      fontSize: '13px',
      fontWeight: 600,
    },
  },
  chips: {
    margin: '5px 0 15px 0',
    paddingLeft: '18px',
    '& div.inactive': {
      backgroundColor: theme.palette.greyFont.main,
    },
    '& .MuiChip-root': {
      fontSize: '12px',
    },
  },
  select: {
    float: 'right',
    width: '180px',
    margin: '5px 20px 10px 0',
  },
  slider: {
    width: '90%',
  },
  priceBox: {
    textAlign: 'right',
    paddingRight: '30px',
  },
  priceCollapse: {
    paddingLeft: '18px',
    marginBottom: '15px',
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
  const [price, setPrice] = useState<number[]>([10000, 2500000])
  const [medium, setMedium] = useState(Medium.PAINTING.toString())

  const handleMedium = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMedium(event.target.value as string)
  }

  const handlePriceRange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[])
  }

  return (
    <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
      <ListItem>
        <ListItemText primary="매체 | Medium" />
      </ListItem>
      <Select className={classes.select} value={medium} onChange={handleMedium}>
        <MenuItem value={Medium.PAINTING}>회화 (Painting)</MenuItem>
        <MenuItem value={Medium.SCULPTURE}>조각 (Sculpture)</MenuItem>
        <MenuItem value={Medium.DRAWING}>소묘 (Drawing)</MenuItem>
        <MenuItem value={Medium.PRINT}>판화 (Print)</MenuItem>
        <MenuItem value={Medium.PAPER}>종이 (Paper)</MenuItem>
        <MenuItem value={Medium.TEXTILE}>섬유 (Textile)</MenuItem>
        <MenuItem value={Medium.ETC}>기타 매체</MenuItem>
      </Select>
      <ListItem>
        <ListItemText primary="주제 | Theme" />
      </ListItem>
      <ListItem>
        <ListItemText primary="스타일 | Style" />
      </ListItem>
      <ListItem>
        <ListItemText primary="기법 | Technique" />
      </ListItem>
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
      <Collapse className={classes.priceCollapse} in={openPrice} timeout="auto" unmountOnExit>
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
      <br />- size
      <br />- orientation
      <br />- isFramed
    </List>
  )
}

export default FilterContainer
