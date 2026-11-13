
import { ContactSection } from "@/components/sections/ContactSection";
import { Suspense } from "react";
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
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#103245] px-4 text-center text-white" role="status">Loading ArchVanta Experience...</div>}>
            <HomeContent />
        </Suspense>
    );
}
