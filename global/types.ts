import { SearchCatalogObjectsResponse, CatalogObject } from 'square'

// Type to track basic Image data
export interface BasicImageData {
    name: string
    url: string
  }

// Type for story catalog objects in a hash, 
// where the id is the catalogObject ID, and then the body is the resulting data  
export interface MyCatalogObject {
    [key: string]: CatalogObject
}

// Similar to the above but to structure the data based on categories
// This is used for the catalog layout to order items by their category
export interface CategoryObject {
    [key: string]: {
        name: string | null
        items: CatalogObject[]
    }
}

// The base response object from catalog.ts
export interface ListCategoryResponse {
        catalogImages: MyCatalogObject
        categories: CategoryObject
        catalogItems: SearchCatalogObjectsResponse
}
// Look up inventory info based on itemVariation ID
export interface InventoryInfo {
    [key: string]: StockInfo
}

// Basic information tracking stock info for an item
export interface StockInfo {
    quantity: number
    stock_thresh: number
}

// basic type to track user shipping information
export interface ShippingInformation {
    fName?: string
    lName?: string
    street?: string
    city?: string
    state?: string
    zip?: string
}

export type InputEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>