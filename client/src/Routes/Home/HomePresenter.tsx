import React from 'react'
import Poster from '../../Components/Poster'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: {
    marginLeft: '15px',
  },
  wrapper: {
    margin: '50px 30px 50px 30px',
    display: 'grid',
    gridAutoRows: '400px',
    gridTemplateColumns: 'repeat(auto-fit, 300px)',
    gridGap: '50px',
    justifyContent: 'center',
    // backgroundColor: '#25282c'
    // gridAutoRows: 'minmax(100px, auto)',
    // justifyItems: 'center',
    // alignItems: 'center',
  },
  // one: {
  //   gridColumn: '1 / 3',
  //   gridRow: '1',
  // },
  // two: {
  //   gridColumn: '2 / 4',
  //   gridRow: '1 / 3',
  // },
  // three: {
  //   gridColumn: '1',
  //   gridRow: '2 / 5',
  // },
  // four: {
  //   gridColumn: 3,
  //   gridRow: 3,
  // },
  // five: {
  //   gridColumn: 2,
  //   gridRow: 4,
  // },
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
