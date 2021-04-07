import React, { FC } from 'react'
import gql from 'graphql-tag'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '100vh',
    maxWidth: '550px',
    padding: '30px 60px 100px 60px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    '@media (max-width: 823px)': {
      padding: '20px 23px 100px 23px',
    },
  },
  h3: {
    '@media (max-width: 823px)': {
      fontSize: '14px',
    },
  },
  wrapper: {
    maxWidth: '400px',
    margin: 'auto',
  },
  artInfo: {
    marginTop: '45px',
    '@media (max-width: 823px)': {
      marginTop: '30px',
    },
  },
  figure: {
    margin: 0,
  },
  representativeImageWrapper: {
    display: 'inline-block',
    width: '49%',
    verticalAlign: 'top',
  },
  image: {
    width: '80%',
    height: 'auto',
    boxShadow: '4px 4px 10px 0 rgb(0 0 0 / 30%)',
  },
  figcaption: {
    display: 'inline-block',
    width: '49%',
  },
  artName: {
    fontSize: '16px',
    fontWeight: 500,
    margin: '3px 0 5px 0',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 823px)': {
      fontSize: '13px',
      margin: '0 0 5px 0',
    },
  },
  pTag: {
    margin: '3px 0',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 823px)': {
      fontSize: '11px',
    },
  },
}))

const ART_FOR_ORDER = gql`
  query ArtForOrder($artId: ID!) {
    art(artId: $artId) {
      id
      artist {
        id
        artistName
        realName
      }
      name
      price
      width
      height
      representativeImageUrl
    }
  }
`

const OrderArt: FC = () => {
  const classes = useStyles()
  const { artId } = useParams<{ artId: string }>()
  const { data } = useQuery(ART_FOR_ORDER, {
    variables: { artId },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const { art } = data

  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        <h3 className={classes.h3}>&ensp;작품 구매</h3>
        <div className={classes.artInfo}>
          <figure className={classes.figure}>
            <div className={classes.representativeImageWrapper}>
              <img alt="작품 이미지" className={classes.image} src={art.representativeImageUrl} />
            </div>
            <figcaption className={classes.figcaption}>
              <p className={classes.artName}>
                <a href={`/art/${art.id}`}>{art.name}</a>
              </p>
              <p className={classes.pTag}>
                {art.artist.realName}({art.artist.artistName})
              </p>
              <p className={classes.pTag}>
                {art.width}x{art.height}cm
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  )
}

export default OrderArt
