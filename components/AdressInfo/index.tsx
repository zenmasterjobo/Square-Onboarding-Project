import { InputEventType } from 'global/types'
import React from 'react'

interface States {
  [key: string]: string
}

const states: States = {
  AL : 'Alabama',
  AK : 'Alaska',
  AZ : 'Arizona',
  AR : 'Arkansas',
  CA : 'California',
  CO : 'Colorado',
  CT : 'Connecticut',
  DE : 'Delaware',
  FL : 'Florida',
  GA : 'Georgia',
  HI : 'Hawaii',
  ID : 'Idaho',
  IL : 'Illinois',
  IN : 'Indiana',
  IA : 'Iowa',
  KS : 'Kansas',
  KY : 'Kentucky',
  LA : 'Louisiana',
  ME : 'Maine',
  MD : 'Maryland',
  MA : 'Massachusetts',
  MI : 'Michigan',
  MN : 'Minnesota',
  MS : 'Mississippi',
  MO : 'Missouri',
  MT : 'Montana',
  NE : 'Nebraska',
  NV : 'Nevada',
  NH : 'New Hampshire',
  NJ : 'New Jersey',
  NM : 'New Mexico',
  NY : 'New York',
  NC : 'North Carolina',
  ND : 'North Dakota',
  OH : 'Ohio',
  OK : 'Oklahoma',
  OR : 'Oregon',
  PA : 'Pennsylvania',
  RI : 'Rhode Island',
  SC : 'South Carolina',
  SD : 'South Dakota',
  TN : 'Tennessee',
  TX : 'Texas',
  UT : 'Utah',
  VT : 'Vermont',
  VA : 'Virginia',
  WA : 'Washington',
  WV : 'West Virginia',
  WI : 'Wisconsin',
  WY : 'Wyoming'
}

interface AddressInfoProps {
  onInformationChange: (e:InputEventType) => void
}
 
 const AdressInfo = ({ onInformationChange }: AddressInfoProps) => (
   <form className='w-full max-w-lg border rounded'>
    <fieldset className='m-4'>
    <legend>Shipping Information</legend>

  <div className='flex flex-wrap -mx-3 mb-6'>
    <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='fName'>
        First Name
      </label>
      <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='fName' type='text' placeholder='Jane' onChange={onInformationChange}/>
    </div>
    <div className='w-full md:w-1/2 px-3'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='lName'>
        Last Name
      </label>
      <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='lName' type='text' placeholder='Doe' onChange={onInformationChange}/>
    </div>
  </div>
  <div className='flex flex-wrap -mx-3 mb-6'>
    <div className='w-full px-3'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='street'>
        address
      </label>
      <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='street' type='text' placeholder='123 Main St' onChange={onInformationChange}/>
    </div>
  </div>
  <div className='flex flex-wrap -mx-3 mb-2'>
    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='city'>
        City
      </label>
      <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='city' type='text' placeholder='Montgomery' onChange={onInformationChange}/>
    </div>
    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='state'>
        State
      </label>
      <div className='relative'>
        <select className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='state' onChange={onInformationChange}>
        {
          Object.keys(states).map((key, i) => <option key={i} value={key}>{states[key]}</option>)
        }
        </select>
        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
          <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z'/></svg>
        </div>
      </div>
    </div>
    <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' htmlFor='zip'>
        Zip
      </label>
      <input className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' id='zip' type='text' placeholder='90210' onChange={onInformationChange}/>
    </div>
  </div>
</fieldset>
</form>
 )
 
 export default AdressInfo