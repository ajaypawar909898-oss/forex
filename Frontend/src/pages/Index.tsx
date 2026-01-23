import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import useScrollAnimation from "../utils/useScrollAnimation";
import SmartTrading from "../components/SmartTrading";
import CryptoMatrix from "../components/CryptoMatrix";

const Index = () => {
  // Initialize scroll animations
  useScrollAnimation();

  // Set page title
  useEffect(() => {
    document.title = "Forex | Modern Cryptocurrency Trading";
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 mt-10">
        <CryptoMatrix />
      </div>
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <SmartTrading />
      <FAQ />
      <CTA />

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
