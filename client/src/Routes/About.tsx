import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import aboutImage from '../about-image.jpg'

const useStyles = makeStyles({
  centerArea: {
    minHeight: '100vh',
    maxWidth: '1440px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    paddingTop: '56px',
    '@media (max-width: 834px)': {
      paddingTop: '50px',
    },
    '@media (min-width: 835px)': {
      '& p': {
        fontSize: '15px',
      },
    },
  },
  firstSection: {
    padding: '45px 10% 0px 13%',
    '@media (max-width: 834px)': {
      padding: '25px 45px 0px 45px',
    },
  },
  section: {
    padding: '20px 10% 70px 13%',
    '@media (max-width: 834px)': {
      padding: '10px 45px 45px 45px',
    },
  },
  h2: {
    '@media (max-width: 834px)': {
      fontSize: '18px',
    },
  },
  image: {
    width: '100%',
    maxHeight: '316px',
    objectFit: 'cover',
  },
})

const About: FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.centerArea}>
      <img className={classes.image} src={aboutImage} alt="서비스 소개 이미지" />
      <section className={classes.firstSection}>
        <h2 className={classes.h2}>
          <span style={{ color: '#6c1714', letterSpacing: '1px' }}>작업터</span>는 신진, 무명 작가를
          위한 아트 플랫폼입니다.
        </h2>
        <p>작가의 이력이나 학력을 묻지 않습니다.</p>
        <p>작가의 배경 보단 작품과 그에 담긴 이야기에 집중합니다.</p>
        <p>
          창작하는 모든 작가들에게 전시 공간이자 판매 경로가 되어 그들의 창작 환경이 개선되길
          바랍니다.
        </p>
      </section>
      <section className={classes.section}>
        <h2 className={classes.h2}>작가가 직접 만든 작품만 취급합니다.</h2>
        <p>모작 또는 대량 생산된 프린팅 제품은 취급하지 않습니다.</p>
        <p>작업터는 IT 기술이 예술 시장에 투명성과 형평성을 가져올 것이라 믿습니다.</p>
        <p>
          작가들의 목소리에 귀 기울여 작가와 대중 모두를 만족시킬 수 있는 서비스로 발전하겠습니다.
        </p>
        <p>
          불편 사항은 <u>jakupteo@gmail.com</u>로 남겨주시면 검토하여 반영하겠습니다.
        </p>
        저희 서비스를 이용해주셔서 감사합니다.
      </section>
    </main>
  )
}

export default About
