import {AnimatePresence, motion, AnimateSharedLayout} from 'framer-motion'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import qs from "qs";
import axios from "axios";
import { useState, useEffect } from "react";
import AboutCard from "../../components/about_card";
import Text from '../../components/text';

const About = ({footerData, headerData, strapiData}) => {
    const [selectedId, setSelectedId] = useState(null)

    return (
        <div className='m-0 bg-white'>
            <Header headerData={headerData}/>
            <section className={'relative grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 place-content-center gap-5 mx-5'}>
                {
                    strapiData.person.map((person, index) => {
                        return (
                            <motion.div
                                layoutId={index}
                                className='py-8 px-8 shadow-md rounded-lg'
                                key={index}
                                onClick={() => {setSelectedId(index); console.log(selectedId)}}
                            >
                                <Text text={person.cardTitle}/>
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
                                className='w-screen h-screen grid place-content-center px-5'
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
                                initial={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                className=' bg-white rounded-lg py-4 px-6 shadow-md'
                            >
                                <Text text={strapiData.person[selectedId].cardTitle}/>
                                <Text text={strapiData.person[selectedId].cardDescription}/>
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
