import { BrandData } from "@/types/templates.types";
import Container from "../ui/Container";
export function ContactSection() {
  return <section id="contact" className="bg-[#f4f7f9] py-16 sm:py-20">
    <Container>
      <h2 className="font-poppins text-3xl font-bold text-[#103245] sm:text-4xl">Let’s discuss your project</h2>
      <p className="mt-4 max-w-2xl text-[#526071]">Contact our team to discuss your plans, requirements, and timeline.</p>
      <address className="mt-8 flex flex-col gap-4 break-words font-montserrat not-italic text-[#103245] sm:flex-row sm:flex-wrap sm:gap-8">
        <a className="py-2 font-semibold underline underline-offset-4" href={"tel:" + BrandData.phoneHref}>{BrandData.phone}</a>
        <a className="py-2 font-semibold underline underline-offset-4" href={"mailto:" + BrandData.email}>{BrandData.email}</a>
        <span className="py-2">{BrandData.address}</span>
      </address>
    </Container>
  </section>;
}
