import Text from './text.js'
import Button from './button'
import Image from 'next/image'

const BlogCard = ({ teaser, title, link, image, iHeight, iWidth }) => {
  console.log(iHeight)
  console.log(iWidth)
  if (false) {
    return (
       <
        div
        className='m-4 p-8 bg-white rounded-lg drop-shadow-md flex justify-center items-center flex-col w-64'
      >

      </div>
    )
  } else {
    return (
      <
        div
        className='m-4 bg-white rounded-lg drop-shadow-md flex justify-center items-start flex-col overflow-hidden'
      >
        <div className='h-auto w-full bg-red-500'>
          <Image src={image} width={iWidth} height={iHeight} layout='responsive' className='max-h-12'/>
        </div>
        <div className='p-8 flex flex-col gap-5 items-start'>
          <Text text={title} variant={'h3'}/>
          <Text text={teaser} variant={'full text'}/>
        </div>
        <div className={'pl-8 pb-8'}>
          <Button text={'Read More'} link={''}/>
        </div>
      </div>
    )
  }
}

export default BlogCard