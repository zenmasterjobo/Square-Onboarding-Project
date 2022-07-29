import ReactSpinner from 'components/Spinner'
import { CartState } from 'Context/Context'
import { getTotal } from 'util/utils'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { CreateOrderResponse } from 'square'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { formatPrice } from 'util/utils'

interface OrderSummaryProps {
    setOrderId: React.Dispatch<React.SetStateAction<string>>
    setPriceTotal: React.Dispatch<React.SetStateAction<bigint>>
}

const OrderSummary = ({ setOrderId, setPriceTotal }: OrderSummaryProps) => {
    const {
        state: { cart },
      } = CartState()

      const [total, setTotal] = useState(getTotal(cart))
      const [catOrder, setCatOrder] = useState<CreateOrderResponse>({})
      const [spinner, setSpinner] = useState(true)    


      useEffect(() => {
        const result = async () =>{
        // Create our Order
        const orderResponse = await fetch('/api/order', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                lineItems: Object.keys(cart).map(x => ({ quantity: cart[x].qty.toString(), catalogObjectId: cart[x].variationId, itemType: 'ITEM' }))
            })
        })
        const response = await orderResponse.json() as CreateOrderResponse
        setCatOrder(response)
        //TODO: Checkout page breaks if you navigate to it with an empty cart
        setSpinner(false)
        setOrderId(response?.order?.id)
        setPriceTotal(response?.order?.totalMoney?.amount)
    }
        result().catch(e=>{console.error(e)})
        setTotal(getTotal(cart))
      }, [cart])

    return (
    <div className='border rounded'>
        <h1 className='m-4'>Order details</h1>
        {spinner ? <div className='flex justify-center mb-4'><ReactSpinner/></div> :
            <>
            <Container className='overflow-y-scroll max-h-80 max-w-xs border rounded'>
                {catOrder?.order?.lineItems?.map((item, i) => {
                    return <Row className='my-10' key={i}>
                        <Col xs={4}>
                            <Image className='' src={cart[item.catalogObjectId].imgSrc} alt={cart[item.catalogObjectId].imgName} thumbnail/>
                        </Col>
                        <Col xs={8} className='mt-4'>
                            <p className='mt-0 mb-0'><b>{`${cart[item.catalogObjectId].name} - ${cart[item.catalogObjectId].variationName}`}</b></p>
                            <p className='mt-0 mb-0'>{formatPrice(cart[item.catalogObjectId].price)}</p>
                            <p className='mt-0 mb-0'>Qty: {cart[item.catalogObjectId].qty}</p>
                        </Col>
                    </Row>
                })}
            </Container>
            
            <div className='ml-4 mb-4'>
            <p className='mb-0 font-bold text-xl'>Taxes:</p>
            {
                catOrder?.order?.taxes.map((tax, i) => (<p className='ml-8 mb-0' key={i}><b>{tax.name}</b>: {formatPrice(tax.appliedMoney.amount)}</p>))
            } 
            </div>

            <div className='ml-4 mb-0'>
                <p className='mb-0 font-bold text-xl'>Subtotals:</p>
                <p className='ml-8 mb-0'><b>Items Total</b>: {formatPrice(total)}</p>
                <p className='ml-8'><b>Taxes Total</b>: {formatPrice(catOrder?.order?.totalTaxMoney?.amount)}</p>
            </div>

            <h2 className='m-4'>Total: {formatPrice(catOrder?.order?.totalMoney?.amount)}</h2>
            </>
            }

    </div>
    )
}


export default OrderSummary