import { useRouter } from 'next/router'
import qs from "qs";
import axios from "axios";
import Header from "../../components/header";
import Footer from "../../components/footer";
import {useState, useEffect} from "react";

const Post = async ({headerData, strapiData, footerData, blogData}) => {

    const router = useRouter()
    const {pid} = router.query

    const blogQuery = qs.stringify({
        filters: {
            id: {
                $eq: pid
            }
        }
    })

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        fetch(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/blog-entries?${blogQuery}`)
            .then((res) => {
                console.log(res);
                res.json()
            })
            .then((data) => {
                setData(data);
                setIsLoading(false);
                console.log(data)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No data</p>

    return (
        <div>
            <p>hi</p>
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
            filters: {
                id: {
                    $eq: 4
                }
            }
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

export default Post