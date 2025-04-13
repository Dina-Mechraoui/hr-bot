const FeaturesSection = () => {
  return (
    <section className="px-6 py-16" id="features">
          <h1 className="text-4xl md:text-5xl text-[#468585] font-extrabold mb-16 relative inline-block">
            Features
            <img src="/assets/vector.svg" alt="Vector" className="absolute  -bottom-3 -right-4 " />
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
            <div className="font-semibold text-xl">FOR HRs</div>

            <div className="flex items-start gap-4">
              <img src="/assets/hire.svg" alt="Posting Job Offers" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold mb-2">Posting Job Offers</h3>
                <p className="text-sm text-gray-700">
                  Effortlessly create and publish job listings to attract top talent. Customize job descriptions, requirements, and application processes to ensure you find the perfect candidates for your organization.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src="/assets/check.svg" alt="Check Applicants" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold mb-2">Check Applicants List and Their Match Percentage</h3>
                <p className="text-sm text-gray-700">
                  Quickly review a comprehensive list of applicants and see how well they match your job criteria. Our AI provides a match percentage to help you choose wisely.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src="/assets/hire.svg" alt="Chatbot Interviews" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold mb-2">Hire Applicants Interviewed by Chatbot</h3>
                <p className="text-sm text-gray-700">
                  Streamline hiring with our AI chatbot. Conduct first-round interviews and review AI-generated feedback to confidently make decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="font-semibold text-xl">FOR Job Seekers</div>

            <div className="flex items-start gap-4">
              <img src="/assets/find.svg" alt="Find Jobs" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold mb-2">Find Job Offers and Apply</h3>
                <p className="text-sm text-gray-700">
                  Explore a wide range of job listings tailored to your skills. Apply directly and easily manage your job search with our platform.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src="/assets/resume.svg" alt="Resume Consultant" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold mb-2">Resume Consultant</h3>
                <p className="text-sm text-gray-700">
                  Use our AI to get feedback on your resume. Improve content and formatting to boost your chances of getting interviews.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <img src="/assets/tip.svg" alt="Application Tips" className="w-8 h-8" />
              <div>
                <h3 className="font-semibold mb-2">Customized Tips and Advice</h3>
                <p className="text-sm text-gray-700">
                  Get AI-curated tips to enhance your applications — from writing great cover letters to prepping for interviews.
                </p>
              </div>
            </div>
          </div>
        </section>
  );
};

export default FeaturesSection;
