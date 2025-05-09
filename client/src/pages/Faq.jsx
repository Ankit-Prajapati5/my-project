import React from "react";

const Faq = () => {
  const faqs = [
    {
      question: "What is Help Notes?",
      answer:
        "Help Notes is an online platform designed to facilitate the sharing and access of educational resources among college students. It allows users to upload and download study materials such as notes, presentations, and study guides.",
    },
    {
      question: "How do I get started with Help Notes?",
      answer:
        "To get started, simply create an account on our platform. Once registered, you can start uploading your study materials or explore and download resources shared by other students.",
    },
    {
      question: "Is Help Notes free to use?",
      answer:
        "Yes, Help Notes is free to use. We believe in making education accessible to everyone, and our platform is open to all students without any subscription fees.",
    },
    {
      question: "Are my documents secure on Help Notes?",
      answer:
        "Absolutely. We prioritize the security and privacy of your documents. Help Notes employs advanced encryption and security measures to ensure the confidentiality of your uploaded materials.",
    },
    {
      question: "Can I upload any type of document on Help Notes?",
      answer:
        "Yes, you can upload a variety of document types, including PDFs, Word documents, PowerPoint presentations, and more. Our platform is designed to accommodate a range of study materials.",
    },
    {
      question: "How can I search for specific study materials on Help Notes?",
      answer:
        "Use the search bar on the platform to look for specific study materials. You can enter keywords, subjects, or topics to find relevant documents quickly.",
    },
    {
      question:
        "Can I collaborate with other students on projects using Help Notes?",
      answer:
        "Absolutely. Help Notes offers real-time collaboration tools, allowing you to work on group projects and assignments with your peers. Share, edit, and collaborate seamlessly.",
    },
    {
      question: "Is there a limit to the file size I can upload?",
      answer:
        "Currently, there is a file size limit for uploads. Please refer to the platform's guidelines for specific details on file size limitations.",
    },
    {
      question: "How can I provide feedback on a document?",
      answer:
        "Each document on Help Notes comes with a feedback and rating section. You can share your thoughts, ask questions, or provide feedback on the quality of the material.",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about Help Notes
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {faqs.map((item, index) => (
            <div 
              key={index} 
              className="rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
                {item.question}
              </h2>
              <p className="mt-2 text-gray-600">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;