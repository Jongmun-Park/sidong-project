import React, { FC } from 'react'
import { Button, List, ListItem, ListItemText, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArtistCategory, Residence } from '../../types'

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
      overflowY: 'auto',
      width: '95%',
      margin: 'auto',
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
    '@media (max-width: 834px)': {
      flexDirection: 'row',
      margin: '0px auto 7px auto',
      maxWidth: '530px',
      paddingBottom: '11px',
    },
  },
  select: {
    minWidth: '115px',
    alignSelf: 'flex-end',
    fontSize: '13px',
    marginRight: '16px',
    '@media (max-width: 834px)': {
      minWidth: '94px',
      fontSize: '11px',
    },
  },
  buttonWrapper: {
    float: 'right',
    margin: '11px 5px 0px 0px',
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

  return (
    <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
      <div className={classes.listBox}>
        <ListItem>
          <ListItemText primary="분 야" />
        </ListItem>
        <Select
          className={classes.select}
          value={filters.category}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setFilters({ ...filters, category: e.target.value as string })
          }}
        >
          <MenuItem value={'all'}>전 체</MenuItem>
          <MenuItem value={ArtistCategory.PAINTER}>화가</MenuItem>
          <MenuItem value={ArtistCategory.SCULPTOR}>조각가</MenuItem>
          <MenuItem value={ArtistCategory.CRAFTSMAN}>공예가</MenuItem>
          <MenuItem value={ArtistCategory.ETC}>기타</MenuItem>
        </Select>
      </div>
      <div className={classes.listBox}>
        <ListItem>
          <ListItemText primary="지 역" />
        </ListItem>
        <Select
          className={classes.select}
          value={filters.residence}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setFilters({ ...filters, residence: e.target.value as string })
          }}
        >
          <MenuItem value={'all'}>전 체</MenuItem>
          <MenuItem value={Residence.SEOUL}>서울특별시</MenuItem>
          <MenuItem value={Residence.PUSAN}>부산광역시</MenuItem>
          <MenuItem value={Residence.DAEGU}>대구광역시</MenuItem>
          <MenuItem value={Residence.INCHEON}>인천광역시</MenuItem>
          <MenuItem value={Residence.GWANGJU}>광주광역시</MenuItem>
          <MenuItem value={Residence.DAEJEON}>대전광역시</MenuItem>
          <MenuItem value={Residence.ULSAN}>울산광역시</MenuItem>
          <MenuItem value={Residence.SEJONG}>세종특별자치시</MenuItem>
          <MenuItem value={Residence.GYEONGGI}>경기도</MenuItem>
          <MenuItem value={Residence.GANGWON}>강원도</MenuItem>
          <MenuItem value={Residence.CHUNGBUK}>충청북도</MenuItem>
          <MenuItem value={Residence.CHUNGNAM}>충청남도</MenuItem>
          <MenuItem value={Residence.JEONBUK}>전라북도</MenuItem>
          <MenuItem value={Residence.JEONNAM}>전라남도</MenuItem>
          <MenuItem value={Residence.GYEONGBUK}>경상북도</MenuItem>
          <MenuItem value={Residence.GYEONGNAM}>경상남도</MenuItem>
          <MenuItem value={Residence.JEJU}>제주특별자치도</MenuItem>
        </Select>
      </div>
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
    </List>
  )
}

export default FilterContainer
