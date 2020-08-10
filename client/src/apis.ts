import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const config: AxiosRequestConfig = {
  method: 'post',
  baseURL: 'https://api.artsy.net/api/tokens/xapp_token/',
  params: {
    client_id: '6cb29cfe42c788d1d608',
    client_secret: '80d7e755576001d57ce25c484d352132',
  },
}

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.artsy.net/api/',
  headers: { 'X-XAPP-Token': sessionStorage.getItem('artsy-token') },
})

export const _getToken = () => {
  axios(config).then((res) => {
    sessionStorage.setItem('artsy-token', res.data.token)
  })
}

export const _dataApi = {
  artwork: () => api.get('artworks'),
  artists: () => api.get('artists'),
}
