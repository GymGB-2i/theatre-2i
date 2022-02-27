import Footer from '../../components/footer'
import Headd from '../../components/head'
import Header from "../../components/header.js";
const qs = require('qs')
import axios from 'axios'
import Text from '../../components/text.js'
import BlogCard from "../../components/blog_card";

const Home = ({ strapiData, error, headerData, footerData, blogData }) => {
    return (
        <div className='m-0 flex flex-col bg-white' lang='de'>
          <Headd headData={strapiData.seo}/>
          <Header headerData={headerData}/>
          <article className={'mx-4 p-5 rounded-lg drop-shadow-md bg-white'}>
            <Text text={strapiData.title} variant={'full text'}/>
          </article>
          <section className={'grid grid-cols-1 md:grid-cols-2 grid-flow-column'}>
            {
              blogData.map((blog) => {
                return (<BlogCard key={blog.id}
                                  teaser={blog.attributes.teaserText}
                                  title={blog.attributes.title}
                                  image={process.env.NEXT_PUBLIC_STRAPI_ADDRESS + blog.attributes.image.data.attributes.url}
                                  iHeight={blog.attributes.image.data.attributes.height}
                                  iWidth={blog.attributes.image.data.attributes.width}
                />)
              })
            }
          </section>
          <Footer footerData={footerData}/>
        </div>
    )
}

export async function getServerSideProps() {
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
      const blogQuery = qs.stringify({
        populate: '*',
      })
    const qsQuery = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/blog?${query}`)
    const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
    const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
    const blogRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/blog-entries?${blogQuery}`)
    let strapiData = qsQuery.data.data.attributes
    let headerData = headerRes.data.data.attributes
    let footerData = footerRes.data.data.attributes
    let blogData = blogRes.data.data
    return {
      props: {
        strapiData, headerData, footerData, blogData
      }
    }
  } catch(error) {
    console.log(error)
    return {
    props: {
      error
    }}}
}

export default Home
