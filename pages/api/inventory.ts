import { NextApiRequest, NextApiResponse } from 'next'
import { BatchRetrieveInventoryCountsResponse, Error } from 'square'
import { inventoryApi } from 'util/square-client'
// eslint-disable-next-line
BigInt.prototype["toJSON"] = function () { return this.toString(); }


interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        ids: string[]
    }
  }

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<BatchRetrieveInventoryCountsResponse | {error: string} | Error[]>) {
    if (req.method === 'POST') {
        req
        const { result } = await inventoryApi.batchRetrieveInventoryCounts({
            catalogObjectIds: req.body.ids
        })
        if (!result.errors) {
            res.status(200).json(result)
          } else {
            res.status(Number(result?.errors[0]?.code)).json(result.errors)
          }
    } else {
        res.status(500).json({ error:`req method ${req.method} not supported` })
    }
  }