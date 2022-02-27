import Text from "./text";
import Button from "./button";

export default function Footer( footerData ) {
    if (footerData.footerData) {return (
        <footer className=" bg-neutral-900 flex flex-col sm:flex-row px-6 py-12 mt-24 items-center justify-between h-96 sm:h-auto">
            <nav className='flex flex-col sm:flex-row items-center justify-between h-44'>
            {
                footerData.footerData.navigation.map(nav => (
                    <div className='px-2' key={nav.id}>
                        <Button text={nav.buttonText} link={nav.url} key={nav.id} variant={'dark'}/>
                    </div>
                ))
            }
            </nav>
            <Text text={footerData.footerData.copyright} variant={'wh3'}/>
        </footer>
    )} else {
        return (
            <footer className=" bg-neutral-900 flex flex-col sm:flex-row px-6 py-12 mt-24 items-center justify-between h-96 sm:h-auto">
                <Text variant={'wh3'} text={'something went wrong'}/>
            </footer>
        )
    }
}
