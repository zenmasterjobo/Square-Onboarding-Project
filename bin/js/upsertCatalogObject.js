// Upsert Catalog Object - create or update a catalog object

// Import relevant SDK modules
// Client is the Square SDK Client that will have all the APIs
// Environment used to get the sandbox Variable
import { Client, Environment } from 'square'
import crypto from 'crypto'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('./', '../../.env') })

// json data containing our new object to insert
import sampleData  from '../catalogData/ceramicData.json' assert {type: 'json'}
// Create New Square Client
const client = new Client({
    // reminder: place Access Token in .env file and don't commit to git!
    accessToken: process.env.ACCESS_TOKEN,
    environment: Environment.Sandbox,
})

const main = async () => {

    // Get refeerence to catalogAPI from the initialized client
    const { catalogApi } = client
    
    try {
        // uniquely identify our request
        sampleData.idempotencyKey = crypto.randomUUID()

        // upsert the object
        const response = await catalogApi.upsertCatalogObject(sampleData)
    
        // Read output to the console 
        // Info on bigInt in JS: https://dev.to/benlesh/bigint-and-json-stringify-json-parse-2m8p
        console.log(JSON.stringify(response.result, (key, value) => {
            return typeof value === 'bigint' ? parseInt(value) : value
        }, 4))

    } catch(error) {

        console.log(error)
    }

}

main()


