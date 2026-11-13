
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

import AboutSection from "@/components/sections/AboutSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import CTASection from "@/components/sections/CtaSection";
import FAQSection from "@/components/sections/FaqsSection";
import HeroSection from "@/components/sections/HeroSection";
import ProjectGallery from "@/components/sections/ProjectGallery";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialsSection from "@/components/sections/TestimonialSection";
import { Suspense } from "react";




function HomeContent() {
    return <>

        <Header />

        <main id="main-content">
            <div id="home">
                <HeroSection />
            </div>

            <div>
                <AboutSection />
            </div>

            <div>
                <ServicesSection />
            </div>

            <div>
                <AchievementsSection />
            </div>

            <div>
                <ProjectsSection />
            </div>

            <div>
                <ProjectGallery />
            </div>

            <div>
                <CTASection />
            </div>

            <div>
                <TestimonialsSection />
            </div>

            <div>
                <FAQSection />
            </div>

            {/* <ContactSection /> */}
        </main>

        <div id="contact">
            <Footer />
        </div>
    </>;
}

export default function Home() {
    return (
       <Suspense>
         <HomeContent />
       </Suspense>
    );
}
