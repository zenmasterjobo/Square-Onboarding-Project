import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { AiFillDelete } from 'react-icons/ai'
import { BatchRetrieveInventoryCountsResponse } from 'square'
import { formatPrice, getTotal } from 'util/utils'
import { CartState } from '../Context/Context'

interface InventoryObjectMap {
  [key:string]: number
}

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState()
  const [total, setTotal] = useState<number>(0)
  const [InventoryMap, setInventoryMap] = useState<InventoryObjectMap>(null)

  useEffect(() => {
    const fetchData = async () => {
        const inventoryResponse = await fetch('/api/inventory', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            // Square probably has a type defined for this
            body: JSON.stringify({
                ids: [...Object.keys(cart)],
            })
        })
        const { counts } = await inventoryResponse.json() as BatchRetrieveInventoryCountsResponse

        const temp = {}
        counts.forEach(x => {
            temp[x.catalogObjectId] = x.quantity
        })
        setInventoryMap(temp)
      }
  
      fetchData().catch(e=>{console.error(e)})

    setTotal(getTotal(cart))

  }, [cart])

  return (
    <div className='flex justify-center mt-12'>
      <div className='flex flex-wrap w-2/4'>
        <ListGroup className='w-full'>
          {Object.keys(cart).map((key, i) => (
            <ListGroup.Item key={i}>
              <Row>
                <Col md={2}>
                  <Image src={cart[key].imgSrc} alt={cart[key].imgName} fluid rounded thumbnail/>
                </Col>
                <Col md={2}>
                  <span>{cart[key].name} - {cart[key].variationName}</span>
                </Col>
                <Col md={2}>{formatPrice(cart[key]?.price)}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={cart[key].qty}
                    onChange={(e) =>
                      dispatch({
                        type: 'CHANGE_CART_QTY',
                        payload:{ [key]: {
                          ...cart[key],
                          qty: Number(e.target.value),
                        } },
                      })
                    }
                  >
                    {InventoryMap && Array.from(Array(Number(InventoryMap[key]))).map((x, i) =>{
                        return (
                      <option key={i + 1}>{i + 1}</option>
                    )})}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() =>
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: { [key]: cart[key] },
                      })
                    }
                  >
                    <AiFillDelete fontSize='20px' />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className='flex flex-col bg-blue-200 p-8 m-4 '>
        <span className='title'>Subtotal ({Object.keys(cart).length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total: {formatPrice(total)}</span>
        <Link href='/checkout'>
        <Button type='button' disabled={Object.keys(cart).length === 0}>
          Proceed to Checkout
        </Button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
