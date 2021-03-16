import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core'
import { translateMedium } from '../../utils'
import { Art } from '../../types'

const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: '33px',
  },
  th: {
    color: theme.palette.greyFont.main,
    width: '40%',
    padding: '6px 6px 6px 0',
    fontSize: '0.929em',
    borderBottom: 'none',
  },
  td: {
    width: '60%',
    padding: '6px',
    fontSize: '1em',
    fontWeight: 600,
    borderBottom: 'none',
  },
}))

interface ArtInfoTableProps {
  art: Art
}

const ArtInfoTable: FC<ArtInfoTableProps> = ({ art }) => {
  const classes = useStyles()
  return (
    <Table className={classes.table}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            작가 | Artist
          </TableCell>
          <TableCell
            onClick={() => {
              window.open(`/artist/${art.artist.id}`)
            }}
            className={classes.td}
            style={{ cursor: 'pointer' }}
          >
            {art.artist.realName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            매체 | Medium
          </TableCell>
          <TableCell className={classes.td}>{translateMedium(art.medium)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            주제 | Theme
          </TableCell>
          <TableCell className={classes.td}>{art.theme.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            스타일 | Style
          </TableCell>
          <TableCell className={classes.td}>{art.style.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            기법 | Technique
          </TableCell>
          <TableCell className={classes.td}>{art.technique.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            크기 | Size
          </TableCell>
          <TableCell className={classes.td}>
            {art.width}x{art.height}cm
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={classes.th} component="th" scope="row">
            액자 | Frame
          </TableCell>
          <TableCell className={classes.td}>{art.isFramed ? '포함' : '미포함'}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default ArtInfoTable
