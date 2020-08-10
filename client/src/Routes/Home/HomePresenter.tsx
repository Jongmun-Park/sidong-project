import React from 'react'
import Poster from '../../Components/Poster'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: {
    marginLeft: '15px',
  },
})

interface HomeProps {
  artworks: Array<any>
}

const HomePresenter: React.FC<HomeProps> = ({ artworks }) => {
  const classes = useStyles({})
  return (
    <Grid className={classes.root} container spacing={2}>
      {artworks &&
        artworks.map((artwork) => (
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
    </Grid>
  )
}

export default HomePresenter
