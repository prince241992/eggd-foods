
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="py-16 bg-cream-50">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-center">
              About <span className="gradient-text">Us</span>
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Learn more about our journey, our values, and our commitment to authentic Indian sweets.
            </p>
          </div>
        </div>
        
        <AboutSection />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
