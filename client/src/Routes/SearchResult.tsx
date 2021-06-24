import React, { FC, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/core/styles'
import { Tabs, Tab, Typography } from '@material-ui/core'
import TabPanel from '../Components/TabPanel'
import ArtSearchResult from '../Components/Art/ArtSearchResult'

const useStyles = makeStyles({
  container: {
    '@media (min-width: 1024px)': {
      margin: '0 auto 0 auto',
    },
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1213px',
    minHeight: '100vh',
    backgroundColor: 'white',
    paddingTop: '56px',
    '@media (max-width: 834px)': {
      paddingTop: '50px',
    },
  },
  searchWord: {
    margin: '40px 0 40px 60px',
    fontWeight: 600,
    '@media (max-width: 834px)': {
      margin: '25px 0 25px 33px',
      fontSize: '18px',
    },
  },
  tabs: {
    width: '100%',
    paddingLeft: '40px',
    '@media (max-width: 834px)': {
      paddingLeft: '15px',
    },
  },
  tabPanel: {
    width: '100%',
    '& .MuiBox-root': {
      padding: '20px 50px 20px 50px',
      '@media (max-width: 834px)': {
        padding: '15px',
      },
    },
  },
})

const SEARCH_RESULT_COUNT = gql`
  query SearchResultCount($word: String!) {
    searchResultCount(word: $word) {
      result
      artCount
      artistCount
    }
  }
`

function useUrlQuery() {
  return new URLSearchParams(useLocation().search)
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const SearchResult: FC = () => {
  const classes = useStyles()
  let query = useUrlQuery()
  const word = query.get('word')
  const [value, setValue] = useState<string>('arts')

  const { data } = useQuery(SEARCH_RESULT_COUNT, {
    variables: {
      word: word,
    },
    onCompleted: (data) => {
      if (!data.searchResultCount.result) {
        alert('검색어가 없습니다.')
        window.history.back()
      }
    },
    onError: (error) => console.error(error.message),
  })

  if (!data) {
    return null
  }

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue)
  }

  return (
    <main className={classes.container}>
      <Typography className={classes.searchWord} variant="h6">
        '{word}' 검색 결과
      </Typography>
      <Tabs
        className={classes.tabs}
        indicatorColor="primary"
        textColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="내 계정 탭"
      >
        <Tab
          label={`작품(${data.searchResultCount.artCount})`}
          value={'arts'}
          {...a11yProps('arts')}
        />
        <Tab
          label={`작가(${data.searchResultCount.artistCount})`}
          value={'artists'}
          {...a11yProps('artists')}
        />
      </Tabs>
      <div className={classes.tabPanel}>
        <TabPanel value={value} index={'arts'}>
          <ArtSearchResult word={word} />
        </TabPanel>
        <TabPanel value={value} index={'artists'}>
          <div>artist</div>
        </TabPanel>
      </div>
    </main>
  )
}

export default SearchResult
