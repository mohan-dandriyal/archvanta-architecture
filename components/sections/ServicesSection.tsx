
"use client";

import Image from "next/image";
import Link from "next/link";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    Building2,
    House,
    DraftingCompass,
    Sofa,
    Layers3,
    HardHat,
    LayoutGrid,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";

import { ServiceData } from "@/types/templates.types";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionHeader";
import Container from "../ui/Container";
// ============================================
// JSON DATA
// ============================================

const services = ServiceData;

// ============================================
// ICON MAPPING
// ============================================

const iconMap: Record<string, LucideIcon> = {
    building: Building2,
    house: House,
    drafting: DraftingCompass,
    sofa: Sofa,
    layers: Layers3,
    "hard-hat": HardHat,
    grid: LayoutGrid,
};

// ============================================
// ANIMATION CONFIGURATION
// ============================================

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 55,
        scale: 0.97,
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

// ============================================
// SERVICE CARD
// ============================================

type Service = (typeof services.items)[number];

function ServiceCard({
    service,
    reduceMotion,
}: {
    service: Service;
    reduceMotion: boolean;
}) {
    const Icon = iconMap[service.icon] ?? Building2;

    return (
        <motion.div
            variants={cardVariants}
            className="group relative h-full min-w-0"
        >
            <Link
                href={service.href}
                aria-label={`Explore ${service.title}`}
                className="relative block h-full min-h-[310px] overflow-hidden rounded-[12px] bg-[#103245] sm:min-h-[360px] lg:min-h-[410px]"
            >
                {/* =====================================
            BACKGROUND IMAGE
        ===================================== */}
                <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* =====================================
            DARK NAVY GRADIENT
        ===================================== */}
                <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(5,42,61,1) 0%, rgba(5,42,61,0.96) 14%, rgba(5,42,61,0.78) 30%, rgba(5,42,61,0.15) 65%, transparent 100%)",
                    }}
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-[#103245]/0 transition-colors duration-500 group-hover:bg-[#103245]/15" />

                {/* =====================================
            CONTENT
        ===================================== */}
                <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 sm:px-7 lg:px-8">
                    <div className="flex items-center gap-5">

                        {/* ICON */}
                        <motion.div
                            whileHover={
                                reduceMotion
                                    ? undefined
                                    : {
                                        scale: 1.12,
                                        y: -4,
                                    }
                            }
                            transition={{
                                duration: 0.3,
                            }}
                            className="flex shrink-0 items-center justify-center"
                        >
                            <Icon
                                size={40}
                                strokeWidth={1.6}
                                className="text-white"
                            />
                        </motion.div>

                        {/* GOLD DIVIDER */}
                        <span className="h-[58px] w-[3px] shrink-0 bg-[#E5AD49]" />

                        {/* TITLE */}
                        <h3 className="max-w-[230px] font-montserrat text-[21px] font-semibold leading-[1.2] text-white sm:text-xl">
                            {service.title}
                        </h3>
                    </div>

                    {/* HOVER ARROW */}
                    <div className="absolute bottom-3 right-5 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight
                            size={25}
                            className="text-[#E5AD49]"
                        />
                    </div>
                </div>

                {/* BOTTOM GOLD HOVER LINE */}
                <span className="absolute bottom-0 left-0 z-20 h-[4px] w-0 bg-[#E5AD49] transition-all duration-500 group-hover:w-full" />
            </Link>
        </motion.div>
    );
}

// ============================================
// MAIN SERVICES SECTION
// ============================================

export default function ServicesSection() {
    const reduceMotion = useReducedMotion();

    const firstRow = services.items.slice(0, 4);
    const secondRow = services.items.slice(4);

    return (
        <section
            id={services.sectionId}
            className="relative overflow-hidden bg-white "
        >
            <Container className="">
                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{
                        once: true,
                        amount: 0.1,
                    }}
                >

                    <div className="section-header flex flex-col items-center text-center mb-5 sm:mb-10 ">
                        {/* EYEBROW */}
                        <Eyebrow className="" isRight={true}>
                            {services.eyebrow}
                        </Eyebrow>

                        {/* HEADING */}
                        <SectionTitle className="" >
                            {services.heading.normal} {" "}
                            <span style={{ color: '#D69A32' }}>
                                {services.heading.highlight}
                            </span>
                        </SectionTitle>

                        {/* DESCRIPTION */}
                        <div className="space-y-6 mt-3">
                            {services.paragraphs.map((paragraph, index) => (
                                <Description key={index + 1} className="max-w-[760px]">
                                    {paragraph}
                                </Description>

                            ))}
                        </div>

                    </div>

                    {/* =====================================
                        FIRST ROW - FOUR CARDS
                    ===================================== */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                        {firstRow.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                reduceMotion={!!reduceMotion}
                            />
                        ))}
                    </div>

                    {/* =====================================
                        SECOND ROW - THREE CARDS
                    ===================================== */}
                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {secondRow.map((service) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                reduceMotion={!!reduceMotion}
                            />
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
