import React, { FC, useState } from 'react'
import { Button, List, ListItem, ListItemText, MenuItem, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ArtistCategory, Residence } from '../../types'

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    height: '200px',
    '& .MuiTypography-body1': {
      fontSize: '13px',
      fontWeight: 600,
    },
    '@media (max-width: 823px)': {
      overflowY: 'auto',
    },
  },
  select: {
    float: 'right',
    width: '165px',
    margin: '0 20px 5px 0',
    fontSize: '13px',
  },
  buttonWrapper: {
    margin: '0 22px 5px 0',
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
  const [category, setCategory] = useState<ArtistCategory | string>('all')
  const [residence, setResidence] = useState<Residence | string>('all')

  const handleApply = () => {
    setFilters({
      ...filters,
      category,
      residence,
    })
    if (setOpenMobileFilter) {
      setOpenMobileFilter(false)
    }
  }

  return (
    <div>
      <List component="nav" aria-label="검색 조건 목록" className={classes.list}>
        <ListItem>
          <ListItemText primary="분야" />
        </ListItem>
        <Select
          className={classes.select}
          value={category}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setCategory(e.target.value as string)
          }}
        >
          <MenuItem value={'all'}>전 체</MenuItem>
          <MenuItem value={ArtistCategory.PAINTER}>화가</MenuItem>
          <MenuItem value={ArtistCategory.SCULPTOR}>조각가</MenuItem>
          <MenuItem value={ArtistCategory.CRAFTSMAN}>공예가</MenuItem>
          <MenuItem value={ArtistCategory.ETC}>기타</MenuItem>
        </Select>
        <ListItem>
          <ListItemText primary="지역" />
        </ListItem>
        <Select
          className={classes.select}
          value={residence}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setResidence(e.target.value as string)
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
