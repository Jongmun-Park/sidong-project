import React, { FC, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
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
import { ArtOptions, Medium } from '../../types'
import { ART_OPTIONS } from '../../querys'

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
    fontSize: '13px',
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
  const [openSaleStatus, setOpenSaleStatus] = useState(true)
  const [openPrice, setOpenPrice] = useState(true)
  const [openArtOptions, setOpenArtOptions] = useState(false)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)
  const [saleStatus, setSaleStatus] = useState({
    onSale: true,
    soldOut: true,
    notForSale: true,
  })
  const [price, setPrice] = useState<number[]>([10000, 5000000])
  const [medium, setMedium] = useState<Medium | string>('none')
  const [theme, setTheme] = useState<string>('none')
  const [style, setStyle] = useState<string>('none')
  const [technique, setTechnique] = useState<string>('none')

  const [changeArtOptions] = useLazyQuery(ART_OPTIONS, {
    onCompleted: (data) => {
      setArtOptions(data.artOptions)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  const handlePriceRange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[])
  }

  const handleMedium = (e: React.ChangeEvent<{ value: unknown }>) => {
    setMedium(e.target.value as Medium | string)
    if (e.target.value !== 'none') {
      changeArtOptions({
        variables: {
          mediumId: e.target.value,
        },
      })
      setOpenArtOptions(true)
    } else {
      setOpenArtOptions(false)
      setTheme('none')
      setStyle('none')
      setTechnique('none')
    }
  }

  return (
    <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
      <ListItem>
        <ListItemText primary="매체 | Medium" />
      </ListItem>
      <Select className={classes.select} value={medium} onChange={handleMedium}>
        <MenuItem value={'none'}>선택 안함</MenuItem>
        <MenuItem value={Medium.PAINTING}>회화 (Painting)</MenuItem>
        <MenuItem value={Medium.SCULPTURE}>조각 (Sculpture)</MenuItem>
        <MenuItem value={Medium.DRAWING}>소묘 (Drawing)</MenuItem>
        <MenuItem value={Medium.PRINT}>판화 (Print)</MenuItem>
        <MenuItem value={Medium.PAPER}>종이 (Paper)</MenuItem>
        <MenuItem value={Medium.TEXTILE}>섬유 (Textile)</MenuItem>
        <MenuItem value={Medium.ETC}>기타 매체</MenuItem>
      </Select>
      {openArtOptions && (
        <div>
          <ListItem>
            <ListItemText primary="주제 | Theme" />
          </ListItem>
          <Select
            className={classes.select}
            value={theme}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              setTheme(e.target.value as string)
            }}
          >
            <MenuItem value={'none'}>선택 안함</MenuItem>
            {artOptions?.themes.map((theme) => (
              <MenuItem key={theme.id} value={theme.id}>
                {theme.name}
              </MenuItem>
            ))}
          </Select>
          <ListItem>
            <ListItemText primary="스타일 | Style" />
          </ListItem>
          <Select
            className={classes.select}
            value={style}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              setStyle(e.target.value as string)
            }}
          >
            <MenuItem value={'none'}>선택 안함</MenuItem>
            {artOptions?.styles.map((style) => (
              <MenuItem key={style.id} value={style.id}>
                {style.name}
              </MenuItem>
            ))}
          </Select>
          <ListItem>
            <ListItemText primary="기법 | Technique" />
          </ListItem>
          <Select
            className={classes.select}
            value={technique}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              setTechnique(e.target.value as string)
            }}
          >
            <MenuItem value={'none'}>선택 안함</MenuItem>
            {artOptions?.techniques.map((technique) => (
              <MenuItem key={technique.id} value={technique.id}>
                {technique.name}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
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
      <ListItem>
        <ListItemText primary="크기" />
      </ListItem>
      <ListItem>
        <ListItemText primary="방향" />
      </ListItem>
      <ListItem>
        <ListItemText primary="액자 유무" />
      </ListItem>
    </List>
  )
}

export default FilterContainer
