import Text from "./text";

export default function Header({ variant }) {
    return (
        <
            header
                className = "flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full bg-white px-2 py-2 fixed"
        >
            <div className="sm:w-1/4">
                <Text text={'theatre title'} variant={'h1'}/>
            </div>
            <nav className="flex flex-row justify-evenly w-full sm:w-2/4">
                <Text text={'home'} variant={'h1'}/>
                <Text text={'blog'} variant={'h1'}/>
                <Text text={'about'} variant={'h1'}/>
            </nav>
        </header>
    )
}