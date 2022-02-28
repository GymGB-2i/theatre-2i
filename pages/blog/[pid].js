const qs = require("qs");
import axios from "axios";
import Header from "../../components/header";
import Text from "../../components/text";

function Blog({ strapiData, headerData, footerData }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header headerData={headerData} />
            {
                strapiData.map((item, index) => {
                    return (
                        <div className="flex flex-col items-center justify-center w-full px-4 py-6 pb-8 bg-white sm:flex-row sm:justify-evenly h-1/6" key={index}>
                            <Text text={item.attributes.title} variant={'h1'} />
                            <article>
                                {item.attributes.content}
                            </article>
                        </div>
                    );
                })
            }
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const query = qs.stringify({
            populate: '*'
        })
        const qsQuery = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/blog-entries?populate=*`)
        const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
        const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
        let strapiData = qsQuery.data.data
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

export default Blog