import React, { FunctionComponent } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  centerArea: {
    height: '100vh',
    maxWidth: '1100px',
    margin: '0px auto 0px auto',
    backgroundColor: 'white',
  },
  firstSection: {
    paddingTop: '32px',
    // TODO: 모바일 스타일 적용
    margin: '0px 80px 0px 80px',
  },
  section: {
    // TODO: 모바일 스타일 적용
    margin: '50px 80px 0px 80px',
  },
}))

const About: FunctionComponent = () => {
  const classes = useStyles({})

  return (
    <div className={classes.centerArea}>
      <section className={classes.firstSection}>
        <h2>우리 모두 작가가 될 수 있습니다.</h2>
        <p>
          작업실은 작가의 이력이나 학력을 묻지 않습니다.<br></br>
          누군가에게 어떤 영감이나 감정을 일으키는 작품이라면 그 자체 만으로 가치가 있다는 생각에서
          출발했습니다.
        </p>
        <p>
          세상엔 살아 생전에 빛을 보지 못하고, 고난과 역경의 삶을 살다간 작가도 많습니다.<br></br>
          작업실은 개인 작업을 하는 모든 작가들에게 전시 공간이자 판매 경로가 되어 그들의 창작
          환경이 개선되길 바랍니다.
        </p>
      </section>
      <section className={classes.section}>
        <h2>다양한 작가의 개성 있는 작품이 모인 공간을 지향합니다.</h2>
        <p>
          이를 위해 모작 또는 대량 생산된 프린팅 제품이 아닌 작가가 직접 만든 작품만 등록해주시길
          바랍니다.
        </p>
        <p>
          아직 부족한 점이 많지만,<br></br>
          작가들의 목소리에 귀 기울여 작가와 소비자 모두를 만족시킬 수 있는 서비스로 발전하겠습니다.
        </p>
      </section>
    </div>
  )
}

export default About
