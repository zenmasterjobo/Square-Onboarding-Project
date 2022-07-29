import { CategoryObject, MyCatalogObject, ListCategoryResponse } from 'global/types'
import { getCatalogItems } from 'lib/catalog'
import ProductCard from '../components/Card'
import Layout from '../components/Layout'

interface HomePageProps {
  categories: CategoryObject
  catalogImages: MyCatalogObject
}

export default function HomePage({ categories, catalogImages }: HomePageProps) {

  return (
    <Layout title='DirtKettle' >
      <div className='flex flex-col justify-center'>
      {Object.keys(categories).map((key) => {
        return <div className='mt-4 mb-12' key={categories[key].name}>
          <h2>{categories[key].name}</h2>
          <div className='flex flex-wrap'>
          {categories[key].items.map((item, i) => {
            const imageId = item?.itemData?.imageIds[0]
            const image = catalogImages[imageId]?.imageData
            return <ProductCard key={i} image={image} id={item.id} itemData={item.itemData}/>
          })}
          </div>
        </div>
      })}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await getCatalogItems()
  const { categories, catalogImages } = JSON.parse(res) as ListCategoryResponse
  return {
    props: {
      categories,
      catalogImages
    }
  }
} 