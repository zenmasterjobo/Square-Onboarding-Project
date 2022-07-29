import SquarePay from 'components/SquarePay'
import AddressInfo from 'components/AdressInfo'
import OrderSummary from 'components/OrderSummary'
import React, { useState } from 'react'
import { InputEventType, ShippingInformation } from 'global/types'

const Checkout = () => {
    const [orderId, setOrderId] = useState('')
    const [priceTotal, setPriceTotal] = useState<bigint>(null)
    const [userInfo, setUserInfo] = useState<ShippingInformation>({})

    const onInformationChange = (e: InputEventType) => {
        const information:ShippingInformation = { [e.target.id]: e.target.value }
        setUserInfo({ ...userInfo, ...information })
    }


    return <div className='flex justify-center mt-16'>
        <div className='mr-4'>
        <AddressInfo onInformationChange={onInformationChange}/>
        <div className='mt-4'>
                <SquarePay orderId={orderId} priceTotal={priceTotal} userInfo={userInfo}/>
            </div>
        </div>
        <div className='max-w-lg'>
            <OrderSummary setOrderId={setOrderId} setPriceTotal={setPriceTotal}/>
        </div>
    </div>
}



export default Checkout