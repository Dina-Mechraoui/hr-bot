import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="sm:px-16 md:px-24">
        <section className="flex flex-row items-center justify-between px-6 lg:pt-16 bg-white">
          <div className="w-full lg:w-1/2 hidden lg:grid grid-cols-5 grid-rows-4 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md justify-self-end self-end max-w-72 col-span-3 row-span-2">
              <img
                src="/assets/pic1.png"
                alt="Main visual"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden shadow-md col-span-2 row-span-2 max-h-56 max-w-48 row-start-2 col-start-4">
              <img
                src="/assets/pic2.png"
                alt="Interview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="rounded-xl overflow-hidden shadow-md col-span-2 row-span-2 max-h-56  max-w-48 justify-self-end col-start-2">
              <img
                src="/assets/pic3.png"
                alt="Resume"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0 lg:pl-16 space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Welcome to HR Bot</h1>
            <p className="text-gray-800 text-md md:text-lg font-medium leading-relaxed">
              Optimize your hiring process or advance your job search with our AI-driven tools.
              Whether you're an HR professional seeking to streamline recruitment or a job seeker
              aiming to improve your career prospects, HR-Agent is here to support you.
              Choose your role below to begin your journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="bg-[#468585] cursor-pointer text-white font-semibold py-2 px-8 rounded-full hover:bg-[#386969] transition">
                I am an HR
              </button>
              <button className="bg-[#468585] cursor-pointer text-white font-semibold py-2 px-8 rounded-full hover:bg-[#386969] transition">
                I am a Job Seeker
              </button>
            </div>
          </div>
        </section>

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

        <section id="about" className="px-6 py-16">
          <h1 className="text-4xl md:text-5xl text-[#468585] font-extrabold mb-16 relative inline-block">
            About Us
            <img src="/assets/vector.svg" alt="Vector" className="absolute -bottom-3 -right-4 " />
          </h1>
          <div className="flex flex-col lg:flex-row items-start">
            <div className="w-full lg:w-1/2 space-y-8 flex flex-col items-start">
              <p className="font-semibold text-black">
                At Thynk Tech dz, we are a renowned consulting and communication agency dedicated to prioritizing the success of our valued clients. Committed to delivering exceptional results, our team combines research expertise with effective communication strategies to ensure our clients achieve their goals. By understanding their unique needs and providing tailored solutions, we consistently strive to exceed expectations and foster long-term partnerships.
              </p>
              <p className="text-black font-semibold">
                Trust our dedicated professionals to enhance your brand and propel your business to unprecedented success.
              </p>
              <button className="bg-[#468585] cursor-pointer text-white font-semibold px-6 py-3 max-lg:self-center rounded-full hover:bg-[#386969] transition">
                Visit Our Website
              </button>
            </div>
            <div className="w-full hidden  lg:w-1/2 lg:flex justify-center">
              <img
                src="/assets/thynkTech.png"
                alt="About Us"
                className="w-full max-w-[300px] rounded-xl object-contain"
              />
            </div>
          </div>
        </section>
        
        <section className="px-6 py-16">
          <div className="">
            <h1 className="text-4xl md:text-5xl text-[#468585] font-extrabold mb-24 relative inline-block">
            Our Achievement
                  <img src="/assets/vector2.svg" alt="Vector" className="absolute  -bottom-5 -right-6 " />
                  <p className="text-sm absolute  -bottom-10 left-12 font-semibold text-gray-700">We’re proud of the impact we’ve made:</p>
            </h1>
          </div>

          <div className="flex flex-wrap justify-between gap-y-10">
            <div className="flex items-start gap-4">
              <div className="bg-[#FFF5F9] p-3 rounded-lg flex items-center justify-center w-12 h-12 col-span-1 row-span-2">
                <img src="/assets/hr.svg" alt="HRs" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">500+</h3>
                <p className="text-sm text-gray-700">
                HRs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#FFF5F9] p-3 rounded-lg flex items-center justify-center w-12 h-12 col-span-1 row-span-2">
                <img src="/assets/hob.svg" alt="HRs" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">1,200+</h3>
                <p className="text-sm text-gray-700">
                Job posts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#FFF5F9] p-3 rounded-lg flex items-center justify-center w-12 h-12 col-span-1 row-span-2">
                <img src="/assets/person.svg" alt="HRs" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">10,000+</h3>
                <p className="text-sm text-gray-700">
                Job applicants
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-[#FFF5F9] p-3 rounded-lg flex items-center justify-center w-12 h-12 col-span-1 row-span-2">
                <img src="/assets/smile.svg" alt="HRs" className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">98%</h3>
                <p className="text-sm text-gray-700">
                Client satisfaction rate
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
    
  );
}
