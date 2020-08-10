import React, { useMemo, useEffect } from 'react'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.min.css'
import '@uppy/dashboard/dist/style.min.css'

const ImageUploader = () => {
  const uppy = useMemo(() => {
    console.log('useMemo~~~~')
    return Uppy({
      restrictions: {
        maxFileSize: 10485760,
        allowedFileTypes: ['image/*'],
        minNumberOfFiles: 1,
        maxNumberOfFiles: 5,
      },
      autoProceed: false,
    }).use(Tus, { endpoint: 'http://master.tus.io/files/' })
  }, [])

  useEffect(() => {
    console.log('useEffect~~')
    return () => uppy.close()
    // eslint-disable-next-line
  }, [])

  return <Dashboard uppy={uppy} theme="dark" />
}

export default ImageUploader
