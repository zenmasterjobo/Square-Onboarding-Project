import { randomUUID } from 'crypto'
import { ShippingInformation } from 'global/types'
import { NextApiRequest, NextApiResponse } from 'next'
import { UpdateOrderResponse, Error } from 'square'
import { ordersApi } from 'util/square-client'
// eslint-disable-next-line
BigInt.prototype['toJSON'] = function () { return this.toString() }

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        userInfo: ShippingInformation
    }
}


export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<UpdateOrderResponse | Error[] | {error: string}>) {
    if (req.method === 'PUT') {
        const { orderId } = req.query
        const { result } = await ordersApi.updateOrder(orderId[0],
          {
            order: {
              locationId: 'LHJ1ZXJ8YSV8W',
              fulfillments: [
                {
                  type: 'SHIPMENT',
                  shipmentDetails: {
                    recipient: {
                      displayName: `${req.body?.userInfo?.fName} ${req.body?.userInfo?.lName}`,
                      address: {
                        addressLine1: req.body?.userInfo?.street,
                        locality: req.body?.userInfo?.city,
                        administrativeDistrictLevel1: req.body?.userInfo?.state,
                        postalCode: req.body?.userInfo?.zip,
                        country: 'US'
                      }
                    },
                    carrier: 'Fedex'
                  }
                }
              ],
              version: 1
            },
            idempotencyKey: randomUUID()
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


