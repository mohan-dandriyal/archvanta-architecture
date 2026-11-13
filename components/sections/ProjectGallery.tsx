

"use client";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";


import { GalleryData } from "@/types/templates.types";
import Container from "../ui/Container";
import { Eyebrow, SectionTitle } from "../ui/SectionHeader";

const gallery = GalleryData;

type GalleryItem = (typeof gallery.items)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 45,
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

function GalleryCard({
    item,
    featured = false,
    reducedMotion,
}: {
    item: GalleryItem;
    featured?: boolean;
    reducedMotion: boolean;
}) {
    return (
        <motion.div
            variants={cardVariants}
            className={`group relative min-h-0 overflow-hidden rounded-[20px] ${featured
                ? "h-[340px] md:h-[500px] lg:h-full"
                : "h-[220px] sm:h-[260px] lg:h-full"
                }`}
        >
            <div
                aria-label={`View ${item.title}`}
                className="relative block h-full w-full overflow-hidden"
            >
                <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    priority={featured}
                    sizes={
                        featured
                            ? "(max-width: 1024px) 100vw, 43vw"
                            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 28vw"
                    }
                    className={`object-cover ${reducedMotion
                        ? ""
                        : "transition-transform duration-700 ease-out group-hover:scale-110"
                        }`}
                />

                {/* HOVER GRADIENT */}
                <div className="absolute inset-0 bg-linear-to-t from-[#103245]/90 via-[#103245]/20 to-transparent opacity-100 lg:opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />

                {/* HOVER CONTENT */}
                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-0 p-5 opacity-100 lg:translate-y-5 lg:opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-7">
                    <span className="text-xs font-bold font-montserrat uppercase tracking-[0.15em] text-[#E5AD49]">
                        {item.category}
                    </span>

                    <div className="mt-2 flex items-center justify-between gap-4">
                        <h3 className="text-sm font-bold font-montserrat text-white sm:text-xl">
                            {item.title}
                        </h3>


                    </div>
                </div>

                {/* GOLD BOTTOM LINE */}
                <span className="absolute bottom-0 left-0 z-20 h-[4px] w-0 bg-[#E5AD49] transition-all duration-500 group-hover:w-full" />
            </div>
        </motion.div>
    );
}

export default function ProjectGallery() {
    const reduceMotion = !!useReducedMotion();

    const featured = gallery.items[0];
    const otherProjects = gallery.items.slice(1, 5);

    if (!featured) return null;

    return (
        <section
            id={gallery.sectionId}
            className="overflow-hidden bg-white pb-16 lg:pb-20 relative"
        >

            <div className="absolute h-[250px] -top-2 w-[23%] bg-[#F5C46A]"
                style={{
                    clipPath: "polygon(0% 0%, 100.91% 0%, 50.85% 0%, 0% 49.36%)",
                }}
                 />

            <div className="top-0 absolute h-[200px] w-[20%] bg-[#103245]"
                style={{
                    clipPath: "polygon(0% 0%, 35.91% 0%, 54.85% 0%, 0% 44.36%)",
                }} 
                />

                <div className="absolute bottom-0 right-0 h-[250px] w-[23%] bg-[#F5C46A]"
                style={{
                    clipPath: "polygon(101% 36.25%, 100% 100.25%, 100% 100.61%, 42.65% 100.61%)",
                }} />

            <div className="bottom-0 right-0 absolute h-[200px] w-[20%] bg-[#103245]"
                style={{
                    clipPath: "polygon(101% 36.25%, 100% 100.25%, 100% 100.61%, 42.65% 100.61%)",
                }} />


            <Container className="py-16">

                <div className="section-header flex flex-col items-center text-center mb-10 ">
                    {/* EYEBROW */}
                    <Eyebrow className="" isRight={true}>
                        {gallery.eyebrow}
                    </Eyebrow>

                    {/* HEADING */}
                    <SectionTitle className="" >
                        {gallery.heading.normal} {" "}
                        <span style={{ color: '#D69A32' }}>
                            {gallery.heading.highlight}
                        </span>
                    </SectionTitle>

                </div>

                <motion.div
                    variants={containerVariants}
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="mx-auto grid grid-cols-1 gap-5 lg:h-[680px] lg:grid-cols-[1.55fr_2fr]"
                >
                    {/* LARGE LEFT IMAGE */}
                    <GalleryCard
                        item={featured}
                        featured
                        reducedMotion={reduceMotion}
                    />

                    {/* RIGHT FOUR IMAGES */}
                    <div className="grid min-h-0 grid-cols-1 gap-5 sm:grid-cols-2 sm:grid-rows-2">
                        {otherProjects.map((item) => (
                            <GalleryCard
                                key={item.id}
                                item={item}
                                reducedMotion={reduceMotion}
                            />
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
