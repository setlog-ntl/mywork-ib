import { siteConfig } from '@/lib/config';
import { NavHeader } from '@/components/nav-header';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { ProcessSection } from '@/components/process-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <NavHeader />
      <main id="main">
        <HeroSection config={siteConfig} />
        {siteConfig.services.length > 0 && (
          <ServicesSection services={siteConfig.services} />
        )}
        {siteConfig.portfolio.length > 0 && (
          <PortfolioSection
            portfolio={siteConfig.portfolio}
            columns={siteConfig.portfolioColumns as '2' | '3' | '4'}
          />
        )}
        {siteConfig.testimonials.length > 0 && (
          <TestimonialsSection testimonials={siteConfig.testimonials} />
        )}
        {siteConfig.process.length > 0 && (
          <ProcessSection process={siteConfig.process} />
        )}
        <ContactSection config={siteConfig} />
      </main>
      <Footer />
    </>
  );
}
