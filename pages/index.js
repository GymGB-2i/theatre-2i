import Headd from '../components/head.js'
import Header from '../components/header.js'
import Card from '../components/card.js'
import Text from '../components/Text.js'
import Footer from '../components/footer.js'
import Head from 'next/head'
import axios from 'axios'
import { motion } from 'framer-motion'
const qs = require('qs')

const Home = ({ strapiData, error, headerData, footerData }) => {
 return (
    <div className='m-0 bg-white' lang='de'>
      <Head>
                <title>{strapiData.seo.metaTitle}</title>
                <meta name="keywords" content={strapiData.seo.keywords}/>
                <meta name="description" content={strapiData.seo.metaDescription}/>
                <meta name="viewport" content={strapiData.seo.metaViewport}/>
                <meta name="copyright" content={strapiData.seo.copyright}/>
                <meta name="language" content={strapiData.seo.language}/>
                <meta name="author" content={strapiData.seo.author}/>
                <meta name="reply-to" content={strapiData.seo.replyTo}/>
            </Head>
      <Header headerData={headerData}/>
      <motion.div className='py-32' >
        <motion.h1
          className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center owercase font-display-sans mb-16 text-black'
          animate={{ opacity: 1, color: ['#ff6161', '#9bff61', '#61ffb0', '#61fcff', '#61a0ff', '#7361ff', '#fa61ff'], gradientTransform: ['rotate(0deg)', 'rotate(360deg)'] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
        >
          schneewittchen.
        </motion.h1>
        <motion.h1
          className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center owercase font-display-sans mt-16'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          aber anders.
        </motion.h1>
        {/* <   video
            loop
            muted
            className="w-full"
            autoPlay
            playsInline
        >
            <source src='video.mp4' type="video/mp4"/>
        </video> */}
      </motion.div>
      <section className='m-8 flex flex-col justify-evenly items-center'>
        <article className='mb-5'>
          <Text text={strapiData.title} variant={'h1'}/>
        </article>
        <article className='mb-5 max-w-256'>
          <Text text={strapiData.description} variant={'full center'}/>
        </article>
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
