import React from 'react'
import Poster from '../../Components/Poster'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 6.5fr',
  },
  leftSideBar: {
    justifySelf: 'center',
  },
  contents: {
    margin: '50px 30px 50px 30px',
    display: 'grid',
    // mobile limit 680px ... minmax(148px, )
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
        <b>left side bar</b><br></br>
        - Search box<br></br>
        - Filter
      </div>
      <div className={classes.contents}>
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
    </div>
  )
}

export default HomePresenter
