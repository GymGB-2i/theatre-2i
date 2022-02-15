import Header from '../components/header'
import Card from '../components/card'
import Text from '../components/text'
import Footer from '../components/footer'
import Head from 'next/head'
import axios from 'axios'
const qs = require('qs')

const Home = ({ strapiData, error, headerData, footerData }) => {
  if ( error ) {
    return (
      <div lang='de'>
        <Head>
          <title>Error</title>
          <meta name='author' content='Jonathan Bittner'></meta>
        </Head>
        <Header/>
        <section className='mt-24 h-64 flex flex-col justify-evenly'>
          <Text text={'Something went wrong :('} variant={'h1'}/>
          <Text text={'code: ' + error.code} variant={'h3'}/>
        </section>
      </div>
    )
  }
  else {return (
    <div className='m-0' lang='de'> 
      <Head>
        <title>{strapiData.seo.metaTitle}</title>
        <meta name='keywords' content={strapiData.seo.keywords}></meta>
        <meta name='author' content='Jonathan Bittner'></meta>
        <meta name='description' content={strapiData.seo.metaDescription}></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
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
        <Text text={strapiData.description} variant={'h'}/>
      </section>
      <article className='flex flex-col sm:flex-row justify-center items-center m-0 max-w-full'>
        {
          strapiData.navigation.map(nav => (
            <Card
              text={nav.buttonText}
              link={nav.url}
              image={`${process.env.STRAPI_ADDRESS}${nav.image.data.attributes.url}`}
              key={nav.image.data.attributes.id}
              width={nav.image.data.attributes.width}
              height={nav.image.data.attributes.height}
              alt={nav.image.data.attributes.alternativeText}
            />
          ))
        }
      </article>
      <Footer footerData={footerData}/>
    </div>
  )}
}

Home.getInitialProps = async ctx => {
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
    const qsQuery = await axios.get(`${process.env.STRAPI_ADDRESS}/api/home?${query}`)
    // const bodyRes = await axios.get(`http://20.203.179.186:1337/api/home?populate=*`)
    const headerRes = await axios.get(`${process.env.STRAPI_ADDRESS}/api/header?populate=*`)
    // const imageRes = await axios.get('http://20.203.179.186:1337/api/home?populate=navigation')
    // console.log(res.data.data.attributes)
    const footerRes = await axios.get(`${process.env.STRAPI_ADDRESS}/api/footer?populate=*`)
    let strapiData = qsQuery.data.data.attributes
    let headerData = headerRes.data.data.attributes
    let footerData = footerRes.data.data.attributes
    return { strapiData, headerData, footerData }
  } catch ( error ) {
    return { error }
  }
}

export default Home
