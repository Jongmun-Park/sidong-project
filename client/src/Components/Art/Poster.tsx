import React, { FC, memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, ButtonBase } from '@material-ui/core'
import { currencyFormatter, translateSaleStatus } from '../../utils'
import { SaleStatus } from '../../types'
import ArtDialog from './Dialog'
import Like from './Like'

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    backgroundColor: theme.palette.greyBackground.main,
    borderRadius: '10px',
    '@media (max-width: 823px)': {
      padding: '11px',
    },
  },
  buttonBase: {
    height: '200px',
    '@media (max-width: 823px)': {
      height: '140px',
    },
  },
  image: {
    width: '100%',
    maxHeight: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    '@media (max-width: 823px)': {
      maxHeight: '140px',
    },
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '14px',
    paddingLeft: '8px',
    color: theme.palette.lightBlack.main,
    '@media (max-width: 823px)': {
      marginTop: '10px',
    },
    '& p': {
      fontSize: '12px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginBottom: '5px',
      '@media (max-width: 823px)': {
        fontSize: '10px',
        marginBottom: '3px',
      },
      '&:last-child': {
        marginBottom: '0',
      },
    },
  },
  artName: {
    fontSize: '15px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginBottom: '5px',
    cursor: 'pointer',
    '@media (max-width: 823px)': {
      fontSize: '12px',
      marginBottom: '3px',
    },
  },
  like: {
    float: 'right',
    cursor: 'pointer',
    alignSelf: 'center',
    '& .MuiSvgIcon-root': {
      fontSize: '19px',
      '@media (max-width: 823px)': {
        fontSize: '1rem',
      },
    },
  },
}))

interface ArtPosterProps {
  id: number
  artistId?: number
  name: string
  width: number
  height: number
  artistName: string
  saleStatus: SaleStatus
  price: number
  representativeImageUrl: string
}

const Poster: FC<ArtPosterProps> = ({
  id,
  artistId,
  name,
  width,
  height,
  artistName,
  saleStatus,
  price,
  representativeImageUrl,
}) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  return (
    <div>
      <Paper className={classes.paper} elevation={2}>
        <ButtonBase
          className={classes.buttonBase}
          onClick={() => {
            setOpenDialog(true)
          }}
        >
          <img alt="작품 이미지" className={classes.image} src={representativeImageUrl} />
        </ButtonBase>
        <div className={classes.textArea}>
          <Typography
            className={classes.artName}
            variant="subtitle1"
            onClick={() => {
              setOpenDialog(true)
            }}
          >
            {name}
          </Typography>
          {artistId ? (
            <Typography
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
              variant="body2"
              onClick={() => {
                window.open('/artist/' + artistId)
              }}
            >
              {artistName}
            </Typography>
          ) : (
            <Typography variant="body2">{artistName}</Typography>
          )}
          <Typography variant="body2">
            {width}x{height}cm
          </Typography>
          {saleStatus === SaleStatus.ON_SALE ? (
            <Typography variant="body2">
              {currencyFormatter(price)}
              <span className={classes.like}>
                <Like artId={id} />
              </span>
            </Typography>
          ) : (
            <Typography variant="body2">
              {translateSaleStatus(saleStatus)}
              <span className={classes.like}>
                <Like artId={id} />
              </span>
            </Typography>
          )}
        </div>
      </Paper>
      {openDialog && (
        <ArtDialog
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          artId={id}
          artName={name}
        />
      )}
    </div>
  )
}

export const MemoizedPoster = memo(Poster)
export default Poster
