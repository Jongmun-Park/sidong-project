import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    textAlign: 'center',
    padding: '40px',
  },
}))

const Footer: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <span>| 상호: 작업터 |</span>
      <span> 대표: 박종문 |</span>
      <span> 개인정보관리책임자: 박종문 |</span>
      <span> 전화: 010-2725-1365 |</span>
      <span> 이메일: jakupteo@gmail.com |</span>
      <span> 사업자등록번호: 693-62-00440 |</span>
    </div>
  )
}

export default Footer
