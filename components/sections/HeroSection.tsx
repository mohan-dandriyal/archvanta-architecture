
"use client";

import { useState } from "react";
import Image from "next/image";
import {
    motion,
    AnimatePresence,
    useReducedMotion,
    type Variants,
} from "framer-motion";
import {
    HardHat,
    Award,
    Building2,
    ChevronLeft,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import {
    Autoplay,
    EffectFade,
    Pagination,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import { HeroData } from "@/types/templates.types";
import Container from "../ui/Container";
const hero = HeroData;
const GOLD = "#E5AD49";


const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
    "hard-hat": HardHat,
    award: Award,
    building: Building2,
};

// ==========================================
// ANIMATION VARIANTS
// ==========================================

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.16,
            delayChildren: 0.3,
        },
    },
};

const eyebrowVariants: Variants = {
    hidden: {
        opacity: 0,
        x: -45,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.75,
            ease: EASE,
        },
    },
};

const headingVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 85,
        rotateX: 8,
    },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 1,
            ease: EASE,
        },
    },
};

const descriptionVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 35,
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

const featureContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.13,
        },
    },
};

const featureVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 45,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.75,
            ease: EASE,
        },
    },
};

// ==========================================
// HERO SECTION
// ==========================================

export default function HeroSection() {
    const [swiper, setSwiper] =
        useState<SwiperType | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    const reduceMotion = useReducedMotion();

    const slideDuration = hero.autoplayDelay || 6000;

    return (
        <section
            id="home"
            aria-label="ArchVanta Architecture Hero"
            className="relative w-full overflow-hidden bg-[#103245]"
        >
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                speed={reduceMotion ? 0 : 1200}
                loop={hero.slides.length > 1}
                allowTouchMove
                autoplay={
                    reduceMotion
                        ? false
                        : {
                            delay: slideDuration,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }
                }
                onSwiper={setSwiper}
                onRealIndexChange={(instance) => {
                    setActiveIndex(instance.realIndex);
                }}
                className="archvanta-hero"
            >
                {hero.slides.map((slide, index) => {
                    const isActive = activeIndex === index;

                    return (
                        <SwiperSlide key={slide.id}>
                            <div className="relative flex min-h-[640px] sm:min-h-[720px] lg:min-h-[800px] items-center overflow-hidden ">

                                {/* ==================================
                                        ANIMATED BACKGROUND
                                    ================================== */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={false}
                                        animate={
                                            isActive && !reduceMotion
                                                ? {
                                                    scale: [1.08, 1],
                                                    x: ["2%", "0%"],
                                                }
                                                : {
                                                    scale: 1.08,
                                                    x: "2%",
                                                }
                                        }
                                        transition={{
                                            duration: slideDuration / 1000,
                                            ease: "linear",
                                        }}
                                    >
                                        <Image
                                            src={slide.image}
                                            alt={slide.imageAlt}
                                            fill
                                            priority={index === 0}
                                            sizes="100vw"
                                            className="object-cover object-[65%_center] lg:object-center"
                                        />
                                    </motion.div>
                                </div>

                                {/* DESKTOP GRADIENT */}
                                <div
                                    className="absolute inset-0 hidden lg:block"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, rgba(3,42,59,0.99) 0%, rgba(3,42,59,0.96) 19%, rgba(3,42,59,0.84) 32%, rgba(3,42,59,0.35) 48%, transparent 70%)",
                                    }}
                                />

                                {/* MOBILE GRADIENT */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#052B3D] via-[#052B3D]/80 to-[#052B3D]/25 lg:hidden" />

                                {/* ==================================
                                        ANIMATED CONTENT
                                    ================================== */}
                                <div className="w-full py-20 sm:py-24">
                                    <Container className="">
                                        <div className="relative z-10 mx-auto w-full sm:px-14 lg:px-16 ">

                                            <AnimatePresence mode="wait">
                                                {isActive && (
                                                    <motion.div
                                                        key={slide.id}
                                                        variants={containerVariants}
                                                        initial={reduceMotion ? false : "hidden"}
                                                        animate="visible"
                                                        exit={{
                                                            opacity: 0,
                                                            y: -20,
                                                            transition: {
                                                                duration: 0.25,
                                                            },
                                                        }}
                                                        className="max-w-[780px] text-white"
                                                    >

                                                        {/* EYEBROW */}
                                                        <motion.div
                                                            variants={eyebrowVariants}
                                                            className="mb-7 flex items-center gap-3"
                                                        >
                                                            <motion.span
                                                                initial={reduceMotion ? false : { width: 0 }}
                                                                animate={{ width: 36 }}
                                                                transition={{
                                                                    duration: 0.7,
                                                                    delay: 0.3,
                                                                }}
                                                                className="h-[3px] shrink-0 bg-[#E5AD49]"
                                                            />

                                                            <span className="text-xs font-medium font-montserrat uppercase tracking-[0.08em] sm:text-lg">
                                                                {slide.eyebrow}
                                                            </span>
                                                        </motion.div>

                                                        {/* HEADING */}
                                                        <div className="overflow-hidden">
                                                            <motion.h1
                                                                variants={headingVariants}
                                                                className=" font-poppins font-semibold leading-[1.13] tracking-tight text-[clamp(2rem,8vw,2.375rem)] sm:text-[50px] lg:text-[60px] xl:text-[76px]"
                                                            >
                                                                {slide.title}
                                                                <motion.div
                                                                    variants={headingVariants}
                                                                    className="block text-[clamp(2rem,8vw,2.375rem)] font-bold leading-[1.15] tracking-tight text-[#E5AD49] sm:text-[50px] lg:text-[60px] xl:text-[66px]"
                                                                >
                                                                    {slide.highlight}
                                                                </motion.div>
                                                            </motion.h1>
                                                        </div>


                                                        {/* DESCRIPTION */}
                                                        <motion.p
                                                            variants={descriptionVariants}
                                                            className="mt-7 font-poppins max-w-[570px] text-[14px] leading-[1.8] text-white/90 sm:text-lg"
                                                        >
                                                            {slide.description}
                                                        </motion.p>

                                                        {/* FEATURE ICONS */}
                                                        <motion.div
                                                            variants={featureContainerVariants}
                                                            className="mt-14 flex max-w-[600px] items-start sm:mt-20 lg:mt-28"
                                                        >
                                                            {slide.features.map((feature, featureIndex) => {
                                                                const Icon =
                                                                    iconMap[feature.icon] ?? Building2;

                                                                return (
                                                                    <motion.div
                                                                        key={`${slide.id}-${featureIndex}`}
                                                                        variants={featureVariants}
                                                                        className={`flex min-w-0 flex-1 flex-col items-center px-2 ${featureIndex !== 0
                                                                            ? "border-l border-[#E5AD49]/70"
                                                                            : ""
                                                                            }`}
                                                                    >
                                                                        <motion.div
                                                                            whileHover={
                                                                                reduceMotion
                                                                                    ? undefined
                                                                                    : {
                                                                                        scale: 1.15,
                                                                                        y: -5,
                                                                                    }
                                                                            }
                                                                            transition={{
                                                                                duration: 0.3,
                                                                            }}
                                                                        >
                                                                            <Icon
                                                                                size={45}
                                                                                strokeWidth={1.7}
                                                                                color={GOLD}
                                                                            />
                                                                        </motion.div>

                                                                        <span className="mt-3 font-montserrat max-w-[200px] text-xs font-medium leading-snug sm:text-base">
                                                                            {feature.label}
                                                                        </span>
                                                                    </motion.div>
                                                                );
                                                            })}
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </Container>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>


            {/* ==================================
                    NAVIGATION ARROWS
                ================================== */}
            <button
                type="button"
                aria-label="Previous slide"
                onClick={() => swiper?.slidePrev()}
                className="group absolute cursor-pointer left-0 bottom-5 z-20 flex sm:bottom-auto sm:top-1/2 h-[65px] w-[42px] sm:-translate-y-1/2 items-center justify-center bg-[#001E2B]/65 text-white transition-colors duration-300 hover:bg-[#E5AD49] sm:h-[90px] sm:w-[55px]"
            >
                <ChevronLeft
                    size={30}
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                />
            </button>

            <button
                type="button"
                aria-label="Next slide"
                onClick={() => swiper?.slideNext()}
                className="group absolute cursor-pointer  right-0 bottom-5 z-20 flex sm:bottom-auto sm:top-1/2 h-[65px] w-[42px] sm:-translate-y-1/2 items-center justify-center bg-[#001E2B]/65 text-white transition-colors duration-300 hover:bg-[#E5AD49] sm:h-[90px] sm:w-[55px]"
            >
                <ChevronRight
                    size={30}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </button>

            {/* ==================================
                    PAGINATION
                ================================== */}
            <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
                {hero.slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        type="button"
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={activeIndex === index ? "true" : undefined}
                        onClick={() => swiper?.slideToLoop(index)}
                        className={`relative h-3 cursor-pointer w-3 overflow-hidden rounded-full transition-colors duration-300 ${activeIndex === index
                            ? "bg-[#E5AD49]"
                            : "bg-white/70 hover:bg-white"
                            }`}
                    />
                ))}
            </div>

            {/* AUTOPLAY PROGRESS LINE */}
            {!reduceMotion && (
                <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-white/10">
                    <motion.div
                        key={activeIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: slideDuration / 1000,
                            ease: "linear",
                        }}
                        className="h-full bg-[#E5AD49]"
                    />
                </div>
            )}
        </section>
    );
}
