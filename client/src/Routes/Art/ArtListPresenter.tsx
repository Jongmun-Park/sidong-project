import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
import { MemoizedPoster } from '../../Components/Art/Poster'
import FilterContainer from '../../Components/Art/FilterContainer'

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
    margin: '39px 25px 50px 25px',
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
  mobileFilterController: {
    '@media (min-width: 823px)': {
      display: 'none',
    },
    padding: '10px 27px 10px 27px',
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
  filterButton: {
    padding: '3px 18px',
    fontSize: '11px',
    alignItems: 'end',
    '& .MuiButton-startIcon': {
      marginRight: '5px',
    },
  },
}))

interface ArtListPresenterProps {
  arts: Array<any>
  setFilters: (arg0: any) => void
  handleLoadMore: () => void
}

const ArtListPresenter: FC<ArtListPresenterProps> = ({ arts, setFilters, handleLoadMore }) => {
  const classes = useStyles()
  const [openMobileFilter, setOpenMobileFilter] = useState<boolean>(false)

  return (
    <div className={classes.container}>
      <div className={classes.leftSideBar}>
        <FilterContainer setFilters={setFilters} />
      </div>
      <div className={classes.mobileFilterController}>
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
        <div className={`mobileFilter ${openMobileFilter ? '' : 'inactive'}`}>
          <FilterContainer setFilters={setFilters} setOpenMobileFilter={setOpenMobileFilter} />
        </div>
      </div>
      {arts ? (
        <div className={classes.contentSection}>
          <div className={classes.posters}>
            {arts.map((art) => (
              <MemoizedPoster
                key={art.id}
                id={art.id}
                artistId={art.artist.id}
                name={art.name}
                width={art.width}
                height={art.height}
                artistName={art.artist.artistName}
                saleStatus={art.saleStatus}
                price={art.price}
                representativeImageUrl={art.representativeImageUrl}
                currentUserLikesThis={art.currentUserLikesThis}
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

export default ArtListPresenter
