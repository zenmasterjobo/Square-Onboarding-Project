import { paymentsApi } from 'util/square-client'
import { randomUUID } from 'crypto'
import { NextApiRequest, NextApiResponse } from 'next'
import { CreatePaymentResponse, Error } from 'square'
// eslint-disable-next-line
BigInt.prototype['toJSON'] = function () { return this.toString() }

interface ExtendedNextAPIRequest extends NextApiRequest {
  body: {
    sourceId: string
    orderId: string
    price: bigint
  }
}


export default async function handler(req: ExtendedNextAPIRequest, res: NextApiResponse<CreatePaymentResponse | Error[] | {error: string}>) {
    if (req.method === 'POST' ) {
      const { result } = await paymentsApi.createPayment({
        idempotencyKey: randomUUID(),
        sourceId: req.body.sourceId,
        orderId: req.body.orderId,
        amountMoney: {
          currency: 'USD',
          amount: req.body.price
        }        
      })
      if (!result.errors){
        res.status(200).json(result)
      } else {
        res.status(Number(result.errors[0]?.code)).json(result.errors)
      }
    } else {
      res.status(500).json({ error:`req method ${req.method} not supported` })
    }
  }