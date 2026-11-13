
"use client";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    Award,
    UsersRound,
    Building2,
    type LucideIcon,
} from "lucide-react";

import { AboutData } from "@/types/templates.types";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionHeader";
import Container from "../ui/Container";

const about = AboutData;

const NAVY = "#103245";
const GOLD = "#D69A32";

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// ICON MAPPING
// ========================================

const iconMap: Record<string, LucideIcon> = {
    award: Award,
    users: UsersRound,
    building: Building2,
};

// ========================================
// ANIMATION VARIANTS
// ========================================

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.1,
        },
    },
};


const imageVariants: Variants = {
    hidden: {
        opacity: 0,
        x: 70,
        scale: 1.06,
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 1.1,
            ease: EASE,
        },
    },
};

const featureContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.25,
        },
    },
};

const featureItem: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: EASE,
        },
    },
};

// ========================================
// ABOUT SECTION
// ========================================

export default function AboutSection() {
    const reduceMotion = useReducedMotion();

    const motionProps = {
        initial: reduceMotion ? false : ("hidden" as const),
        whileInView: "visible" as const,
        viewport: {
            once: true,
            amount: 0.2,
        },
    };

    return (
        <section
            id="about"
            className="relative overflow-hidden bg-white py-16 lg:py-20"
        >
            <Container className="">
                <div className="grid items-center gap-5 lg:grid-cols-2 lg:gap-12 xl:gap-20">

                    {/* =====================================
              LEFT CONTENT
          ===================================== */}

                    <motion.div
                        variants={containerVariants}
                        {...motionProps}
                        className="order-2 lg:order-1"
                    >
                        {/* EYEBROW */}
                        <Eyebrow className="" isRight={false}>
                            {about.eyebrow}
                        </Eyebrow>

                        {/* HEADING */}
                        <SectionTitle className="" >
                            {about.heading.normal}{" "}
                            <span style={{ color: GOLD }}>
                                {about.heading.highlight}
                            </span>
                        </SectionTitle>

                        {/* DESCRIPTION */}
                        <div className="sm:mt-8 mt-3 space-y-6 lg:mt-10">
                            {about.paragraphs.map((paragraph, index) => (
                                <Description key={index + 1} className="max-w-[760px]">
                                    {paragraph}
                                </Description>

                            ))}
                        </div>

                        {/* =====================================
                            FEATURES
                        ===================================== */}

                        <motion.div
                            variants={featureContainer}
                            className="mt-12 grid grid-cols-3 sm:mt-14 lg:mt-16"
                        >
                            {about.features.map((feature, index) => {
                                const Icon =
                                    iconMap[feature.icon] ?? Building2;

                                return (
                                    <motion.div
                                        key={feature.id}
                                        variants={featureItem}
                                        className={`group flex min-w-0 flex-col items-center px-2 text-center sm:px-4 ${index !== 0
                                            ? "border-l border-[#D69A32]/70"
                                            : ""
                                            }`}
                                    >
                                        {/* ICON */}
                                        <motion.div
                                            whileHover={
                                                reduceMotion
                                                    ? undefined
                                                    : {
                                                        y: -6,
                                                        scale: 1.08,
                                                    }
                                            }
                                            transition={{
                                                duration: 0.3,
                                                ease: EASE,
                                            }}
                                            className="mb-4"
                                        >
                                            <Icon
                                                size={48}
                                                strokeWidth={1.6}
                                                color={GOLD}
                                                className="h-9 w-9 sm:h-12 sm:w-12 lg:h-12 lg:w-12"
                                            />
                                        </motion.div>

                                        {/* FEATURE TITLE */}
                                        <h3
                                            className="text-[13px] font-montserrat font-semibold leading-[1.3] sm:text-base lg:text-lg"
                                            style={{ color: NAVY }}
                                        >
                                            {feature.title}
                                            <span className="block">
                                                {feature.subtitle}
                                            </span>
                                        </h3>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* =====================================
                        RIGHT IMAGE
                    ===================================== */}

                    <motion.div
                        {...motionProps}
                        variants={imageVariants}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative mx-auto w-full max-w-[850px] px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-8 lg:px-8 lg:pb-8">

                            {/* TOP LEFT NAVY CORNER */}
                            <motion.div
                                initial={
                                    reduceMotion
                                        ? false
                                        : { scale: 0.7, opacity: 0 }
                                }
                                whileInView={{
                                    scale: 1,
                                    opacity: 1,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3,
                                }}
                                className="absolute left-0 top-0 h-[38%] w-[28%]"
                                style={{
                                    backgroundColor: NAVY,
                                }}
                            />

                            {/* BOTTOM RIGHT GOLD CORNER */}
                            <div
                                className="absolute bottom-0 right-0 h-[30%] w-[34%]"
                                style={{
                                    borderRight: `4px solid ${GOLD}`,
                                    borderBottom: `4px solid ${GOLD}`,
                                }}
                            />

                            {/* MAIN IMAGE */}
                            <div className="group relative z-10 aspect-[1.45/1] w-full overflow-hidden bg-[#E8EDF0]">
                                <Image
                                    src={about.image.src}
                                    alt={about.image.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* SUBTLE IMAGE OVERLAY */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
