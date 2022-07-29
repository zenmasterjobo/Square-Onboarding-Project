import { CartState } from 'Context/Context'
import { AiFillDelete } from 'react-icons/ai'
import { Container, Row, Col, Image } from 'react-bootstrap'
import { formatPrice } from 'util/utils'

const CartDropdown = () => {
    const {
        state: { cart },
        dispatch
      } = CartState()

    return <Container className='my-4'>
    {Object.keys(cart).map((key, i) => {
    return(<Row className='flex items-center' key={i}>
      <Col xs={4}>
      <Image
        src={cart[key]?.imgSrc}
        alt={cart[key]?.imgName}
        thumbnail
      />
      </Col>
      <Col xs={6}>
        <Row>
          <Col xs={12}><b>{cart[key]?.name}-{cart[key]?.variationName}</b></Col>
          <Col xs={12}>{formatPrice(cart[key]?.price)}</Col>
          <Col xs={12}>Qty: {cart[key].qty}</Col>
        </Row>
      </Col>
      <Col xs={2}>
      <AiFillDelete
        fontSize='20px'
        style={{ cursor: 'pointer' }}
        onClick={() =>
          dispatch({
            type: 'REMOVE_FROM_CART',
            payload: { [key]: cart[key] },
          })
        }
      />
      </Col>
    </Row>
  )})}
  </Container>
}

export default CartDropdown