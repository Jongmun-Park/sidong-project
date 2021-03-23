import React, { FC, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    fontWeight: 500,
    '@media (max-width: 823px)': {
      fontSize: 'small',
    },
  },
}))

interface LikesContentsProps {
  email: String | null
}

const USER_LIKING_CONTENTS = gql`
  query UserLikingContents($email: String!) {
    userLikingContents(email: $email) {
      likingArtsCount
      likingArtistsCount
    }
  }
`

const LikesContents: FC<LikesContentsProps> = ({ email }) => {
  const classes = useStyles()
  const { data } = useQuery(USER_LIKING_CONTENTS, {
    variables: {
      email,
    },
    onError: (error) => {
      console.error(error.message)
    },
  })

  if (!data) {
    return null
  }

  return (
    <>
      <Button className={classes.button}>작품({data.userLikingContents.likingArtsCount})</Button>
      <Button className={classes.button}>작가({data.userLikingContents.likingArtistsCount})</Button>
    </>
  )
}

export default LikesContents
