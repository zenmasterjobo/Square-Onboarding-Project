import { InventoryInfo } from 'global/types'
import { RetrieveCatalogObjectResponse } from 'square'
import { catalogApi, inventoryApi } from '../util/square-client'


export interface ItemAndInventoryResponse {
    catalogItemRes: RetrieveCatalogObjectResponse
    inventory: InventoryInfo
}

export async function getItem(id:string): Promise<string> {
    const catalogItemReq  = await catalogApi.retrieveCatalogObject(id, true)

    // Then we need to collect the stock threshold from item variations data
    // we also want to collect a list of the item variation ids
    // we don't want to set the inventory here, because inventory should be a refreshed
    // on page requests
    const inventory:InventoryInfo = {}
    catalogItemReq?.result?.object?.itemData?.variations.forEach(variation =>{
        inventory[variation.id] = {
            quantity: null,
            stock_thresh: null
        }
        inventory[variation.id].stock_thresh = Number(variation?.itemVariationData?.inventoryAlertThreshold)
    })

    const resp: ItemAndInventoryResponse = { catalogItemRes: catalogItemReq?.result, inventory }
    return JSON.stringify(resp, (_, value) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return typeof value === 'bigint' ? value.toString() : value
    })
}


export async function getInventory(id: string): Promise<string> {
    // First we need to get our item_variations from our base Item
    const catalogItemReq  = await catalogApi.retrieveCatalogObject(id, true)

    // Then we need to collect the stock threshold from item variations data
    // we also want to collect a list of the item variation ids
    const inventory:InventoryInfo = {}
    const items:string[] = catalogItemReq?.result?.object?.itemData?.variations.map(variation =>{
        inventory[variation.id] = {
            quantity: 0,
            stock_thresh: 0
        }
        inventory[variation.id].stock_thresh = Number(variation?.itemVariationData?.inventoryAlertThreshold)
        return variation.id
    })

    // After collecting these ids, we now need to query the inventory api to get the counts and state
    // and then put this information onto our desired object
    const inventoryBatchReq = await inventoryApi.batchRetrieveInventoryCounts({
        catalogObjectIds: items
    })

    // set the quantity on the object to be returned
    inventoryBatchReq?.result?.counts?.forEach(item => {
        inventory[item?.catalogObjectId].quantity = Number(item?.quantity)
    })

    return JSON.stringify(inventory)
}