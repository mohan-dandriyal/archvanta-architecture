

"use client";

import { useEffect, useRef } from "react";

import {
    motion,
    useInView,
    useMotionValue,
    useReducedMotion,
    useTransform,
    animate,
} from "framer-motion";
import {
    Building2,
    UsersRound,
    GraduationCap,
    Construction,
    type LucideIcon,
} from "lucide-react";

import { achievementsData } from "@/types/templates.types";
import Container from "../ui/Container";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionHeader";

const achievements = achievementsData;

const NAVY = "#103245";


const iconMap: Record<string, LucideIcon> = {
    building: Building2,
    users: UsersRound,
    graduation: GraduationCap,
    crane: Construction,
};

const ease = [0.22, 1, 0.36, 1] as const;

// ======================================
// ANIMATED COUNTER
// ======================================

function AnimatedCounter({
    value,
    suffix,
    start,
    reducedMotion,
}: {
    value: number;
    suffix: string;
    start: boolean;
    reducedMotion: boolean;
}) {
    const count = useMotionValue(reducedMotion ? value : 0);

    const formatted = useTransform(count, (latest) =>
        Math.round(latest).toLocaleString("en-US")
    );

    useEffect(() => {
        if (!start) return;

        if (reducedMotion) {
            count.set(value);
            return;
        }

        const controls = animate(count, value, {
            duration: 2.2,
            ease: "easeOut",
        });

        return () => controls.stop();
    }, [start, value, count, reducedMotion]);

    return (
        <span className="inline-flex items-baseline">
            <motion.span>{formatted}</motion.span>
            <span>{suffix}</span>
        </span>
    );
}

// ======================================
// MAIN COMPONENT
// ======================================

export default function AchievementsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.15,
    });

    const reduceMotion = !!useReducedMotion();

    return (
        <section
            ref={sectionRef}
            id="achievements"
            className="relative isolate overflow-hidden bg-white  py-14 my-16 lg:my-20"
            style={{
                backgroundImage: `url(${achievements.backgroundImage})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat"

            }}
        >
            {/* BACKGROUND IMAGE */}

            <Container className="">
                <div className="relative">

                    {/* SECTION HEADING */}
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease }}
                        className="mx-auto mb-20 max-w-[1050px] text-center lg:mb-24"
                    >

                        <div className="section-header flex flex-col items-center text-center mb-10 ">
                            {/* EYEBROW */}
                            <Eyebrow className="" isRight={true}>
                                {achievements.eyebrow}
                            </Eyebrow>

                            {/* HEADING */}
                            <SectionTitle className="" >
                                {achievements.heading.normal} {" "}
                                <span style={{ color: '#D69A32' }}>
                                    {achievements.heading.highlight}
                                </span>
                            </SectionTitle>

                            {/* DESCRIPTION */}
                            <div className="space-y-6 mt-3">
                                <Description className="max-w-[760px]">
                                    {achievements.description}
                                </Description>
                            </div>

                        </div>


                    </motion.div>

                    {/* STATS GRID */}
                    <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
                        {achievements.stats.map((stat, index) => {
                            const Icon = iconMap[stat.icon] ?? Building2;

                            return (
                                <motion.div
                                    key={stat.id}
                                    initial={
                                        reduceMotion
                                            ? false
                                            : { opacity: 0, y: 65, scale: 0.95 }
                                    }
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                    }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{
                                        duration: 0.75,
                                        delay: reduceMotion ? 0 : index * 0.12,
                                        ease,
                                    }}
                                    whileHover={
                                        reduceMotion ? undefined : { y: -8 }
                                    }
                                    className="group relative"
                                >
                                    <div className="relative flex min-h-[200px] flex-col items-center justify-center rounded-[20px] border-b-[6px] border-[#E5A11F] bg-white px-4 pb-7 pt-16 text-center shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-shadow duration-300 group-hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)]">

                                        {/* FLOATING ICON */}
                                        <div className="absolute -top-9 left-1/2 flex h-[75px] w-[75px] -translate-x-1/2 items-center justify-center rounded-[22px] border-[4px] border-[#E5A11F] bg-[#103245] shadow-md transition-transform duration-300 group-hover:scale-105">
                                            <Icon
                                                size={35}
                                                strokeWidth={1.65}
                                                className="text-white"
                                            />
                                        </div>

                                        {/* NUMBER */}
                                        <h3
                                            className="mt-3 text-[44px] font-montserrat font-semibold leading-none tracking-tight sm:text-[52px] lg:text-[48px]"
                                            style={{ color: NAVY }}
                                        >
                                            <AnimatedCounter
                                                value={stat.value}
                                                suffix={stat.suffix}
                                                start={isInView}
                                                reducedMotion={reduceMotion}
                                            />
                                        </h3>

                                        {/* LABEL */}
                                        <p className="mt-4 text-[13px] font-poppins font-medium uppercase tracking-wide text-[#555555] sm:text-[15px] lg:text-[17px]">
                                            {stat.label}
                                        </p>

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
