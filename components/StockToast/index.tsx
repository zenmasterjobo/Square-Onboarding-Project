import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'

const StockToast = () => {

  const [showA, setShowA] = useState(true)

  const toggleShowA = () => setShowA(!showA)

  return (
    <Row>
      <Col md={6} className='mb-2'>
        <Button onClick={toggleShowA} className='mb-2'>
          Toggle Toast <strong>with</strong> Animation
        </Button>
        <Toast show={showA} onClose={toggleShowA} bg='warning'>
          <Toast.Header>
            <img
              src='holder.js/20x20?text=%20'
              className='rounded me-2'
              alt=''
            />
            <strong className='me-auto'>Warning</strong>
          </Toast.Header>
          <Toast.Body>You can't add any more of those to your cart.</Toast.Body>
        </Toast>
      </Col>
    </Row>
  )
}

export default StockToast