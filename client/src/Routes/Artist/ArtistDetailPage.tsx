import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { Avatar, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import ArtistInfoTable from '../../Components/Artist/InfoTable'
import Like from '../../Components/Artist/Like'
import { MemoizedPoster } from '../../Components/Art/Poster'
import LoadMoreButton from '../../Components/LoadMoreButton'

const useStyles = makeStyles((theme) => ({
  container: {
    '@media (min-width: 835px)': {
      padding: '120px 70px 100px 70px',
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    maxWidth: '1213px',
    minHeight: '100vh',
    padding: '85px 24px 100px 24px',
    backgroundColor: 'white',
  },
  categoryTabContainer: {
    '@media (min-width: 835px)': {
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
    '@media (max-width: 834px)': {
      fontSize: '12px',
      maxWidth: '72px',
      minHeight: '33px',
      lineHeight: '33px',
      marginLeft: '10px',
    },
  },
  avatarContainer: {
    '@media (min-width: 835px)': {
      flex: '0 0 20%',
      maxWidth: '20%',
    },
    width: '90%',
    margin: 'auto',
    minHeight: '140px',
  },
  artistInfo: {
    '@media (min-width: 835px)': {
      flex: '0 0 80%',
      maxWidth: '80%',
    },
    width: '90%',
    margin: 'auto',
    minHeight: '140px',
    '@media (max-width: 834px)': {
      fontSize: '12px',
    },
  },
  avatar: {
    margin: '0 auto 0 auto',
    width: theme.spacing(17),
    height: theme.spacing(17),
    '@media (max-width: 834px)': {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin: '0 auto 0 auto',
    },
  },
  description: {
    '@media (min-width: 835px)': {
      padding: '24px',
    },
    width: '100%',
    whiteSpace: 'pre-line',
    padding: '15px 10px 15px 10px',
    '@media (max-width: 834px)': {
      fontSize: '14px',
    },
  },
  posters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 252px)',
    gridGap: '18px',
    justifyContent: 'center',
    marginBottom: '32px',
    '@media (max-width: 834px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(157px, auto))',
      gridGap: '12px',
    },
  },
  artSection: {
    width: '100%',
    margin: '50px 0px 50px 0px',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 834px)': {
      margin: '25px 0px 25px 0px',
    },
  },
  pTag: {
    width: '100%',
    textAlign: 'center',
    marginTop: '63px',
  },
  like: {
    float: 'right',
    cursor: 'pointer',
    color: theme.palette.lightBlack.main,
    '& .MuiSvgIcon-root': {
      fontSize: '19px',
      '@media (max-width: 834px)': {
        fontSize: '1.1rem',
      },
    },
  },
}))

const ARTIST = gql`
  query Artist($artistId: ID!) {
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
  query ArtsByArtist($artistId: ID!, $lastArtId: ID) {
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

const ArtistDetailPage: FC = () => {
  const classes = useStyles()
  const { artistId } = useParams<{ artistId: string }>()
  const [arts, setArts] = useState<Array<any>>([])
  const [noMoreArts, setNoMoreArts] = useState<boolean>(false)
  const [lastArtId, setLastArtId] = useState<string>('')

  const { data } = useQuery(ARTIST, {
    variables: {
      artistId: artistId,
    },
    onError: (error) => console.error(error.message),
  })

  useQuery(ARTS_BY_ARTIST, {
    variables: {
      artistId: artistId,
    },
    onCompleted: (data) => {
      const { artsByArtist } = data
      setArts(artsByArtist)
      if (artsByArtist) {
        setLastArtId(artsByArtist[artsByArtist.length - 1].id)
      }
    },
    onError: (error) => console.error(error.message),
  })

  const [loadMoreArts] = useLazyQuery(ARTS_BY_ARTIST, {
    onCompleted: (data) => {
      const fetchedArts = data.artsByArtist
      if (fetchedArts.length === 0) {
        alert('더 불러올 작품이 없습니다.')
        setNoMoreArts(true)
      } else {
        setArts([...arts, ...fetchedArts])
        setLastArtId(fetchedArts[fetchedArts.length - 1].id)
      }
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const { artist } = data
  const handleLoadMore = () => {
    if (noMoreArts) {
      alert('더 불러올 작품이 없습니다.')
      return
    }
    loadMoreArts({
      variables: {
        artistId: artistId,
        lastArtId: lastArtId,
      },
    })
  }

  return (
    <main className={classes.container}>
      <div className={classes.avatarContainer}>
        <Avatar alt="작가 프로필 사진" className={classes.avatar} src={artist.thumbnail.url} />
        <span className={classes.like}>
          <Like artistId={artist.id} />
        </span>
      </div>
      <div className={classes.artistInfo}>
        <ArtistInfoTable artist={artist} />
      </div>
      <div className={classes.categoryTabContainer}>
        <div className={classes.categoryTab}>작가의 말</div>
      </div>
      <Typography className={classes.description}>{artist.description}</Typography>
      {arts ? (
        <div className={classes.artSection}>
          <div className={classes.posters}>
            {arts.map((art) => (
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
          {arts.length >= 20 && <LoadMoreButton onClick={handleLoadMore} />}
        </div>
      ) : (
        <p className={classes.pTag}>아직 등록된 작품이 없습니다.</p>
      )}
    </main>
  )
}

export default ArtistDetailPage
