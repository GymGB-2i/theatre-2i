import axios from "axios";
import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import Text from "../../components/text.js";

export default function PrivacyPolicy({ headerData, footerData }) {
    return (
        <div className="flex flex-col">
            <Header headerData={headerData}/>
            <div className="flex flex-col items-center justify-center">
                <Text text={'Privacy Policy'} variant={'h1'}/>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl text-zinc-500 text-center mt-16">
                    Wir sammeln keine personenbezogenen Daten.<br/>
                    Wir verwenden keine Cookies, um die Nutzung unserer Website zu verbessern.<br/>
                    Als kleines Theaterprojekt freuen wir uns zwar auf Besucherinnen und Besucher auf unserer Webseite,<br/>
                    und sind uns bewusst, dass wir keine persönlichen Daten brauchen.<br/>
                    Wir freuen uns auf Ihre Anfragen und werden uns darum kümmern.<br/>
                </p>
            </div>
            <div className="sm:h-96"></div>
            <div className="sm:h-96"></div>
            <Footer footerData={footerData}/>
            </div>
    );
}

export async function getStaticProps() {
    const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
    const footerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/footer?populate=*`)
    let headerData = headerRes.data.data.attributes
    let footerData = footerRes.data.data.attributes
    return {
        props: {
            headerData,
            footerData
        }
    }
}