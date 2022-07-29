import { CategoryObject, ListCategoryResponse, MyCatalogObject } from 'global/types'
import { catalogApi } from 'util/square-client'

// Retieive catalog Items
export async function getCatalogItems(): Promise<string> {
    const catalogItemsReq  = await catalogApi.searchCatalogObjects({
        objectTypes:['ITEM'],
        includeDeletedObjects: false,
        includeRelatedObjects: true
     })

    const images:MyCatalogObject = {}
    const categories: CategoryObject = {}
    catalogItemsReq?.result?.relatedObjects.map(obj => {
        if (obj.type === 'IMAGE') {
            images[obj.id] = obj
        }
        if (obj.type === 'CATEGORY'){
            categories[obj.id] = {
                name: obj.categoryData?.name,
                items:[]
            }
        }
    })

    catalogItemsReq?.result?.objects?.forEach(obj => {
        categories[obj?.itemData?.categoryId]?.items.push(obj)
    })


    const response: ListCategoryResponse = {
        catalogImages: images,
        categories,
        catalogItems: catalogItemsReq?.result
    }


    return JSON.stringify(response, (_, value) => {
        // eslint-disable-next-line
        return typeof value === 'bigint' ? value.toString() : value
    }, 4)
}