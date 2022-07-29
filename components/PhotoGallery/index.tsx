import React, { useState, useCallback } from 'react'
import { CatalogObject } from 'square'

interface PhotoGalleryProps {
  relatedObjects: CatalogObject[]
}

const  PhotoGallery = ({ relatedObjects }: PhotoGalleryProps) => {

  const images = relatedObjects.filter(x => x.type === 'IMAGE')
  const photos = images.map((object) => {
        return {
            src: object?.imageData?.url,
            name: object?.imageData?.name
        }
  })

  const [currentImage, setCurrentImage] = useState(0)

  const setImage = useCallback((_, i:number) => {
    setCurrentImage(i)
  }, [])


  return (
    <>
    <img src={photos[currentImage]?.src} alt={photos[currentImage]?.name} className='h-80 w-80 rounded object-cover'/>
    <div className='max-w-xs flex flex-wrap mt-4 justify-center'>
     {photos.map((photo, i) => {
        return <button key={i} onClick={ event => setImage(event, i)} className={'m-1'}>
        <img key={i} src={photo?.src} alt={photo?.name} className='h-20 w-20 rounded object-cover'/>
        </button>
     })}
    </div>
    </>
  )
}

export default PhotoGallery
