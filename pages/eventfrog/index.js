import Header from "../../components/header"
import axios from "axios"

export default function Eventfrog({ headerData }) {
    return (
        <main>
            <Header headerData={headerData}/>
            <script src="https://embed.eventfrog.ch/api/scripts/embed/overview.js"></script><iframe width="100%" height="100%" src="https://embed.eventfrog.ch/de/events.html?key=866336a0-5740-495b-9467-7e9e955a8359&color=3B82F6&showSearch=true&excludeOrgs=false"></iframe>
        </main>
    )
}

export async function getServerSideProps() {
    const headerRes = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_ADDRESS}/api/header?populate=*`)
    const headerData = headerRes.data.data.attributes
    console.log(headerData)
    return {
        props: {
            headerData
        }
    }
}