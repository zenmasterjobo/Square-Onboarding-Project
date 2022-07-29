import { ordersApi } from 'util/square-client'
import { randomUUID } from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CreateOrderResponse, Error, Order } from 'square'

// eslint-disable-next-line
BigInt.prototype['toJSON'] = function () { return this.toString() }

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Order
}


export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<CreateOrderResponse | Error[] | {error: string}>) {
    if (req.method === 'POST' ) {
      const { result } = await ordersApi.createOrder({
        idempotencyKey: randomUUID(),
        order: {
            // TODO: don't hard code this, better understand how I should be loading this
            locationId: 'LHJ1ZXJ8YSV8W',
            lineItems: [...req.body.lineItems],
            pricingOptions:{
              autoApplyTaxes: true,
              autoApplyDiscounts: true
            }
          },
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