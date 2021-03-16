import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
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
  currentUserLikesThis: boolean
  artId: number
}

const LIKE_ART_MUTATION = gql`
  mutation($artId: ID!) {
    likeArt(artId: $artId) {
      success
    }
  }
`

const CANCEL_LIKE_ART_MUTATION = gql`
  mutation($artId: ID!) {
    cancelLikeArt(artId: $artId) {
      success
    }
  }
`

const Like: FC<LikeProps> = ({ currentUserLikesThis, artId }) => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const [like, setLike] = useState<boolean>(currentUserLikesThis)
  const [likeArt] = useMutation(LIKE_ART_MUTATION)
  const [cancelLikeArt] = useMutation(CANCEL_LIKE_ART_MUTATION)

  const handleLike = async () => {
    if (!currentUser) {
      alert('로그인이 필요합니다.')
      return
    }
    const { data } = await likeArt({
      variables: { artId },
    })
    if (data.likeArt.success) {
      setLike(true)
    }
  }

  const cancelLike = async () => {
    const { data } = await cancelLikeArt({
      variables: { artId },
    })
    if (data.cancelLikeArt.success) {
      setLike(false)
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
