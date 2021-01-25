import React from 'react'
import Poster from '../../Components/Poster'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  leftSideBar: {
    '@media (max-width: 721px)': {
      display: 'none',
    },
    justifySelf: 'center',
    width: '20%',
  },
  contents: {
    '@media (max-width: 721px)': {
      width: '100%',
      gridTemplateColumns: 'repeat(auto-fit, minmax(157px, auto))',
      margin: '50px 20px 50px 20px',
    },
    width: '80%',
    margin: '50px 30px 50px 30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
  },
})

interface HomeProps {
  artworks: Array<any>
}

const HomePresenter: React.FC<HomeProps> = ({ artworks }) => {
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

export default HomePresenter
