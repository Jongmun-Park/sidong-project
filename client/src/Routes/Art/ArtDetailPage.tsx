import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import ArtDetail from '../../Components/Art/ArtDetail'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  artDetailPage: {
    '@media (min-width: 1024px)': {
      margin: '0 auto 0 auto',
    },
    paddingTop: '55px',
    maxWidth: '1213px',
    minHeight: '100vh',
    backgroundColor: 'white',
    '@media (max-width: 823px)': {
      paddingTop: '31px',
    },
  },
})

interface ArtDetailPageParams {
  artId: string
}

const ArtDetailPage: FC = () => {
  const classes = useStyles()
  const { artId } = useParams<ArtDetailPageParams>()

  return (
    <div className={classes.artDetailPage}>
      <ArtDetail artId={Number(artId)} />
    </div>
  )
}

export default ArtDetailPage
