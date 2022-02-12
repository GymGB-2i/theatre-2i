import Header from '../components/header'
import Card from '../components/card'
import Text from '../components/text'
import axios from 'axios'
const qs = require('qs')

const Home = ({ strapiData }) => {
  return (
    <div className='m-0'>  
      <Header/>
      <section>
      <     video
            loop
            muted
            className="bg-cover w-full"
            autoPlay
        >
            <source src='video.mp4' type="video/mp4"/>
        </video>
      </section>
      <article className='m-8'>
        <Text text={strapiData.teasertext} variant={'h1'}/>
        <Text text={strapiData.description} variant={'h'}/>
      </article>
      <article className='flex flex-row justify-center m-0'>
        <div className='flex flex-col sm:flex-row justify-between pb-16 sm:mt-16 md:max-w-4xl'>
          <Card text={strapiData.blog.buttonText} link={''}/>
          <Card text={strapiData.eventfrog.buttonText} link={''}/>
          <Card text={strapiData.instagram.buttonText} link={strapiData.instagram.url}/>
        </div>
      </article>
    </div>
  )
}

Home.getInitialProps = async ctx => {
  try {
    const res = await axios.get(`http://192.168.178.149:1337/api/home?populate=*`)
    console.log(res.data)
    let strapiData = res.data.data.attributes
    return { strapiData }
  } catch ( error ) {
    return { error }
  }
}

export default Home