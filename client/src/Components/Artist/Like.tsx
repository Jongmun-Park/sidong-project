import React, { FC, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useCurrentUser } from '../../Hooks/User'

const useStyles = makeStyles((theme) => ({
  like: {
    cursor: 'pointer',
    color: theme.palette.lightBlack.main,
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
    },
  },
}))

interface LikeProps {
  artistId: number
}

const CURRENT_USER_LIKES_THIS_ARTIST = gql`
  query CurrentUserLikesThisArtist($artistId: ID!) {
    artist(artistId: $artistId) {
      id
      currentUserLikesThisArtist
    }
  }
`

const LIKE_ARTIST_MUTATION = gql`
  mutation LikeArtist($artistId: ID!) {
    likeArtist(artistId: $artistId) {
      success
    }
  }
`

const CANCEL_LIKE_ARTIST_MUTATION = gql`
  mutation CancelLikeArtist($artistId: ID!) {
    cancelLikeArtist(artistId: $artistId) {
      success
    }
  }
`

const Like: FC<LikeProps> = ({ artistId }) => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [likeArtist] = useMutation(LIKE_ARTIST_MUTATION)
  const [cancelLikeArtist] = useMutation(CANCEL_LIKE_ARTIST_MUTATION)
  const { data, refetch } = useQuery(CURRENT_USER_LIKES_THIS_ARTIST, {
    variables: { artistId },
    onError: (error) => console.error(error.message),
  })
  const [like, setLike] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      setLike(data.artist.currentUserLikesThisArtist)
    }
  }, [data])

  if (!data) {
    return null
  }

  const handleLike = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.')
      return
    }
    const { data } = await likeArtist({
      variables: { artistId },
    })
    if (data.likeArtist.success) {
      refetch()
    }
  }

  const cancelLike = async () => {
    const { data } = await cancelLikeArtist({
      variables: { artistId },
    })
    if (data.cancelLikeArtist.success) {
      refetch()
    }
  }

  return (
    <span className={classes.like}>
      {like ? (
        <span onClick={cancelLike}>
          <FavoriteIcon />
        </span>
      ) : (
        <span onClick={handleLike}>
          <FavoriteBorderIcon />
        </span>
      )}
    </span>
  )
}

export default Like
