import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { translateResidence, translateArtistCategory } from '../../utils'
import { Artist } from '../../types'

const useStyles = makeStyles((theme) => ({
  table: {
    '@media (min-width: 823px)': {
      marginLeft: '50px',
    },
  },
  th: {
    '@media (min-width: 823px)': {
      width: '15%',
    },
    width: '35%',
    minWidth: '63px',
    color: theme.palette.greyFont.main,
    padding: '6px 6px 6px 0',
    fontSize: '0.929em',
    borderBottom: 'none',
  },
  td: {
    '@media (min-width: 823px)': {
      width: '85%',
    },
    width: '65%',
    padding: '6px 0 6px 6px',
    fontSize: '1em',
    fontWeight: 600,
    borderBottom: 'none',
  },
}))

const ArtistInfoTable: FC<Artist> = ({ artist }) => {
  const classes = useStyles()
  return (
    <Table className={classes.table}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            성명
          </TableCell>
          <TableCell className={classes.td}>{artist.realName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            필명
          </TableCell>
          <TableCell className={classes.td}>{artist.artistName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            활동 분야
          </TableCell>
          <TableCell className={classes.td}>{translateArtistCategory(artist.category)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            활동 지역
          </TableCell>
          <TableCell className={classes.td}>{translateResidence(artist.residence)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            웹 사이트
          </TableCell>
          <TableCell className={classes.td}>{artist.website}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ArtistInfoTable
