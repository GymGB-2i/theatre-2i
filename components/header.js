import Text from "./text.js";
import Link from "next/link"
// import { GetServerSideProps } from "next";
import axios from 'axios'

const Header = ({ headerData }) => {
    if ( headerData ) {
    return (
        <
            header
      className = "flex flex-col items-center justify-between w-full px-4 py-6 bg-white sm:flex-row sm:justify-between h-1/6 sm:h-20 md:h-24 lg:h-28 static"
        >
            <div className="ml-3">
                <Link href='/' passHref>
                    <a>
                        <Text text={headerData.title} variant={'h1'}/>
                    </a>
                </Link>
            </div>
            <nav className="flex flex-row w-full sm:w-2/4 mt-3 sm:mt-0 justify-center sm:justify-end gap-x-2">
                {
                headerData.navigationItems.map(nav => (
                    <Link href={nav.url} key={nav.url}>
                        <a className="text-gray-800 hover:text-gray-900 ml-3">
                            <Text text={nav.buttonText} variant={'nh1'}/>
                        </a>
                    </Link>
                ))}
            </nav>
        </header>
    )
    } else {
        return (
            <
            header
            className = "flex flex-row items-center justify-center w-full px-4 py-6 pb-8 bg-white sm:flex-row sm:justify-evenly h-1/6"
            >
            <Text text={'theatre title'} variant={'h1'}/>
            </header>
        )
    }
}

Header.getInitialProps = async ctx => {
    console.log('getInitialProps' + ctx)
    try {
        const res = await axios.get('http://20.203.179.186:1337/api/header?populate=*')
        console.log('response'+res)
        const strapiData = res.data
        return {
            props: {
                strapiData
            }
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export default Header
