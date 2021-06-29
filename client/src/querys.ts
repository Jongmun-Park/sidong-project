import gql from 'graphql-tag'

export const ART_OPTIONS = gql`
  query ArtOptions($mediumId: ID) {
    artOptions(mediumId: $mediumId) {
      themes {
        id
        name
      }
      styles {
        id
        name
      }
      techniques {
        id
        name
      }
    }
  }
`

export const ART = gql`
  query Art($artId: ID!) {
    art(artId: $artId) {
      id
      artist {
        id
        artistName
        realName
      }
      name
      description
      medium
      theme {
        id
        name
      }
      style {
        id
        name
      }
      technique {
        id
        name
      }
      saleStatus
      isFramed
      orientation
      price
      deliveryFee
      representativeImageUrl
      width
      height
      size
      imageUrls {
        id
        url
      }
    }
  }
`

export const ARTIST = gql`
  query Artist($artistId: ID!) {
    artist(artistId: $artistId) {
      id
      realName
      artistName
      description
      thumbnail {
        id
        url
      }
      representativeWork {
        id
        url
      }
      category
      residence
      website
      phone
    }
  }
`
