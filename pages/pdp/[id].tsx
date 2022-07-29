import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { getInventory, getItem } from 'lib/pdp'
import RadioGroup from 'components/RadioGroup'
import { getCatalogItems } from 'lib/catalog'
import { CartCatalogObject, CartState } from 'Context/Context'
import { Button, Toast } from 'react-bootstrap'
import PhotoGallery from 'components/PhotoGallery'
import { CatalogItem, CatalogObject, RetrieveCatalogObjectResponse } from 'square'
import { InventoryInfo, ListCategoryResponse } from 'global/types'
import { GetStaticPropsContext } from 'next'
import { formatPrice } from 'util/utils'

interface PDPProps {
  object: CatalogObject
  itemData: CatalogItem
  relatedObjects: CatalogObject[]
  inventory: InventoryInfo
  
}

interface AvailabilityProps {
  inventory: InventoryInfo
  variationId: string
}


export interface RadioGroupOnChangeProps {
      i: number
      price: bigint
      id: string
      name: string
  }
  
  
  export const Availability = ({ inventory, variationId }: AvailabilityProps) => {
      if (inventory[variationId]?.quantity === 0) {
          return <p className='font-sans text-red-500'>Sold Out</p>
      } else if (inventory[variationId]?.quantity <= inventory[variationId]?.stock_thresh) {
          return <p className='font-sans text-red-500'>Only {inventory[variationId].quantity} left!</p>
      } else {
        return <p className='font-sans text-green-500'>In Stock</p>
      }
  }
  
  
  const PDP = ({ object, itemData, relatedObjects, inventory }: PDPProps) => {
      const [checked, setChecked] = useState<number>(0)
      const [price, setPrice] = useState<bigint>(null)
      const [variationId, setVariationId] = useState<string>(null)
      const [variationName, setVariationName] = useState<string>(null)
      const [image, setImage] = useState({ url: '', name: '' })

      const { state: { cart }, dispatch } = CartState()
      const onChange = ({ i, price, id, name }: RadioGroupOnChangeProps) => {
          setChecked(i)
          setPrice(price)
          setVariationId(id)
          setVariationName(name)
      }
      
      useEffect(() => {
          setPrice(itemData?.variations[checked]?.itemVariationData?.priceMoney?.amount)
          setVariationId(itemData?.variations[checked]?.id)
          setVariationName(itemData?.variations[checked]?.itemVariationData?.name)
          relatedObjects.map((object)=> {
            if(object.type === 'IMAGE'){
                setImage({ url: object?.imageData?.url, name: object?.imageData?.name })
            }
        })
      }, [price, variationId])

      const limit = () => {
        if (cart[variationId]?.qty === inventory[variationId]?.quantity){
            return true
        } else 
        {
            return false
        }
      }

      const onClick = () => {
        const cartData:CartCatalogObject = {
            [variationId]: {
            id: object?.id,
            variationId,
            name: itemData?.name,
            imgSrc: image?.url,
            imgName: image?.name,
            price,
            variationName,
            qty: 1
        } }
        dispatch({
            type: 'ADD_TO_CART',
            payload: cartData
        })
      }
  
      return (
        <>
          <Layout title={itemData?.name}>
          <div className='flex mt-12 justify-center'>
            <div className='flex justify-center'>
                <div className='flex flex-col mr-6'>
                    <PhotoGallery relatedObjects={relatedObjects}/>
                </div>

          <div className='flex flex-col max-w-xs'> 
              <h1 className='font-serif text-5xl font-medium w-full'>{itemData?.name}</h1>
              <p>{itemData?.description}</p>
              <form>
            {
                itemData?.variations &&
                <fieldset>
                    <legend>Style</legend>
                        <div className='max-w-sm -mt-6'>
                      <RadioGroup variations={itemData.variations} checked={checked} onChange={onChange} inventory={inventory}/>
                      </div>
                </fieldset>          
            }
          <div>
              <p className='font-sans text-2xl font-medium w-full'>{formatPrice(price)}</p>
          </div>

        <Button 
          onClick={onClick} 
          className='mb-2'
          variant='outline-secondary'
          disabled={!inventory[variationId]?.quantity || limit()}
        >
          Add to Cart
        </Button>
        <Toast show={limit()} onClose={onClick} bg='warning'>
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Warning</strong>
          </Toast.Header>
          <Toast.Body>You can't add any more of those to your cart.</Toast.Body>
        </Toast>
          </form>
          </div>
          </div>
          </div>
          </Layout>
          </>
          ) 
  }


export async function getStaticProps(context:GetStaticPropsContext) {
    const { params } = context
    const id = params.id
    const res = await getItem(id as string)
    const { object, object: { itemData }, relatedObjects } = JSON.parse(res) as RetrieveCatalogObjectResponse
    const invRes = await getInventory(id as string)
    const inventory = JSON.parse(invRes) as InventoryInfo
    return {
        props: {
            itemData,
            object,
            relatedObjects,
            inventory
        }
    }
}

export async function getStaticPaths() {
    const res = await getCatalogItems()
    const { catalogItems } = JSON.parse(res) as ListCategoryResponse
    const paths = catalogItems?.objects.map(item => { return { params: { id: item.id } }})
    return {
        paths,
        fallback: false
    }
}

export default PDP