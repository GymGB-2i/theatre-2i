import { motion } from "framer-motion";
import Link from "next/link";
import Text from "./text";

export default function Button({ variant, text, link, onClick }) {
    if ( variant === 'dark' ) {
        return (
            <Link href={link} passHref>
                <
                    motion.button
                    className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-md"
                    onClick={onClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Text text={text} variant={'button'} link={link}/>
                </motion.button>
            </Link>
        );
    } else {
        return (
            <Link href={link} passHref>
                <
                    motion.button
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md"
                    onClick={onClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Text text={text} variant={'button'} link={link}/>
                </motion.button>
            </Link>
        );
    }
}
