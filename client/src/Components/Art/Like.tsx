import React, { FC } from 'react'
import { useCurrentUser } from '../../Hooks/User'

const Like: FC = () => {
  const currentUser = useCurrentUser()
  return <div>Like</div>
}

export default Like
