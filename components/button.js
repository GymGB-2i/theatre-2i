import { motion } from "framer-motion";
import Text from "./text";

export default function Button({ variant, text, onClick, ...props }) {
    if ( variant === 'dark' ) {
        return (
            <
                motion.button
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Text text={text} variant={'button'}/>
            </motion.button>
        );
    } else {
        return (
            <
                motion.button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md"
                onClick={onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Text text={text} variant={'button'}/>
            </motion.button>
        );
    }
}