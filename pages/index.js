import Header from '../components/header'
import Card from '../components/card'

export default function Home() {
  return (
    <div className='m-0'>  
      <Header/>
      <section>
      <     video
            loop
            muted
            className="bg-cover w-full h-full"
            autoPlay
        >
            <source src='video.mp4' type="video/mp4"/>
        </video>
      </section>
      <article className='flex flex-col sm:flex-row justify-between px-16 mt-8 sm:mt-24'>
        <Card text={'open blabla'}/>
        <Card text={'open blabla'}/>
        <Card text={'open blabla'}/>
      </article>
    </div>
  )
}
