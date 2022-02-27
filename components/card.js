import { motion } from 'framer-motion'
import Button from './button'
import Image from 'next/image'

export default function Card({ text, link, image, height, width, alt }) {
   if ( !image ) {
    return (
        <
            div
            className='m-4 p-8 bg-white rounded-lg drop-shadow-md flex justify-center items-center flex-col w-64'
        >
            <motion.circle className='h-32 w-32 bg-red-500 mb-5 rounded-full'></motion.circle>
            <Button text={text} link={link}/>
        </div>
        // create new button in a div

    )
   } else {
    return (
        <
            div
            className='m-4 p-8 bg-white rounded-lg drop-shadow-md flex justify-center items-center flex-col w-64'
        >
            <motion.circle className='h-32 w-32 mb-5 rounded-full block'>
                <Image src={image} layout='responsive' width={400} height={400} className='rounded-full' alt={alt}/>
            </motion.circle>
            <Button text={text} link={link}/>
        </div>
        // create new button in a div

    )
   }
}
