import { CartState } from 'Context/Context'
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk'
import { useRouter } from 'next/router'
import { ShippingInformation } from 'global/types'

export interface SquarePayProps {
    orderId: string
    priceTotal: bigint
    userInfo: ShippingInformation
}


const SquarePay = ({ orderId, priceTotal, userInfo }:SquarePayProps) => {

    const { dispatch } = CartState()
    const router = useRouter()

    return <PaymentForm
            applicationId='sandbox-sq0idb-fGy4J7knbQVCCvOeOA6sXg'
            locationId='LHJ1ZXJ8YSV8W'
            cardTokenizeResponseReceived={ (token) => {
                (async () => {
                    await fetch (`/api/pay/${orderId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            userInfo
                        })
                    }).catch(e => {console.error(e)})

                    // Create our Payment using the Order
                    // Probably should condense both of these into one endpoint that does it
                    const response = await fetch ('/api/pay', {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            sourceId: token?.token,
                            orderId: orderId,
                            price: priceTotal
                        })
                    })
                    
                    await response.json()
                    await router.push('/complete').catch(e=>console.error(e))
                    dispatch({
                        type: 'CLEAR_CART',
                        payload: {}
                    })
                })().catch(e=>console.error(e))
            }}
            >
                <CreditCard/>
            </PaymentForm>
    }


export default SquarePay 