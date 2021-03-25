import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { useCurrentUser } from '../../Hooks/User'
import LikingArts from './LikingArts'
import LikingArtists from './LikingArtists'

const useStyles = makeStyles({
  button: {
    fontWeight: 500,
    '@media (max-width: 823px)': {
      fontSize: 'small',
    },
  },
})

const USER_LIKES_COUNT = gql`
  query UserLikesCount($userId: ID!) {
    user(id: $userId) {
      id
      likingArtsCount
      likingArtistsCount
    }
  }
`

const LikesContents: FC = () => {
  const classes = useStyles()
  const currentUser = useCurrentUser()
  const userId = currentUser.id
  const [contentType, setContentType] = useState<string>('art')

  const { data } = useQuery(USER_LIKES_COUNT, {
    variables: {
      userId,
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  return (
    <>
      <Button
        className={classes.button}
        onClick={() => {
          setContentType('art')
        }}
      >
        작품({data.user.likingArtsCount})
      </Button>
      <Button
        className={classes.button}
        onClick={() => {
          setContentType('artist')
        }}
      >
        작가({data.user.likingArtistsCount})
      </Button>
      {contentType === 'art' ? <LikingArts /> : <LikingArtists />}
    </>
  )
}

export default LikesContents
