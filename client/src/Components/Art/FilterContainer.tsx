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
      height: '345px',
      overflowY: 'auto',
    },
  },
  listBox: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    paddingBottom: '14px',
    border: '1px solid',
    borderRadius: '8px',
    borderColor: theme.palette.lightBlack.light,
    backgroundColor: 'white',
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
    margin: '20px 15px 0px 0px',
  },
  button: {
    '&.close': {
      backgroundColor: theme.palette.lightBlack.main,
      color: theme.palette.BgColor.main,
    },
    '@media (max-width: 834px)': {
      fontSize: '11px',
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
  const [openPrice, setOpenPrice] = useState(setOpenMobileFilter ? false : true)
  const [openArtOptions, setOpenArtOptions] = useState(false)
  const [openSize, setOpenSize] = useState(setOpenMobileFilter ? false : true)
  const [openOrientation, setOpenOrientation] = useState(setOpenMobileFilter ? false : true)
  const [artOptions, setArtOptions] = useState<ArtOptions | null>(null)
  const [price, setPrice] = useState<number[]>([0, 2000000])

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
    setFilters({
      ...filters,
      medium: e.target.value as Medium | string,
      theme: 'all',
      style: 'all',
      technique: 'all',
    })

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

  return (
    <>
      <List component="nav" aria-label="조건 검색 목록" className={classes.list}>
        <div className={classes.listBox + ' row'}>
          <ListItem>
            <ListItemText primary="매 체" />
          </ListItem>
          <Select className={classes.select} value={filters.medium} onChange={handleMedium}>
            <MenuItem value={'all'}>전 체</MenuItem>
            <MenuItem value={Medium.PAINTING}>회화 (Painting)</MenuItem>
            <MenuItem value={Medium.SCULPTURE}>조각 (Sculpture)</MenuItem>
            <MenuItem value={Medium.PICTURE}>사진 (Picture)</MenuItem>
            <MenuItem value={Medium.DRAWING}>소묘 (Drawing)</MenuItem>
            <MenuItem value={Medium.PRINT}>인쇄 (Print)</MenuItem>
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
                value={filters.theme}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
                  setFilters({ ...filters, theme: e.target.value as string })
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
                value={filters.style}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
                  setFilters({ ...filters, style: e.target.value as string })
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
                value={filters.technique}
                onChange={(e: ChangeEvent<{ value: unknown }>) => {
                  setFilters({ ...filters, technique: e.target.value as string })
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
              className={filters.saleStatus.all ? '' : 'inactive'}
              label="전 체"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                const otherSaleStatus = !filters.saleStatus.all
                  ? {
                      onSale: false,
                      soldOut: false,
                      notForSale: false,
                    }
                  : filters.saleStatus

                setFilters({
                  ...filters,
                  saleStatus: {
                    ...otherSaleStatus,
                    all: !filters.saleStatus.all,
                  },
                })
              }}
            />
            <Chip
              className={filters.saleStatus.onSale ? '' : 'inactive'}
              label="판매품"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  saleStatus: {
                    ...filters.saleStatus,
                    onSale: !filters.saleStatus.onSale,
                    all: false,
                  },
                })
              }}
            />
            <Chip
              className={filters.saleStatus.soldOut ? '' : 'inactive'}
              label="판매 완료"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  saleStatus: {
                    ...filters.saleStatus,
                    soldOut: !filters.saleStatus.soldOut,
                    all: false,
                  },
                })
              }}
            />
            <Chip
              className={filters.saleStatus.notForSale ? '' : 'inactive'}
              label="비매품"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  saleStatus: {
                    ...filters.saleStatus,
                    notForSale: !filters.saleStatus.notForSale,
                    all: false,
                  },
                })
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
              max={2000000}
              step={100000}
              onChange={handlePriceRange}
              valueLabelDisplay="off"
              getAriaValueText={(value) => `${value}원`}
            />
            <div className={classes.priceBox}>
              <Typography variant="caption">{currencyFormatter(price[0])} ~</Typography>
              <Typography variant="caption"> {currencyFormatter(price[1])}</Typography>
            </div>
            <Button
              onClick={() => {
                setFilters({ ...filters, price: price })
              }}
              color="primary"
              className={classes.button}
              variant="contained"
              size="small"
            >
              적용하기
            </Button>
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
              className={filters.size.all ? '' : 'inactive'}
              label="전 체"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                const otherSizes = !filters.size.all
                  ? {
                      small: false,
                      medium: false,
                      large: false,
                    }
                  : filters.size
                setFilters({ ...filters, size: { ...otherSizes, all: !filters.size.all } })
              }}
            />
            <Chip
              className={filters.size.small ? '' : 'inactive'}
              label="50cm 이하"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  size: { ...filters.size, small: !filters.size.small, all: false },
                })
              }}
            />
            <Chip
              className={filters.size.medium ? '' : 'inactive'}
              label="50~100cm"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  size: { ...filters.size, medium: !filters.size.medium, all: false },
                })
              }}
            />
            <Chip
              className={filters.size.large ? '' : 'inactive'}
              label="100cm 초과"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  size: { ...filters.size, large: !filters.size.large, all: false },
                })
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
              className={filters.orientation.all ? '' : 'inactive'}
              label="전 체"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                const otherOrientations = !filters.orientation.all
                  ? {
                      landscape: false,
                      portrait: false,
                      square: false,
                      etc: false,
                    }
                  : filters.orientation
                setFilters({
                  ...filters,
                  orientation: { ...otherOrientations, all: !filters.orientation.all },
                })
              }}
            />
            <Chip
              className={filters.orientation.landscape ? '' : 'inactive'}
              label="가로가 긴 배치"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  orientation: {
                    ...filters.orientation,
                    landscape: !filters.orientation.landscape,
                    all: false,
                  },
                })
              }}
            />
            <Chip
              className={filters.orientation.portrait ? '' : 'inactive'}
              label="세로가 긴 배치"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  orientation: {
                    ...filters.orientation,
                    portrait: !filters.orientation.portrait,
                    all: false,
                  },
                })
              }}
            />
            <Chip
              className={filters.orientation.square ? '' : 'inactive'}
              label="정사각형"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  orientation: {
                    ...filters.orientation,
                    square: !filters.orientation.square,
                    all: false,
                  },
                })
              }}
            />
            <Chip
              className={filters.orientation.etc ? '' : 'inactive'}
              label="기 타"
              clickable
              color="primary"
              size="small"
              onClick={() => {
                setFilters({
                  ...filters,
                  orientation: {
                    ...filters.orientation,
                    etc: !filters.orientation.etc,
                    all: false,
                  },
                })
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
      </div>
    </>
  )
}

export default FilterContainer
