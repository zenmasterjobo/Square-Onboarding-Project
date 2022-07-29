import { InventoryInfo } from 'global/types'
import { catalogApi, inventoryApi } from '../util/square-client'


export async function getItem(id:string): Promise<string> {
    const catalogItemReq  = await catalogApi.retrieveCatalogObject(id, true)
    const catalogItemRes = JSON.stringify(catalogItemReq?.result, (_, value) => {
        // eslint-disable-next-line
        return typeof value === 'bigint' ? value.toString() : value
    }, 4)
    return catalogItemRes
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