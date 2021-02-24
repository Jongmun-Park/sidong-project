import React, { FC } from 'react'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar } from '@material-ui/core/'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { translateResidence, translateArtistCategory } from '../../utils'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 1024px)': {
      padding: '70px 70px 100px 70px',
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '1192px',
    minHeight: '100vh',
    padding: '45px 40px 100px 40px',
    backgroundColor: 'white',
  },
  tabs: {
    width: '100%',
    marginTop: '17px',
  },
  tabPanel: {
    width: '100%',
    marginTop: '6px',
  },
  avatarContainer: {
    width: '100%',
  },
  avatar: {
    margin: '0 40px 0 40px',
    width: theme.spacing(17),
    height: theme.spacing(17),
    '@media (max-width: 823px)': {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin: '0 auto 0 auto',
    },
  },
}))
interface ArtistDetailParams {
  artistID: string
}

const ARTIST = gql`
  query($artistId: ID!) {
    artist(artistId: $artistId) {
      id
      realName
      artistName
      description
      thumbnail {
        id
        url
      }
      representativeWork {
        id
        url
      }
      category
      residence
      website
    }
  }
`

const ArtistDetail: FC = () => {
  const classes = useStyles()
  const { artistID } = useParams<ArtistDetailParams>()
  const { data } = useQuery(ARTIST, {
    variables: {
      artistId: artistID,
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  if (!data) {
    return null
  }
  const { artist } = data
  console.log('artist:', artist)
  console.log(translateResidence(artist.residence))
  console.log(translateArtistCategory(artist.category))
  return (
    <main className={classes.container}>
      <div className={classes.avatarContainer}>
        <Avatar alt="작가 프로필 사진" className={classes.avatar} src={artist.thumbnail.url} />
      </div>
    </main>
  )
}

export default ArtistDetail
