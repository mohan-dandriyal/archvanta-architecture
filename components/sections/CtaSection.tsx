


"use client";

import Image from "next/image";
import Link from "next/link";
import { sectionHref } from "../navigation";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

import { CtaData } from "@/types/templates.types";
import Container from "../ui/Container";

const cta = CtaData;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.18,
            delayChildren: 0.15,
        },
    },
};

const fadeUp: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.85,
            ease: EASE,
        },
    },
};

export default function CTASection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id={cta.sectionId}
            className="relative isolate flex min-h-[300px] items-center overflow-hidden bg-[#103245] sm:min-h-[350px] lg:min-h-[400px]"
        >
            {/* BACKGROUND IMAGE */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={cta.backgroundImage}
                    alt={cta.backgroundAlt}
                    fill
                    sizes="100vw"
                    className="object-cover object-[65%_center] lg:object-center"
                />
            </div>

            {/* MOBILE READABILITY OVERLAY */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#052D44]/80 via-[#052D44]/45 to-transparent lg:hidden" />

            <div className="w-full">
                <Container className="">
                    <div className="mx-auto w-full max-w-[1900px] py-16 ">
                        <motion.div
                            variants={containerVariants}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{
                                once: true,
                                amount: 0.3,
                            }}
                            className="max-w-[1050px]"
                        >
                            {/* HEADING */}
                            <motion.h2
                                variants={fadeUp}
                                className="text-[clamp(2rem,7vw,2.6875rem)] font-poppins font-bold leading-[1.12] tracking-tight text-white sm:text-[44px] lg:text-[72px] xl:text-[80px]"
                            >
                                <span className="block">
                                    {cta.heading.line1}
                                </span>

                                <span className="block">
                                    {cta.heading.line2}{" "}
                                    <span className="text-[#FFBF00]">
                                        {cta.heading.highlight}
                                    </span>
                                </span>
                            </motion.h2>

                            {/* CTA BUTTON */}
                            <motion.div
                                variants={fadeUp}
                                className="mt-9 sm:mt-12"
                            >
                                <Link
                                    href={sectionHref(cta.button.href)}
                                    className="group inline-flex font-montserrat min-h-[68px] items-center justify-center gap-5 rounded-[25px] bg-[#FFBF00] px-9 text-[22px] font-bold text-[#103245] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFD044] hover:shadow-xl sm:min-h-[80px] sm:px-10 sm:text-[28px]"
                                >
                                    {cta.button.text}

                                    <ArrowRight
                                        size={34}
                                        strokeWidth={2.8}
                                        className="transition-transform duration-300 group-hover:translate-x-2"
                                    />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </div>
        </section>
    );
}
