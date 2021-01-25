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
    gridTemplateColumns: 'repeat(auto-fit, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    '@media (max-width: 823px)': {
      gridTemplateColumns: 'repeat(auto-fit, minmax(157px, auto))',
      margin: '20px 10px 20px 10px',
      gridGap: '10px',
    },
  },
})

interface HomeProps {
  artworks: Array<any>
}

const ArtistPresenter: React.FC<HomeProps> = ({ artworks }) => {
  const classes = useStyles({})
  return (
    <div className={classes.container}>
      <div className={classes.leftSideBar}>
        <br></br>
        <b>left side bar</b>
        <br></br>- Search box<br></br>- Filter
      </div>
      <div className={classes.contents}>
        {artworks &&
          artworks
            .concat(artworks)
            .map((artwork) => (
              <Poster
                key={artwork.id}
                title={artwork.title}
                category={artwork.category}
                medium={artwork.medium}
                imageUrl={artwork._links.thumbnail.href}
                saleMessage={artwork.sale_message}
                date={artwork.date}
              />
            ))}
      </div>
    </div>
  )
}

export default ArtistPresenter
