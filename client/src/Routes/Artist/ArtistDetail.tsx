import React, { FC } from 'react'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Box, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import ArtistInfoTable from '../../Components/Artist/InfoTable'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 823px)': {
      padding: '70px 70px 100px 70px',
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '1192px',
    minHeight: '100vh',
    padding: '45px 40px 100px 40px',
    backgroundColor: 'white',
  },
  categoryTabContainer: {
    width: '100%',
    margin: '20px 0 0 20px',
  },
  categoryTab: {
    color: theme.palette.primary.main,
    borderStyle: 'none none solid none',
    borderWidth: '2px',
    maxWidth: '100px',
    minWidth: '72px',
    minHeight: '40px',
    lineHeight: '40px',
    textAlign: 'center',
    fontWeight: 500,
    letterSpacing: '0.02857em',
  },
  avatarContainer: {
    '@media (min-width: 823px)': {
      flex: '0 0 20%',
      maxWidth: '20%',
      marginTop: '11px',
    },
    width: '100%',
    minHeight: '160px',
  },
  artistInfo: {
    '@media (min-width: 823px)': {
      flex: '0 0 80%',
      maxWidth: '80%',
    },
    width: '100%',
    minHeight: '160px',
  },
  avatar: {
    margin: '0 auto 0 auto',
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
  return (
    <main className={classes.container}>
      <div className={classes.avatarContainer}>
        <Avatar alt="작가 프로필 사진" className={classes.avatar} src={artist.thumbnail.url} />
      </div>
      <div className={classes.artistInfo}>
        <ArtistInfoTable artist={artist} />
      </div>
      <div className={classes.categoryTabContainer}>
        <div className={classes.categoryTab}>작가의 말</div>
        {/* <Tabs indicatorColor="primary" textColor="primary" aria-label="작가 소개 탭" value="0">
          <Tab label="작가의 말" />
        </Tabs> */}
      </div>
      <Box p={3}>
        <Typography>{artist.description}</Typography>
      </Box>
    </main>
  )
}

export default ArtistDetail
