
"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { TestimonialsData } from "@/types/templates.types";

import "swiper/css";
import "swiper/css/pagination";
import Container from "../ui/Container";
import { Description, Eyebrow, SectionTitle } from "../ui/SectionHeader";

const testimonials = TestimonialsData;

export default function TestimonialsSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="testimonials"
            className="overflow-hidden bg-white py-16 sm:py-20"
        >
            <Container className="overflow-hidden">
                <div className="mx-auto">
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="mb-12 text-center"
                    >
                        <div className="section-header flex flex-col items-center text-center mb-5 sm:mb-10  ">
                            {/* EYEBROW */}
                            <Eyebrow className="" isRight={true}>
                                {testimonials.eyebrow}
                            </Eyebrow>

                            {/* HEADING */}
                            <SectionTitle className="" >
                                {testimonials.heading.normal} {" "}
                                <span style={{ color: '#D69A32' }}>
                                    {testimonials.heading.highlight}
                                </span>
                            </SectionTitle>

                            {/* DESCRIPTION */}
                            <div className="space-y-6 mt-3">
                                <Description className="max-w-[760px]">
                                    {testimonials.description}
                                </Description>
                            </div>

                        </div>
                    </motion.div>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={40}
                        slidesPerView={1}
                        breakpoints={{
                            900: { slidesPerView: 2 }
                        }}
                        loop={testimonials.items.length > 2}
                        autoplay={
                            reduceMotion
                                ? false
                                : {
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true
                                }
                        }
                        pagination={{
                            clickable: true,
                            el: ".archvanta-testimonial-pagination"
                        }}
                        className="!overflow-visible"
                    >
                        {testimonials.items.map((item) => (
                            <SwiperSlide key={item.id} className="!h-auto">
                                <div className="flex flex-col sm:flex-row h-full min-h-[250px] overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                                    <div
                                        className="relative profile-path h-48 w-full sm:h-auto sm:w-[35%] shrink-0 overflow-hidden border-r-[5px] border-[#E5A11F]"
                                        style={{
                                            clipPath: "polygon(0 0,100% 0,84% 100%,0 100%)"
                                        }}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            sizes="(max-width: 900px) 35vw, 20vw"
                                            className="object-cover object-top"
                                        />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-6 sm:px-6">
                                        <Quote
                                            size={34}
                                            fill="#D99517"
                                            className="mb-1 text-[#D99517]"
                                        />

                                        <p className="text-[13px] font-poppins leading-relaxed text-[#414B60] sm:text-[15px]">
                                            {item.review}
                                        </p>

                                        <span className="my-4 h-[2px] w-12 bg-[#D99517]" />

                                        <div className="flex flex-wrap items-end justify-between gap-2">
                                            <div>
                                                <h3 className="font-bold font-montserrat text-[#103245]">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs font-montserrat text-[#697386]">
                                                    {item.role}
                                                </p>
                                            </div>

                                            <div
                                                className="flex gap-0.5"
                                                aria-label={`${item.rating} out of 5 stars`}
                                            >
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={15}
                                                        fill={i < item.rating ? "#D99517" : "none"}
                                                        className="text-[#D99517]"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="archvanta-testimonial-pagination mt-9 flex justify-center gap-2" />
                </div>
            </Container>

            <style jsx global>{`
        .archvanta-testimonial-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #aeb4bd;
          opacity: 1;
          cursor: pointer;
        }
        .archvanta-testimonial-pagination .swiper-pagination-bullet-active {
          background: #d99517;
        }
      `}</style>
        </section>
    );
}
