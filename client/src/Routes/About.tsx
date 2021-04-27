import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  centerArea: {
    height: '100vh',
    maxWidth: '1213px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
    paddingTop: '50px',
  },
  firstSection: {
    paddingTop: '35px',
    margin: '0px 100px 0px 100px',
    '@media (max-width: 823px)': {
      paddingTop: '16px',
      margin: '0px 45px 0px 45px',
    },
  },
  section: {
    margin: '60px 100px 0px 100px',
    '@media (max-width: 823px)': {
      margin: '50px 45px 0px 45px',
    },
  },
  h2: {
    '@media (max-width: 823px)': {
      fontSize: '1.4em',
    },
  },
})

const About: FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.centerArea}>
      <section className={classes.firstSection}>
        <h2 className={classes.h2}>우리 모두 작가가 될 수 있습니다.</h2>
        <p>작업터는 작가의 이력이나 학력을 묻지 않습니다.</p>
        <p>창작은 그 자체 만으로 가치가 있습니다.</p>
        <p>
          창작하는 모든 작가들에게 전시 공간이자 판매 경로가 되어 그들의 창작 환경이 개선되길
          바랍니다.
        </p>
        <p>
          <span style={{ backgroundColor: 'antiquewhite' }}>
            회원 가입 후, 작가 등록을 해보세요.
          </span>
        </p>
      </section>
      <section className={classes.section}>
        <h2 className={classes.h2}>다양한 작가의 개성 있는 작품이 모인 공간을 지향합니다.</h2>
        <p>
          이를 위해 모작 또는 대량 생산된 프린팅 제품이 아닌&nbsp;
          <span style={{ backgroundColor: 'antiquewhite' }}>
            작가가 직접 만든 작품만 등록해주시길 바랍니다.
          </span>
        </p>
        <p>작업터는 IT 기술이 예술 시장에 투명성과 형평성을 가져올 것이라 믿습니다.</p>
        <p>
          작가들의 목소리에 귀 기울여 작가와 대중 모두를 만족시킬 수 있는 서비스로 발전하겠습니다.
        </p>
        <p>
          불편 사항은 <u style={{ backgroundColor: 'lavender' }}>jakupteo@gmail.com</u>로 남겨주시면
          검토하여 반영하겠습니다.
        </p>
        이용해주셔서 감사합니다.
      </section>
    </main>
  )
}

export default About
