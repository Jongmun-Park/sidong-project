import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    minHeight: '73px',
    backgroundColor: 'white',
    padding: '20px',
  },
  content: {
    margin: 'auto',
    '@media (max-width: 834px)': {
      fontSize: '11px',
    },
  },
}))

const Footer: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.footer}>
      <div className={classes.content}>
        <span>상호: 작업터 |&ensp;</span>
        <span>대표: 박종문 |&ensp;</span>
        <span>개인정보관리책임자: 박종문 |&ensp;</span>
        {/* <span>전화: 010-2725-1365 |&ensp;</span> */}
        <span>이메일: jakupteo@gmail.com |&ensp;</span>
        <span>사업자등록번호: 693-62-00440 |&ensp;</span>
        <span>
          <a href="/service-policy.html">서비스 이용약관</a> |&ensp;
        </span>
        <span>
          <a href="/privacy-policy.html">개인정보 취급방침</a>
        </span>
      </div>
    </div>
  )
}

export default Footer
