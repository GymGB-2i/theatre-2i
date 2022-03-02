import {AnimatePresence, motion, AnimateSharedLayout} from 'framer-motion'
import Header from '../../components/header.js';
import Footer from '../../components/footer.js';
import Image from 'next/image'
import qs from "qs";
import axios from "axios";
import { useState, useEffect } from "react";
import AboutCard from "../../components/about_card.js";
import Text from '../../components/text.js';
import Head from 'next/head';

const About = ({footerData, headerData, strapiData}) => {
    const [selectedId, setSelectedId] = useState(null)

    return (
        <div className='m-0 bg-white'>
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
                <Text text='Aufführungen des Theaters' variant='h3'/>
            <section className='flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-16 mt-4 sm:mt-16'>
                <Text text={strapiData.auffuehrung}/>
                <Text text={strapiData.auffuehrung2}/>
            </section>
            <section className={'relative grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 place-content-center gap-5 mx-5'}>
                {
                    strapiData.person.map((person, index) => {
                        console.log(person.altImage.data.attributes)
                        return (
                            <motion.div
                                layoutId={index}
                                className='py-8 px-8 shadow-md rounded-lg'
                                key={index}
                                onClick={() => {setSelectedId(index)}}
                            >
                                <Image
                                    src={process.env.NEXT_PUBLIC_STRAPI_ADDRESS + person.normalImage.data.attributes.url}
                                    layout='responsive'
                                    width={person.normalImage.data.attributes.width}
                                    height={person.normalImage.data.attributes.height}
                                    alt={person.normalImage.data.attributes.alternativeText}
                                />
                                <Text text={person.cardTitle} variant='h2'/>
                            </motion.div>
                        )
                    })
                }
                
            </section>
            <div className='fixed top-0 left-0'>
                    <AnimatePresence>
                        {
                            selectedId != null &&   
                            <motion.div
                                className='w-screen h-screen grid place-content-center px-5 sm:py-16'
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                style={{ background: 'rgba(0,0,0,0.5)' }}
                                onClick={() => setSelectedId(null)}
                            >
                                <motion.div
                                layoutId={selectedId}
                                initial={{opacity: 0}}
                                animate={{ opacity: [ 0.0, 0.1, 0.4, 0.7, 1.01] }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                exit={{ opacity: 0 }}
                                onClick={() => console.log(selectedId)}
                                className=' bg-white rounded-lg py-6 px-6 shadow-md flex flex-col justify-between items-center gap-0 max-h-320'
                            >
                                <div className='m-0 aspect-[2/3]'>    
                                <Image
                                    src={process.env.NEXT_PUBLIC_STRAPI_ADDRESS + strapiData.person[selectedId].altImage.data.attributes.url}
                                    className='aspect-[2/3]'
                                    alt={strapiData.person[selectedId].altImage.data.attributes.alternativeText}
                                    layout='intrinsic'
                                    height={600}
                                    width={400}
                                />
                                </div>
                                <Text text={strapiData.person[selectedId].cardTitle} variant='h2'/>
                                <Text text={strapiData.person[selectedId].cardDescription} variant='full center'/>
                            </motion.div>
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
            <Footer footerData={footerData}/>
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const query = qs.stringify({
            populate: {
                person: {
                    populate: '*',
                }, seo: {
                    populate: '*',
                }
            }
        })
        const qsQuery = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/about?${query}`)
        const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
        const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
        let strapiData = qsQuery.data.data.attributes
        let headerData = headerRes.data.data.attributes
        let footerData = footerRes.data.data.attributes
        return {
            props: {
                strapiData, headerData, footerData
            }
        }
    } catch(error) {
        console.log(error)
        return {
            props: {
                error
            }}}
}

export default About
