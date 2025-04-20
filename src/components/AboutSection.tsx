
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-16 bg-cream-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey: From Kitchen to Cities</h2>
          <Card className="p-6 text-gray-700 leading-relaxed">
            <p className="mb-4">
              Our story began in a small kitchen in Indore, where our passion for creating the perfect egg dishes turned into something extraordinary. What started as a simple dream to elevate everyday egg dishes into gourmet experiences has now become a culinary revolution.
            </p>
            <p className="mb-4">
              In 2023, we opened our first cloud kitchen in Indore, introducing our signature dishes like the Classic Shakshuka and Egg Benedict with an Indian twist. The response was overwhelming – people loved our innovative take on egg-based cuisine. Word spread quickly, and within months, we were serving hundreds of customers daily.
            </p>
            <p className="mb-4">
              Encouraged by our success in Indore, we expanded to Vadodara in 2024. We brought with us not just our menu but our commitment to using farm-fresh eggs and premium ingredients. Our chefs, trained in both traditional and modern cooking techniques, ensure each dish maintains our high standards of quality and taste.
            </p>
            <p>
              Today, Egg'd Foods stands as a testament to innovation in egg-based cuisine, serving thousands of satisfied customers across two cities. We're not just serving food; we're creating experiences, one egg at a time. As we continue to grow, our commitment remains the same – delivering exceptional egg dishes that bring joy to every plate.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
