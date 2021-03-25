import React, { FC, useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks'
import {
  Button,
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
    '@media (max-width: 823px)': {
      height: '370px',
      overflowY: 'auto',
    },
  },
  chips: {
    margin: '5px 0 8px 0',
    paddingLeft: '18px',
    '& div.inactive': {
      backgroundColor: theme.palette.greyFont.main,
    },
    '& .MuiChip-root': {
      fontSize: '12px',
      marginBottom: '2px',
    },
  },
  select: {
    float: 'right',
    width: '180px',
    margin: '0 20px 5px 0',
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
    marginBottom: '5px',
  },
  buttonWrapper: {
    margin: '12px 22px 5px 0px',
    float: 'right',
  },
  button: {
    backgroundColor: theme.palette.lightBlack.main,
    color: theme.palette.lightYellow.main,
    '&.MuiButton-contained:hover': {
      backgroundColor: theme.palette.lightBlack.light,
    },
  },
}))

interface FilterContainerProps {
  setFilters: (arg0: any) => void
  setOpenMobileFilter?: (arg0: boolean) => void
}

const FilterContainer: FC<FilterContainerProps> = ({ setFilters, setOpenMobileFilter }) => {
  const classes = useStyles()
  const [openSaleStatus, setOpenSaleStatus] = useState(true)
  const [openPrice, setOpenPrice] = useState(true)
  const [openArtOptions, setOpenArtOptions] = useState(false)
  const [openSize, setOpenSize] = useState(false)
  const [openOrientation, setOpenOrientation] = useState(false)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)

  const [saleStatus, setSaleStatus] = useState({
    onSale: true,
    soldOut: true,
    notForSale: true,
  })
  const [size, setSize] = useState({
    small: true,
    medium: true,
    large: true,
  })
  const [orientation, setOrientation] = useState({
    landscape: true,
    portrait: true,
    square: true,
    etc: true,
  })
  const [price, setPrice] = useState<number[]>([10000, 5000000])
  const [medium, setMedium] = useState<Medium | string>('all')
  const [theme, setTheme] = useState<string>('all')
  const [style, setStyle] = useState<string>('all')
  const [technique, setTechnique] = useState<string>('all')

  const [changeArtOptions] = useLazyQuery(ART_OPTIONS, {
    onCompleted: (data) => {
      setArtOptions(data.artOptions)
    },
    onError: (error) => console.error(error.message),
  })

  const handlePriceRange = (event: any, newValue: number | number[]) => {
    setPrice(newValue as number[])
  }

  const handleMedium = (e: React.ChangeEvent<{ value: unknown }>) => {
    setMedium(e.target.value as Medium | string)
    if (e.target.value !== 'all') {
      changeArtOptions({
        variables: {
          mediumId: e.target.value,
        },
      })
      setOpenArtOptions(true)
    } else {
      setOpenArtOptions(false)
      setTheme('all')
      setStyle('all')
      setTechnique('all')
    }
  }

  const handleApply = () => {
    setFilters({
      saleStatus,
      size,
      orientation,
      price,
      medium,
      theme,
      style,
      technique,
    })
    if (setOpenMobileFilter) {
      setOpenMobileFilter(false)
    }
  }

  return (
    <div>
      <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
        <ListItem>
          <ListItemText primary="매체 | Medium" />
        </ListItem>
        <Select className={classes.select} value={medium} onChange={handleMedium}>
          <MenuItem value={'all'}>전 체</MenuItem>
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
              <MenuItem value={'all'}>전 체</MenuItem>
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
              <MenuItem value={'all'}>전 체</MenuItem>
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
              <MenuItem value={'all'}>전 체</MenuItem>
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
        <ListItem
          button
          onClick={() => {
            setOpenSize(!openSize)
          }}
        >
          <ListItemText primary="크기" />
          {openSize ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse className={classes.chips} in={openSize} timeout="auto" unmountOnExit>
          <Chip
            className={size.small ? '' : 'inactive'}
            label="50cm 이하"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setSize({ ...size, small: true })
            }}
            onDelete={() => {
              setSize({ ...size, small: false })
            }}
          />
          <Chip
            className={size.medium ? '' : 'inactive'}
            label="50~150cm"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setSize({ ...size, medium: true })
            }}
            onDelete={() => {
              setSize({ ...size, medium: false })
            }}
          />
          <Chip
            className={size.large ? '' : 'inactive'}
            label="150cm 초과"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setSize({ ...size, large: true })
            }}
            onDelete={() => {
              setSize({ ...size, large: false })
            }}
          />
        </Collapse>
        <ListItem
          button
          onClick={() => {
            setOpenOrientation(!openOrientation)
          }}
        >
          <ListItemText primary="방향" />
          {openOrientation ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse className={classes.chips} in={openOrientation} timeout="auto" unmountOnExit>
          <Chip
            className={orientation.landscape ? '' : 'inactive'}
            label="가로가 긴 배치"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setOrientation({ ...orientation, landscape: true })
            }}
            onDelete={() => {
              setOrientation({ ...orientation, landscape: false })
            }}
          />
          <Chip
            className={orientation.portrait ? '' : 'inactive'}
            label="세로가 긴 배치"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setOrientation({ ...orientation, portrait: true })
            }}
            onDelete={() => {
              setOrientation({ ...orientation, portrait: false })
            }}
          />
          <Chip
            className={orientation.square ? '' : 'inactive'}
            label="정사각형"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setOrientation({ ...orientation, square: true })
            }}
            onDelete={() => {
              setOrientation({ ...orientation, square: false })
            }}
          />
          <Chip
            className={orientation.etc ? '' : 'inactive'}
            label="기타"
            clickable
            color="primary"
            size="small"
            onClick={() => {
              setOrientation({ ...orientation, etc: true })
            }}
            onDelete={() => {
              setOrientation({ ...orientation, etc: false })
            }}
          />
        </Collapse>
      </List>
      <div className={classes.buttonWrapper}>
        {setOpenMobileFilter && (
          <Button
            onClick={() => setOpenMobileFilter(false)}
            className={classes.button}
            style={{ marginRight: '14px' }}
            variant="contained"
            size="small"
          >
            닫 기
          </Button>
        )}
        <Button onClick={handleApply} className={classes.button} variant="contained" size="small">
          적용하기
        </Button>
      </div>
    </div>
  )
}

export default FilterContainer
