import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import {
    Navbar,
    ButtonGroup,
    Button,
    Container,
    Dropdown,
    Nav,
  } from 'react-bootstrap'
import { CartState } from '../../Context/Context'
import CartDropdown from 'components/CartDropdown'
import { useRouter } from 'next/router'

const Header = () => {
    const {
        state: { cart },
      } = CartState()
      const router = useRouter()

    return (
        <Navbar className='bg-gray-200 h-16'>
        <Container>
          <Navbar.Brand>
            <Link href='/'>DirtKettle</Link>
          </Navbar.Brand>
          <Nav>

          <Dropdown as={ButtonGroup}>
            <Button variant='success' onClick={() => {router.push('/cart').catch(e => {console.error(e)})}}>
              <div className='flex align-center'>
              <FaShoppingCart color='white' fontSize='20px' />
              <p className='text-xs mb-0 ml-1'>{Object.keys(cart).length}</p>
              </div>
            </Button>
            <Dropdown.Toggle split variant='success' id='dropdown-split-basic' />
            <Dropdown.Menu align='end' style={{ minWidth: 370, left: '-285px' }}>
                {Object.keys(cart).length > 0 ? (
                  <>
                    <CartDropdown/>
                    <Link href='/cart'>
                      <Button style={{ width: '95%', margin: '0 10px' }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
    </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default Header