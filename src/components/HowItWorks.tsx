
const HowItWorks = () => {
  const steps = [
    {
      icon: "📱",
      title: "Browse & Order",
      description: "Choose from our wide range of sweets and snacks on our website or app."
    },
    {
      icon: "👨‍🍳",
      title: "We Prepare",
      description: "Our chefs prepare your order fresh with the finest ingredients."
    },
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "We deliver your order directly to your doorstep while it's still fresh."
    },
    {
      icon: "😋",
      title: "Enjoy!",
      description: "Savor the authentic taste of our traditional Indian sweets and snacks."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-sweet-50 to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
            How It <span className="text-sweet-600">Works</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting your favorite sweets delivered is quick and easy with our simple process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-sweet-300">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
