import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Button, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import ArtistInfoTable from '../../Components/Artist/InfoTable'
import { MemoizedPoster } from '../../Components/Art/Poster'

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
    '@media (min-width: 823px)': {
      margin: '20px 0 0 20px',
    },
    width: '100%',
    marginTop: '20px',
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
  description: {
    '@media (min-width: 823px)': {
      padding: '24px',
    },
    width: '100%',
    wordBreak: 'break-word',
    padding: '15px 10px 15px 10px',
  },
  posters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 823px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      gridGap: '15px',
    },
  },
  artSection: {
    width: '100%',
    margin: '50px 0px 50px 0px',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 823px)': {
      margin: '25px 0px 25px 0px',
    },
  },
  loadMoreButton: {
    fontWeight: 'bold',
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
      category
      residence
      website
    }
  }
`

const ARTS_BY_ARTIST = gql`
  query($artistId: ID!, $lastArtId: ID) {
    artsByArtist(artistId: $artistId, lastArtId: $lastArtId) {
      id
      name
      saleStatus
      price
      width
      height
      representativeImageUrl
    }
  }
`

const ArtistDetail: FC = () => {
  const classes = useStyles()
  const { artistID } = useParams<ArtistDetailParams>()
  const [arts, setArts] = useState<Array<any>>([])
  const { data } = useQuery(ARTIST, {
    variables: {
      artistId: artistID,
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  useQuery(ARTS_BY_ARTIST, {
    variables: {
      artistId: artistID,
    },
    onCompleted: (data) => {
      const { artsByArtist } = data
      setArts(artsByArtist)
      // setLastArtId(arts[arts.length - 1].id)
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  if (!data) {
    return null
  }
  const { artist } = data

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
      </div>
      <Typography className={classes.description}>{artist.description}</Typography>
      <div className={classes.artSection}>
        <div className={classes.posters}>
          {arts?.map((art) => (
            <MemoizedPoster
              key={art.id}
              id={art.id}
              name={art.name}
              width={art.width}
              height={art.height}
              artistName={artist.artistName}
              saleStatus={art.saleStatus}
              price={art.price}
              representativeImageUrl={art.representativeImageUrl}
            />
          ))}
        </div>
        <Button className={classes.loadMoreButton}>더 보기</Button>
      </div>
    </main>
  )
}

export default ArtistDetail
