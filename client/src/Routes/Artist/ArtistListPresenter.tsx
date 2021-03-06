import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { MemoizedPoster } from '../../Components/Artist/Poster'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
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
      margin: '20px 10px 20px 10px',
      gridGap: '10px',
    },
  },
  contentSection: {
    width: '100%',
    margin: '39px 25px 50px 25px',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 823px)': {
      margin: '10px 0px 10px 0px',
    },
  },
  loadMoreButton: {
    fontWeight: 'bold',
  },
}))

interface ArtistListPresenterProps {
  artists: Array<any>
  handleLoadMore: () => void
}

const ArtistListPresenter: FC<ArtistListPresenterProps> = ({ artists, handleLoadMore }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.leftSideBar}>
        <br></br>
        <b>left side bar</b>
        <br></br>- Search box<br></br>- Filter
      </div>
      <div className={classes.contentSection}>
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
    </div>
  )
}

export default ArtistListPresenter
