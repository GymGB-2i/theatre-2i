import Text from "./text";
import Link from "next/link"

export default function Header({ variant }) {
    return (
        <
            header
      className = "flex flex-col items-center justify-between w-full px-2 py-4 pb-8 bg-white sm:flex-row sm:justify-between h-1/6"
        >
            <div className="sm:w-1/4">
                <Text text={'theatre title'} variant={'h1'}/>
            </div>
            <nav className="flex flex-row w-full justify-evenly sm:w-2/4">
                <Link href={''} passHref>
                    <Text text={'home'} variant={'nh1'}/>
                </Link>
                <Link href={''} passHref>
                    <Text text={'blog'} variant={'nh1'}/>
                </Link>
                <Link href={''} passHref>
                    <Text text={'about'} variant={'nh1'}/>
                </Link>

            </nav>
        </header>
    )
}
