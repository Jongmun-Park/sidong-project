import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { MemoizedPoster } from '../../Components/Artist/Poster'
import FilterContainer from '../../Components/Artist/FilterContainer'
import OrderFilter from '../../Components/Artist/OrderFilter'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    '@media (max-width: 823px)': {
      flexDirection: 'column',
    },
  },
  leftSideBar: {
    color: theme.palette.lightBlack.main,
    margin: '28px 0px 50px 30px',
    minWidth: '267px',
    '@media (max-width: 823px)': {
      display: 'none',
    },
    '@media (min-width: 1713px)': {
      margin: '28px 0px 50px 57px',
    },
  },
  orderFilterWrapper: {
    alignSelf: 'flex-end',
    '@media (max-width: 823px)': {
      display: 'none',
    },
  },
  posters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 823px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      margin: '10px 10px 20px 10px',
      gridGap: '10px',
    },
  },
  contentSection: {
    width: '100%',
    maxWidth: '1500px',
    margin: '25px 25px 50px 25px',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 823px)': {
      margin: '0px 0px 30px 0px',
    },
  },
  loadMoreButton: {
    fontWeight: 'bold',
  },
  pTag: {
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 500,
  },
  mobileFilterWrapper: {
    '@media (min-width: 823px)': {
      display: 'none',
    },
    padding: '10px 27px 12px 27px',
    top: '49px',
    position: 'sticky',
    zIndex: 1,
    backgroundColor: theme.palette.lightYellow.main,
    '& .mobileFilter': {
      marginTop: '10px',
      '&.inactive': {
        display: 'none',
      },
    },
  },
  mobileFilterHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  filterButton: {
    padding: '3px 18px',
    fontSize: '11px',
    alignItems: 'end',
    '& .MuiButton-startIcon': {
      marginRight: '5px',
    },
  },
}))

interface ArtistListPresenterProps {
  artists: Array<any>
  filters: any
  setFilters: (arg0: any) => void
  handleLoadMore: () => void
}

const ArtistListPresenter: FC<ArtistListPresenterProps> = ({
  artists,
  filters,
  setFilters,
  handleLoadMore,
}) => {
  const classes = useStyles()
  const [openMobileFilter, setOpenMobileFilter] = useState<boolean>(false)

  return (
    <div className={classes.container}>
      <div className={classes.leftSideBar}>
        <FilterContainer filters={filters} setFilters={setFilters} />
      </div>
      <div className={classes.mobileFilterWrapper}>
        <div className={classes.mobileFilterHeader}>
          <Button
            startIcon={<FilterListIcon />}
            className={classes.filterButton}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => setOpenMobileFilter(!openMobileFilter)}
          >
            검색 조건
          </Button>
          <OrderFilter filters={filters} setFilters={setFilters} />
        </div>
        <div className={`mobileFilter ${openMobileFilter ? '' : 'inactive'}`}>
          <FilterContainer
            filters={filters}
            setFilters={setFilters}
            setOpenMobileFilter={setOpenMobileFilter}
          />
        </div>
      </div>
      {artists ? (
        <div className={classes.contentSection}>
          <div className={classes.orderFilterWrapper}>
            <OrderFilter filters={filters} setFilters={setFilters} />
          </div>
          <div className={classes.posters}>
            {artists.map((artist) => (
              <MemoizedPoster
                key={artist.id}
                id={artist.id}
                artistName={artist.artistName}
                realName={artist.realName}
                thumbnailUrl={artist.thumbnail.url}
                representativeWorkUrl={artist.representativeWork.url}
                category={artist.category}
              />
            ))}
          </div>
          <Button className={classes.loadMoreButton} onClick={handleLoadMore}>
            더 보기
          </Button>
        </div>
      ) : (
        <div className={classes.contentSection}>
          <p className={classes.pTag}>해당 검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  )
}

export default ArtistListPresenter
