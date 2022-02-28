import Header from "../components/header.js";
import Footer from "../components/footer.js";
import axios from "axios";
import Head from "next/head";
const qs = require('qs')
import Text from "../components/Text.js";

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
    } else {
        return (
            <div className='m-0 h-screen flex flex-col justify-center' lang='de'>
                <Head>
                    <title>Impressum | Imprint</title>
                    <meta name='keywords' content='Imprint'></meta>
                    <meta name='author' content='Jonathan Bittner'></meta>
                    <meta name='description' content='Imprint'></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                </Head>
                <div className='absolute top-0 w-screen'>
                    <Header headerData={headerData}/>
                </div>
                <article className='flex flex-col items-center'>
                    <section className='flex flex-col items-start'>
                        <Text text={strapiData.name}/>
                        <Text text={strapiData.address}/>
                        <Text text={strapiData.region}/>
                        <Text text={strapiData.phoneNumber}/>
                        <Text text={strapiData.email}/>
                    </section>
                </article>
                <div className='absolute w-screen bottom-0'>
                    <Footer footerData={footerData}/>
                </div>
            </div>
        )
    }
}

export async function getStaticProps() {
    try {
      const qsQuery = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/imprint?populate=*`)
      const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
      const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
      let strapiData = qsQuery.data.data.attributes
      console.log(strapiData)
      let headerData = headerRes.data.data.attributes
      let footerData = footerRes.data.data.attributes
      return {
        props: {
            strapiData, headerData, footerData
        } }
    } catch ( error ) {
        console.log(error)
      return {
        props: {
            error
        } }
    }
  }
  
  export default Home
  