
const testimonials = [
  {
    id: 1,
    content: "The Classic Shakshuka at Egg'd Foods is an absolute delight! The perfectly poached eggs in that spicy tomato sauce make every morning special.",
    author: "Priya Sharma",
    role: "Food Blogger",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    content: "Their Egg Fried Rice is unmatched! The wok-tossed eggs with fragrant rice and secret spices make it my go-to comfort food.",
    author: "Rahul Patel",
    role: "Regular Customer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    content: "The Egg Benedict here is pure perfection. The hollandaise sauce is creamy, and the eggs are always poached to perfection. Worth every penny!",
    author: "Anjali Mehta",
    role: "Food Critic",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-cream-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            What Our <span className="text-sweet-600">Customers</span> Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear what our satisfied customers have to say about our sweets and service
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
