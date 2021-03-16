import gql from 'graphql-tag'

export const ART_OPTIONS = gql`
  query ArtOptions($mediumId: ID!) {
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
