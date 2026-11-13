


"use client";

import Image from "next/image";

import { motion, useReducedMotion } from "framer-motion";
import {
    Building2,
    House,
    Factory,
    GraduationCap,
    ShoppingBag,
    ArrowUpRight,
    type LucideIcon,
} from "lucide-react";

import { ProjectData } from "@/types/templates.types";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionHeader";
import Container from "../ui/Container";

const projects = ProjectData;


const GOLD = "#E5A11F";
const EASE = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
    building: Building2,
    house: House,
    factory: Factory,
    graduation: GraduationCap,
    shopping: ShoppingBag,
};

export default function ProjectsSection() {
    const reduceMotion = !!useReducedMotion();
    const featured = projects.featured;
    const FeaturedIcon = icons[featured.icon] ?? Building2;

    return (
        <section
            id="projects"
            className="relative isolate overflow-hidden bg-white pb-16 lg:pb-20"
        >
            {/* DECORATIVE BACKGROUND */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[200px] w-[30%] bg-[#103245]"
                style={{
                    clipPath: "polygon(100% 0,100% 100%,0 100%)",
                }}
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[210px] w-[32%] bg-[#F5C46A]"
                style={{
                    clipPath: "polygon(100% 0,100% 8%,8% 100%,0 100%)",
                }}
            />

            <Container className="">
                <div className="">

                    {/* TOP FEATURED AREA */}
                    <div className="grid items-center sm:gap-10 lg:grid-cols-[40%_60%] lg:gap-0">

                        {/* LEFT TEXT */}
                        <motion.div
                            initial={
                                reduceMotion ? false : { opacity: 0, x: -55 }
                            }
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.85, ease: EASE }}
                            className="relative z-10 lg:pr-8"
                        >
                            <div className="section-header mb-10 ">
                                {/* EYEBROW */}
                                <Eyebrow className="" isRight={false}>
                                    {projects.eyebrow}
                                </Eyebrow>

                                {/* HEADING */}
                                <SectionTitle className="" >
                                    {projects.heading.normal} {" "}
                                    <span style={{ color: '#D69A32' }}>
                                        {projects.heading.highlight}
                                    </span>
                                </SectionTitle>

                                {/* DESCRIPTION */}
                                <div className="space-y-6 mt-3">
                                    <Description className="max-w-[760px]">
                                        {projects.description}
                                    </Description>

                                </div>
                            </div>
                        </motion.div>

                        {/* FEATURED IMAGE */}
                        <motion.div
                            initial={
                                reduceMotion ? false : { opacity: 0, x: 70 }
                            }
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: EASE }}
                            className="relative min-w-0"
                        >
                            <div
                                className="group relative block h-[300px] overflow-hidden rounded-r-2xl bg-[#103245] sm:h-[380px] before:absolute before:h-full before:w-6/12 before:bg-white"
                            >
                                {/* GOLD SLANTED EDGE */}
                                <div
                                    className="absolute inset-0 z-10 bg-[#E5A11F]"
                                    style={{
                                        clipPath: "polygon(15% 0,17% 0,2% 100%,0 100%)",
                                    }}
                                />

                                {/* IMAGE */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        clipPath: "polygon(17% 0,100% 0,100% 100%,2% 100%)",
                                    }}
                                >
                                    <Image
                                        src={featured.image}
                                        alt={featured.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>

                                {/* NAVY SIDE PANEL */}
                                <div
                                    className="absolute inset-y-0 right-0 z-20 flex w-[52%] sm:w-[42%] flex-col justify-center bg-[#103245] py-6 pl-[22%] sm:pl-[18%] pr-3 text-white"
                                    style={{
                                        clipPath: "polygon(43% 0,100% 0,100% 100%,0 100%)",
                                    }}
                                >
                                    <FeaturedIcon
                                        size={43}
                                        strokeWidth={1.5}
                                        className="mb-4"
                                    />

                                    <span className="text-[10px] font-montserrat font-semibold uppercase tracking-wider sm:text-[15px]">
                                        {featured.category}
                                    </span>

                                    <span className="my-5 h-[3px] w-14 bg-[#E5A11F]" />

                                    <h3 className="text-[15px] font-montserrat  font-semibold leading-tight sm:text-lg">
                                        {featured.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* PROJECT CARDS */}
                    <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                        {projects.items.map((project, index) => {
                            const Icon = icons[project.icon] ?? Building2;

                            return (
                                <motion.div
                                    key={project.id}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, y: 55, scale: 0.96 }
                                    }
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: reduceMotion ? 0 : index * 0.1,
                                        ease: EASE,
                                    }}
                                    whileHover={
                                        reduceMotion ? undefined : { y: -8 }
                                    }
                                    className="group min-w-0"
                                >
                                    <div
                                        className="block h-full overflow-hidden rounded-[14px] bg-white shadow-[0_12px_30px_rgba(0,0,0,0.10)] transition-shadow duration-300 hover:shadow-xl"
                                    >
                                        {/* IMAGE */}
                                        <div className="relative h-[235px] overflow-hidden sm:h-[220px] xl:h-[200px]">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="relative min-h-[180px] flex flex-col  justify-between px-6 pb-3 pt-11">

                                            {/* GOLD ICON */}
                                            <div className="absolute -top-6 left-6 flex h-[52px] w-[52px] items-center justify-center rounded-[12px] border border-white/30 bg-[#E5A11F] text-white shadow-md">
                                                <Icon size={30} strokeWidth={1.6} />
                                            </div>

                                            <div>
                                                <p className="text-[13px] font-montserrat font-bold uppercase tracking-wide text-[#103245]">
                                                    {project.category}
                                                </p>

                                                <h3 className="mt-2 font-montserrat text-[22px] font-bold leading-[1.15] text-[#103245] xl:text-lg">
                                                    {project.title}
                                                </h3>
                                            </div>

                                            <div className="mt-5 flex items-center justify-between">
                                                <span className="h-[3px] w-[70px] rounded-full bg-[#D99A27] transition-all duration-500 group-hover:w-[110px]" />

                                                <ArrowUpRight
                                                    size={22}
                                                    color={GOLD}
                                                    className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}
