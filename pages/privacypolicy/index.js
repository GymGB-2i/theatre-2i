import axios from "axios";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import Text from "../../components/text.js";

export default function PrivacyPolicy({ headerData, footerData, strapiData }) {
    return (
        <div className="flex flex-col">
            <Header headerData={headerData}/>
            <div className="flex flex-col items-center justify-center">
                <Text text={strapiData.title} variant={'h1'}/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl text-zinc-500 text-center mt-16 px-6 md:px-32 lg:px-64">
                    {strapiData.policy}
                </p>
            </div>
            <div className="sm:h-32"></div>
            <Footer footerData={footerData}/>
            </div>
    );
}

export async function getStaticProps() {
    const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
    const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
    const strapiRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/privacy-policy?populate=*`)
    let headerData = headerRes.data.data.attributes
    let footerData = footerRes.data.data.attributes
    let strapiData = strapiRes.data.data.attributes
    console.log(strapiData)
    return {
        props: {
            headerData,
            footerData,
            strapiData
        }
    }
}