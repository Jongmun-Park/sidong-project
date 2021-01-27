import React from 'react'
import Poster from '../../Components/Artist/Poster'
import { makeStyles } from '@material-ui/core/styles'

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
  contents: {
    width: '100%',
    margin: '50px 0px 50px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    '@media (max-width: 823px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      margin: '20px 10px 20px 10px',
      gridGap: '10px',
    },
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
      <div className={classes.contents}>
        {artists &&
          artists.map((artist) => (
            <Poster
              artistName={artist.artistName}
              realName={artist.realName}
              thumbnailUrl={artist.thumbnail.url}
              representativeWorkUrl={artist.representativeWork.url}
              category={artist.category}
            />
          ))}
      </div>
    </div>
  )
}

export default ArtistPresenter
