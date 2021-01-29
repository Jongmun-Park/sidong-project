import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Poster from '../../Components/Artist/Poster'

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  leftSideBar: {
    justifySelf: 'center',
    minWidth: '253px',
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
      margin: '20px 10px 20px 10px',
      gridGap: '10px',
    },
  },
  contentSection: {
    width: '100%',
    margin: '50px 0px 50px 0px',
    display: 'flex',
    flexDirection: 'column',
  },
})

interface ArtistPresenterProps {
  artists: Array<any>
}

const ArtistPresenter: React.FC<ArtistPresenterProps> = ({ artists }) => {
  const classes = useStyles({})

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
            <Poster
              key={artist.id}
              artistName={artist.artistName}
              realName={artist.realName}
              thumbnailUrl={artist.thumbnail.url}
              representativeWorkUrl={artist.representativeWork.url}
              category={artist.category}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArtistPresenter
