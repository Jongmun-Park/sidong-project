import React, { createContext, useContext, FC } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

interface CurrentUser {
  id: number | null
  username: string | null
  artist: {
    id: number
    isApproved: boolean
  } | null
}

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      artist {
        id
        isApproved
      }
    }
  }
`
const CurrentUserContext = createContext<CurrentUser>({
  id: null,
  username: null,
  artist: null,
})

export const CurrentUserProvider: FC = ({ children }) => {
  const { data, error } = useQuery(CURRENT_USER)

  if (!data) {
    return null
  }
  if (error) {
    console.error(error.message)
  }

  return (
    <CurrentUserContext.Provider value={data?.currentUser}>{children}</CurrentUserContext.Provider>
  )
}

export function useCurrentUser(): CurrentUser {
  return useContext(CurrentUserContext)
}
