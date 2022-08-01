import { InventoryInfo } from 'global/types'
import { CatalogObject } from 'square'
import { Availability, RadioGroupOnChangeProps } from '../../pages/pdp/[id]'

interface RadioGroupProps {
    variations: CatalogObject[]
    checked: number
    onChange: (data: RadioGroupOnChangeProps, e: React.ChangeEvent<HTMLInputElement>) => void
    inventory: InventoryInfo
    isLoaded: boolean
}

const RadioGroup = ({ variations, checked, onChange, inventory, isLoaded }: RadioGroupProps) => {
    return <div className='flex flex-col mb-4'>
      <div className='flex mt-4 flex-wrap'>
    {
        variations.map((variation, i:number) => {
            const data:RadioGroupOnChangeProps = {
                i: i, 
                price: variation?.itemVariationData?.priceMoney?.amount, 
                id: variation?.id, 
                name: variation?.itemVariationData?.name
            }
        return (
            <div key={i} className='mr-2'>
                <input 
                    id={variation?.id}
                    type='radio' 
                    className='sr-only peer'
                    checked={checked === i? true: false}
                    onChange={(e) => onChange(data, e)} 
                    value={variation?.id} />
                <label htmlFor={variation.id} className='flex flex-col p-2 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-gray-50 peer-checked:ring-green-500 peer-checked:ring-2 peer-checked:border-red'>
                    {variation?.itemVariationData?.name}
                    <Availability inventory={inventory} variationId={variation.id} isLoaded={isLoaded}/>
                </label>
            </div>
            )
        })
    }
    </div>
    </div>
}

export default RadioGroup