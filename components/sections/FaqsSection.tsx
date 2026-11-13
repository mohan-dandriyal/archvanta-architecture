
"use client";

import { useState } from "react";
import Image from "next/image";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import {
    Building2,
    Plus,
    Minus,
} from "lucide-react";

import { FaqsData } from "@/types/templates.types";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionHeader";
import Container from "../ui/Container";

const faq = FaqsData;

export default function FAQSection() {
    const [active, setActive] = useState<number | null>(
        faq.items[0]?.id ?? null
    );

    const reduceMotion = useReducedMotion();

    return (
        <section
            id="faq"
            className="overflow-hidden bg-white pb-16 sm:pb-20"
        >
            <Container className="">

                {/* SECTION HEADER */}
                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className=""
                >
                    <div className="section-header flex flex-col items-center text-center mb-10 ">
                        {/* EYEBROW */}
                        <Eyebrow className="" isRight={true}>
                            {faq.eyebrow}
                        </Eyebrow>

                        {/* HEADING */}
                        <SectionTitle className="" >
                            {faq.heading.normal} {" "}
                            <span style={{ color: '#D69A32' }}>
                                {faq.heading.highlight}
                            </span>
                        </SectionTitle>

                        {/* DESCRIPTION */}
                        <div className="space-y-6 mt-3">
                            <Description className="max-w-[760px]">
                                {faq.description}
                            </Description>
                        </div>

                    </div>
                </motion.div>

                <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">

                    {/* LEFT IMAGE */}
                    <motion.div
                        initial={
                            reduceMotion ? false : { opacity: 0, x: -50 }
                        }
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative mx-auto w-full max-w-[480px]"
                    >
                        <div
                            className="absolute inset-0 translate-x-3 translate-y-2 rounded-2xl bg-[#E5A11F]"
                            style={{
                                clipPath: "polygon(0 0,90% 0,100% 10%,88% 100%,0 100%)"
                            }}
                        />

                        <div
                            className="relative h-[460px] overflow-hidden rounded-2xl sm:h-[540px]"
                            style={{
                                clipPath: "polygon(0 0,88% 0,100% 12%,87% 100%,0 100%)"
                            }}
                        >
                            <Image
                                src={faq.image}
                                alt={faq.imageAlt}
                                fill
                                sizes="(max-width: 1024px) 100vw, 40vw"
                                className="object-cover object-center"
                            />
                        </div>

                        {/* NAVY CAPTION */}
                        <div className="absolute bottom-0 left-0 z-10 w-[65%] rounded-bl-2xl bg-[#103245] p-5 text-white shadow-lg sm:p-7">
                            <Building2
                                size={35}
                                strokeWidth={1.5}
                                className="mb-3"
                            />

                            <p className="max-w-[220px] font-montserrat text-lg font-semibold leading-tight">
                                {faq.imageCaption}
                            </p>

                            <span className="mt-4 block h-[3px] w-14 bg-[#E5A11F]" />
                        </div>
                    </motion.div>

                    {/* FAQ ACCORDION */}
                    <div className="space-y-4">
                        {faq.items.map((item, index) => {
                            const isOpen = active === item.id;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={
                                        reduceMotion ? false : { opacity: 0, y: 25 }
                                    }
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.55,
                                        delay: index * 0.08
                                    }}
                                    className="overflow-hidden rounded-xl border border-[#DCE3E9] bg-white shadow-[0_5px_15px_rgba(0,0,0,0.07)]"
                                >
                                    <button
                                        type="button"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-panel-${item.id}`}
                                        onClick={() =>
                                            setActive(isOpen ? null : item.id)
                                        }
                                        className={`flex w-full font-poppins items-center gap-2 px-3 py-4 sm:gap-4 text-left transition-colors sm:px-6 ${isOpen
                                            ? "bg-[#103245] text-white"
                                            : "bg-white text-[#172235] hover:bg-[#F5F7F9]"
                                            }`}
                                    >
                                        <span
                                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold ${isOpen
                                                ? "border-white bg-white text-[#D99517]"
                                                : "border-[#D99517] text-[#D99517]"
                                                }`}
                                        >
                                            Q
                                        </span>

                                        <span className="flex-1 text-base font-semibold sm:text-lg">
                                            {item.question}
                                        </span>

                                        {isOpen ? (
                                            <Minus size={23} className="shrink-0" />
                                        ) : (
                                            <Plus
                                                size={23}
                                                className="shrink-0 text-[#D99517]"
                                            />
                                        )}
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`faq-panel-${item.id}`}
                                                role="region"
                                                aria-labelledby={`faq-trigger-${item.id}`}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{
                                                    duration: reduceMotion ? 0 : 0.3
                                                }}
                                                className="overflow-hidden"
                                            >
                                                <p className="px-6 font-poppins py-5 text-sm sm:text-[15px] leading-relaxed text-[#526071] sm:pl-16">
                                                    {item.answer}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
