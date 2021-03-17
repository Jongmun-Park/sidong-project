import React, { FC, useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/styles'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { useCurrentUser } from '../../Hooks/User'

const useStyles = makeStyles({
  like: {
    float: 'right',
    cursor: 'pointer',
    alignSelf: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '1.25rem',
    },
  },
})
interface LikeProps {
  artId: number
}

const CURRENT_USER_LIKES_THIS_ART = gql`
  query CurrentUserLikesThisArt($artId: ID!) {
    art(artId: $artId) {
      id
      currentUserLikesThis
    }
  }
`

const LIKE_ART_MUTATION = gql`
  mutation LikeArt($artId: ID!) {
    likeArt(artId: $artId) {
      success
    }
  }
`

const CANCEL_LIKE_ART_MUTATION = gql`
  mutation CancelLikeArt($artId: ID!) {
    cancelLikeArt(artId: $artId) {
      success
    }
  }
`

const Like: FC<LikeProps> = ({ artId }) => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [likeArt] = useMutation(LIKE_ART_MUTATION)
  const [cancelLikeArt] = useMutation(CANCEL_LIKE_ART_MUTATION)
  const { data, refetch } = useQuery(CURRENT_USER_LIKES_THIS_ART, {
    variables: { artId },
    onError: (error) => console.error(error.message),
  })
  const [like, setLike] = useState<boolean>(false)

  useEffect(() => {
    if (data) {
      setLike(data.art.currentUserLikesThis)
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
    const { data } = await likeArt({
      variables: { artId },
    })
    if (data.likeArt.success) {
      refetch()
    }
  }

  const cancelLike = async () => {
    const { data } = await cancelLikeArt({
      variables: { artId },
    })
    if (data.cancelLikeArt.success) {
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
