import React from 'react'
import Poster from '../../Components/Poster'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    marginLeft: '15px',
  },
  wrapper: {
    margin: '50px 30px 50px 30px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, 300px)',
    gridGap: '31px',
    justifyContent: 'center',
  },
})

interface HomeProps {
  artworks: Array<any>
}

const HomePresenter: React.FC<HomeProps> = ({ artworks }) => {
  const classes = useStyles({})
  return (
    <div className={classes.wrapper}>
      {artworks &&
        artworks.concat(artworks).map((artwork) => (
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
    // <Grid className={classes.root} container spacing={2}>
    // </Grid>
  )
}

export default HomePresenter
