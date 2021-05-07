import React, { ChangeEvent, FC, useState } from 'react'
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
      '@media (max-width: 834px)': {
        fontSize: '11px',
      },
    },
    '@media (max-width: 834px)': {
      height: '370px',
      overflowY: 'auto',
    },
  },
  listBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    paddingBottom: '14px',
    border: '2px solid',
    borderRadius: '14px',
    borderColor: theme.palette.beige.main,
    backgroundColor: theme.palette.beige.light,
    '&.row': {
      flexDirection: 'row',
    },
    '@media (max-width: 834px)': {
      margin: '0px auto 7px auto',
      maxWidth: '530px',
      paddingBottom: '11px',
    },
  },
  chips: {
    padding: '7px 16px 0px 16px',
    '& .MuiChip-root': {
      fontSize: '12px',
      margin: '0px 2px 2px 0px',
    },
    '& div.inactive': {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.lightBlack.main,
    },
  },
  select: {
    width: '115px',
    alignSelf: 'flex-end',
    fontSize: '13px',
    marginRight: '16px',
    '@media (max-width: 834px)': {
      fontSize: '11px',
    },
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
    float: 'right',
    margin: '5px 5px 0px 0px',
  },
  button: {
    '&.close': {
      marginRight: '14px',
      backgroundColor: theme.palette.lightBlack.main,
      color: theme.palette.beige.main,
    },
    '@media (max-width: 834px)': {
      fontSize: '12px',
      minWidth: '50px',
    },
  },
}))

interface FilterContainerProps {
  filters: any
  setFilters: (arg0: any) => void
  setOpenMobileFilter?: (arg0: boolean) => void
}

const FilterContainer: FC<FilterContainerProps> = ({
  filters,
  setFilters,
  setOpenMobileFilter,
}) => {
  const classes = useStyles()
  const [openSaleStatus, setOpenSaleStatus] = useState(true)
  const [openPrice, setOpenPrice] = useState(false)
  const [openArtOptions, setOpenArtOptions] = useState(false)
  const [openSize, setOpenSize] = useState(false)
  const [openOrientation, setOpenOrientation] = useState(false)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)

  const [saleStatus, setSaleStatus] = useState({
    all: true,
    onSale: false,
    soldOut: false,
    notForSale: false,
  })
  const [size, setSize] = useState({
    all: true,
    small: false,
    medium: false,
    large: false,
  })
  const [orientation, setOrientation] = useState({
    all: true,
    landscape: false,
    portrait: false,
    square: false,
    etc: false,
  })
  const [price, setPrice] = useState<number[]>([0, 1500000])
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

  const handleMedium = (e: ChangeEvent<{ value: unknown }>) => {
    setMedium(e.target.value as Medium | string)
    setTheme('all')
    setStyle('all')
    setTechnique('all')

    if (e.target.value !== 'all') {
      changeArtOptions({
        variables: {
          mediumId: e.target.value,
        },
      })
      setOpenArtOptions(true)
    } else {
      setOpenArtOptions(false)
    }
  }

  const handleApply = () => {
    setFilters({
      ...filters,
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
    <>
      <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
        <div className={classes.listBox + ' row'}>
          <ListItem>
            <ListItemText primary="매 체" />
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
        </div>
        {openArtOptions && (
          <>
            <div className={classes.listBox + ' row'}>
              <ListItem>
                <ListItemText primary="주 제" />
              </ListItem>
              <Select
                className={classes.select}
                value={theme}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
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
            </div>
            <div className={classes.listBox + ' row'}>
              <ListItem>
                <ListItemText primary="스타일" />
              </ListItem>
              <Select
                className={classes.select}
                value={style}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
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
            </div>
            <div className={classes.listBox + ' row'}>
              <ListItem>
                <ListItemText primary="기 법" />
              </ListItem>
              <Select
                className={classes.select}
                value={technique}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
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
          </>
        )}
        <div className={classes.listBox}>
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
              className={saleStatus.all ? '' : 'inactive'}
              label="전 체"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSaleStatus({ ...saleStatus, all: !saleStatus.all })
              }}
            />
            <Chip
              className={saleStatus.onSale ? '' : 'inactive'}
              label="판매품"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSaleStatus({ ...saleStatus, onSale: !saleStatus.onSale })
              }}
            />
            <Chip
              className={saleStatus.soldOut ? '' : 'inactive'}
              label="판매 완료"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSaleStatus({ ...saleStatus, soldOut: !saleStatus.soldOut })
              }}
            />
            <Chip
              className={saleStatus.notForSale ? '' : 'inactive'}
              label="비매품"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSaleStatus({ ...saleStatus, notForSale: !saleStatus.notForSale })
              }}
            />
          </Collapse>
        </div>
        <div className={classes.listBox}>
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
              min={0}
              max={1500000}
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
        </div>
        <div className={classes.listBox}>
          <ListItem
            button
            onClick={() => {
              setOpenSize(!openSize)
            }}
          >
            <ListItemText primary="크 기" />
            {openSize ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.chips} in={openSize} timeout="auto" unmountOnExit>
            <Chip
              className={size.all ? '' : 'inactive'}
              label="전 체"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSize({ ...size, all: !size.all })
              }}
            />
            <Chip
              className={size.small ? '' : 'inactive'}
              label="50cm 이하"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSize({ ...size, small: !size.small })
              }}
            />
            <Chip
              className={size.medium ? '' : 'inactive'}
              label="50~150cm"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSize({ ...size, medium: !size.medium })
              }}
            />
            <Chip
              className={size.large ? '' : 'inactive'}
              label="150cm 초과"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setSize({ ...size, large: !size.large })
              }}
            />
          </Collapse>
        </div>
        <div className={classes.listBox}>
          <ListItem
            button
            onClick={() => {
              setOpenOrientation(!openOrientation)
            }}
          >
            <ListItemText primary="방 향" />
            {openOrientation ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse className={classes.chips} in={openOrientation} timeout="auto" unmountOnExit>
            <Chip
              className={orientation.all ? '' : 'inactive'}
              label="전 체"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setOrientation({ ...orientation, all: !orientation.all })
              }}
            />
            <Chip
              className={orientation.landscape ? '' : 'inactive'}
              label="가로가 긴 배치"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setOrientation({ ...orientation, landscape: !orientation.landscape })
              }}
            />
            <Chip
              className={orientation.portrait ? '' : 'inactive'}
              label="세로가 긴 배치"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setOrientation({ ...orientation, portrait: !orientation.portrait })
              }}
            />
            <Chip
              className={orientation.square ? '' : 'inactive'}
              label="정사각형"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setOrientation({ ...orientation, square: !orientation.square })
              }}
            />
            <Chip
              className={orientation.etc ? '' : 'inactive'}
              label="기 타"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setOrientation({ ...orientation, etc: !orientation.etc })
              }}
            />
          </Collapse>
        </div>
      </List>
      <div className={classes.buttonWrapper}>
        {setOpenMobileFilter && (
          <Button
            onClick={() => setOpenMobileFilter(false)}
            className={classes.button + ' close'}
            variant="contained"
            size="small"
          >
            닫 기
          </Button>
        )}
        <Button
          onClick={handleApply}
          color="primary"
          className={classes.button}
          variant="contained"
          size="small"
        >
          적 용
        </Button>
      </div>
    </>
  )
}

export default FilterContainer
