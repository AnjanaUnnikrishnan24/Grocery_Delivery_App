import React from 'react';

const About = () => {
  return (
    <>  
    <div className="bg-white font-sans flex items-center justify-center mt-4 px-4">
      <div className="max-w-8xl bg-gray-200 shadow-lg rounded-lg p-10 md:p-14">
        <h1 className="text-4xl font-bold text-center text-green-700 mt=32 mb-6">About Us</h1>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          Welcome to <strong>GroFresh Basket</strong>, your go-to platform for effortless grocery shopping.  
          Our mission is to bring convenience, quality, and a wide variety of products straight to your doorstep.
        </p>

        <h2 className="text-3xl font-semibold text-green-600 mt-10">What We Offer</h2>
        <p className="text-lg text-gray-700 mt-4">
          We merge **technology and community** to enhance your shopping experience:
        </p>

        <ul className="mt-4 text-lg text-gray-700 space-y-3">
          <li>
            <span className="font-semibold text-green-600">🛒 Smart Shopping:</span> Get personalized recommendations based on your past purchases, dietary preferences, and seasonal trends.
          </li>
          <li>
            <span className="font-semibold text-green-600">📊 Real-Time Inventory Updates:</span> Stay informed about product availability and the latest offers.
          </li>
          <li>
            <span className="font-semibold text-green-600">🚀 Ultra-Fast Delivery:</span> Essential items like milk, bread, and baby supplies delivered in record time.
          </li>
        </ul>

        <h2 className="text-3xl font-semibold text-green-600 mt-10">Our Vision</h2>
        <p className="text-lg text-gray-700 mt-4">
          We aim to **redefine grocery shopping** by offering a comprehensive, user-friendly platform that caters to all stakeholders.
        </p>
        <p className="text-lg text-gray-700 mt-4 text-center font-medium">
          Thank you for choosing **GroFresh Basket** – let's make grocery shopping a delightful experience together! 🛍️
        </p>
      </div>
    </div>
    </>
  );
};

export default About;


