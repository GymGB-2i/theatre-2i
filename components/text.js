import Link from "next/link"

export default function Text({ variant, text, link }) {
    if ( variant === 'h1' ) {
        return (
            <
                h1
                className="text-3xl font-bold text-center text-gray-900 lowercase font-display-sans"
            >
                {text}
            </h1>
        )
    } if ( variant === 'nh1' ) {
        return (
            <
                h1
                className="text-3xl text-center text-gray-900 lowercase font-regular sm:font-bold font-display-sans"
            >
                {text}
            </h1>
        )
    } if ( variant === 'h2' ) {
        return (
            <
                h2
                className="text-2xl font-bold text-center text-gray-900 lowercase font-display-sans"
            >
                {text}
            </h2>
        )
    } if (variant === 'h3' ) {
        return (
            <
                h3
                className="text-xl font-bold text-center text-gray-900 lowercase font-display-sans"
            >
                {text}
            </h3>
        )
    } if ( variant === 'button' ) {
        return (
            <
                p
                className="font-bold text-center text-white lowercase"
            >
                <Link href={link}>
                    <a>{text}</a>
                </Link>
            </p>
        )
    } else {
        return (
            <
                p
                className="text-center text-gray-900 font-text-sans font-medium"
            >
                {text}
            </p>
        )
    }
}
