import { ReactNode } from "react"

import {
    motion,
    type Variants,
} from "framer-motion";


const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: EASE,
        },
    },
};

export const SectionTitle = ({ children, className }: { children: ReactNode, className: string }) => {


    return (
        <motion.h2
            variants={fadeUp}
            className={` text-[#103245] font-poppins font-bold leading-[1.1] tracking-tight text-xl sm:text-[50px] lg:text-[58px] xl:text-[60px] ${className}`}
        >
            {children}
        </motion.h2>
    )
}

export const Eyebrow = ({ children, className, isRight=false }: { children: ReactNode, className: string, isRight: boolean }) => {
    return (
        <motion.div
            variants={fadeUp}
            className="sm:mb-5 mb-3 flex items-center sm:gap-4 gap-3"
        >
            <span
                className="h-[3px] w-8 shrink-0 sm:w-[52px] bg-[#f9b223]"
            />

            <span
                className={`text-xs font-montserrat font-bold uppercase tracking-[0.04em] sm:text-base lg:text-lg text-[#103245] ${className}`}
            // style={{ color: NAVY }}
            >
                {children}
            </span>

            {
                isRight &&
                <span
                    className="h-[3px] w-[52px] bg-[#f9b223]"
                />
            }
        </motion.div>
    )
}



export const Description = ({ children, className }: { children: ReactNode, className: string }) => {
    return (
        <motion.p
            variants={fadeUp}
            className={`font-poppins leading-[1.9] text-[#526071] sm:text-[17px] text-sm ${className}`}
        >
            {children}
        </motion.p>
    )
}
