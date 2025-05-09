import React from "react";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start p-5 lg:flex-row lg:gap-8">
      <div className="flex h-full w-full items-center justify-center lg:w-1/2">
        <img
          src="./aboutUs.svg"
          alt="Team collaboration illustration"
          className="w-[300px] sm:w-[400px] md:w-[450px] lg:w-[600px]"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 py-4 lg:w-1/2 lg:items-start lg:py-0">
        <div className="w-full max-w-2xl">
          <h1 className="relative mb-3 w-fit text-2xl font-bold before:absolute before:top-[90%] before:h-[3px] before:w-[60%] before:bg-[#2563eb] lg:text-4xl lg:before:top-full">
            About Us
          </h1>
          <p className="text-[15px] text-gray-700 lg:text-base">
            Welcome to Help Notes, the ultimate hub for students to seamlessly
            share and access educational resources. Our platform is designed
            with a singular purpose - to make the exchange of study materials as
            effortless as possible, fostering a collaborative and enriching
            academic experience for students across colleges.
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <h1 className="relative mb-3 w-fit text-2xl font-bold before:absolute before:top-[90%] before:h-[3px] before:w-[60%] before:bg-[#2563eb] lg:text-4xl lg:before:top-full">
            Who We Are
          </h1>
          <p className="text-[15px] text-gray-700 lg:text-base">
            Help Notes is more than just a website; it's a community-driven
            initiative fueled by the passion for learning. Founded by a group of
            dedicated students, our platform is a testament to the belief that
            education should be a collective journey. Our team comprises tech
            enthusiasts, educators, and creative minds, all united in the
            mission to enhance the learning landscape.
          </p>
        </div>
        <div className="w-full max-w-2xl">
          <h1 className="relative mb-3 w-fit text-2xl font-bold before:absolute before:top-[90%] before:h-[3px] before:w-[60%] before:bg-[#2563eb] lg:text-4xl lg:before:top-full">
            Our Mission
          </h1>
          <p className="text-[15px] text-gray-700 lg:text-base">
            At Help Notes, our mission is clear: to empower students by
            providing a centralized platform where knowledge knows no
            boundaries. We aim to break down the barriers to academic success,
            making valuable study materials accessible to all.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;