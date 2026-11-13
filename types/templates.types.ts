
import data from "@/data/template.json"

const sections = data.categories.ArchVanta.sections;
export const BrandData = sections.Brand.variants.ArchVantaBrand1;
export const HeaderData = sections.Header.variants.ArchVantaHeader1;

export const HeroData = sections.Hero.variants.ArchVantaHero1;
export const AboutData = sections.AboutUs.variants.ArchVantaAboutUs1;
export const ServiceData = sections.Services.variants.ArchVantaServices1;
export const achievementsData = sections.Achievements.variants.ArchVantaAchievements1;
export const ProjectData = sections.Projects.variants.ArchVantaProjects1;
export const GalleryData = sections.Gallery.variants.ArchVantaGallery1;
export const CtaData = sections.Cta.variants.ArchVantaCta1;
export const TestimonialsData = sections.Testimonials.variants.ArchVantaTestimonials1;
export const FaqsData = sections.Faq.variants.ArchVantaFaq1;
export const FooterData = data.common.Footer;

export type HeaderDataType = typeof HeaderData;

export type HeroDataType = typeof HeroData;
export type AboutDataType = typeof AboutData;
export type ServiceDataType = typeof ServiceData;
export type AchievementsDataType = typeof achievementsData;
export type ProjectDataType = typeof ProjectData;
export type GalleryDataType = typeof GalleryData;
export type CtaDataType = typeof CtaData;

export type TestimonialsDataType = typeof TestimonialsData;
export type FaqsDataType = typeof FaqsData;
export type FooterDataType = typeof FooterData;