import Headd from '../components/head'
import Header from '../components/header'
import Card from '../components/card'
import Text from '../components/text'
import Footer from '../components/footer'
import Head from 'next/head'
import axios from 'axios'
const qs = require('qs')

const Home = ({ strapiData, error, headerData, footerData }) => {
 return (
    <div className='m-0 bg-white' lang='de'>
      <Headd headData={strapiData.seo}/>
      <Header headerData={headerData}/>
      <section>
        <   video
            loop
            muted
            className="w-full"
            autoPlay
            playsInline
        >
            <source src='video.mp4' type="video/mp4"/>
        </video>
      </section>
      <section className='m-8 flex flex-col justify-evenly'>
        <article className='mb-5'>
          <Text text={strapiData.title} variant={'h1'}/>
        </article>
        <Text text={strapiData.description} variant={'full center'}/>
      </section>
      <article className='flex flex-col sm:flex-row justify-center items-center m-0 max-w-full'>
        {
          strapiData.navigation.map((nav, index) => (<Card
                  text={nav.buttonText}
                  link={nav.url}
                  image={`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}${nav.image.data.attributes.url}`}
                  key={index}
                  width={nav.image.data.attributes.width}
                  height={nav.image.data.attributes.height}
                  alt={nav.image.data.attributes.alternativeText}
              />
          ))
        }
      </article>
      <Footer footerData={footerData}/>
    </div>
  )
// }
}

export async function getStaticProps() {
  try {
    const query = qs.stringify({
      populate: {
        navigation: {
          populate: '*',
        }, seo: {
          populate: '*',
        }
      }
    })
    const qsQuery = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/home?${query}`)
    const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
    const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
    let strapiData = qsQuery.data.data.attributes
    let headerData = headerRes.data.data.attributes
    let footerData = footerRes.data.data.attributes
    return {
      props: {
          strapiData, headerData, footerData
      } }
  } catch ( error ) {
      console.log('error')
    return {
      props: {
          error
      } }
  }
}

export default Home
