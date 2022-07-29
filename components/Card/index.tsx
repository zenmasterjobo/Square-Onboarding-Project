import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { CatalogImage, CatalogItem } from 'square'

interface ProductCardProps {
  id: string
  image: CatalogImage
  itemData: CatalogItem
}

const ProductCard = ({ id, image, itemData }: ProductCardProps ) => {
  /**
 * Helper function to format money into appropriate currency and rounding.
 * If the value is an integer (i.e. no decimal places), do not show `.00`.
 * @param {Number} value the amount
 * @param {String} currency the currency code
 */
 const formatMoney = function(value:bigint, currency:string) {
  let valueAsNumber = Number(value)
  // Create number formatter.
  const props = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }
  // If the value is an integer, show no decimal digits.
  if (valueAsNumber % 1 == 0) {
    props.minimumFractionDigits = 0
  }
  
  // Some currencies don't need to use higher denominations to represent values.
  if (currency !== 'JPY') {
    valueAsNumber /= 100.0
  }
  const formatter = new Intl.NumberFormat('en-US', props)
  return formatter.format(valueAsNumber)
}

const priceMoney = itemData?.variations[0]?.itemVariationData?.priceMoney


  return (
    <Card className='mt-4 mr-4 w-72'>
      <Card.Img className='max-h-52 object-cover' variant='top' src={image?.url} alt={image?.name} />
      <Card.Body>
        <Card.Title>{itemData.name}</Card.Title>
        <Card.Text>
        {`${formatMoney(priceMoney.amount, priceMoney.currency)}`}
        </Card.Text>
        <Link href={`/pdp/${id}`}>
          <Button variant='primary'>View</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}


export default ProductCard