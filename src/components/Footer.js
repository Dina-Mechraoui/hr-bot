const Footer = () => {
    return (
      <footer className="text-black px-6 sm:px-12 md:px-20 lg:px-24 py-10" id="contact">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-10 border-t border-black">
            <div className="flex self-start items-center gap-3 mb-4">
              <img src="/assets/LOGO.svg" alt="HR Bot Icon" className="w-15 h-15" />
              <h2 className="text-2xl font-bold text-teal-700">HR Bot</h2>
            </div>
  
          {/* Column 2: Contact Info */}
          <div>
            <p className="font-semibold mb-2 text-xl">Contact Us</p>
            <p className="text-sm md:text-base leading-relaxed">
              Website: <a href="https://thynktechcom.com/" className="underline text-black">https://thynktechcom.com/</a><br />
              Birkhadem<br />
              Birkhadem, Birkhadem 16029, DZ<br />
              Email: <a href="mailto:contact@thynktechdz.com" className="text-black">contact@thynktechdz.com</a>
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <a href="#"><img src="/assets/facebook.svg" alt="Facebook" className="bg-green-100 p-2 rounded-md w-10 h-10" /></a>
              <a href="#"><img src="/assets/insta.svg" alt="Instagram" className="bg-green-100 p-2 rounded-md w-10 h-10" /></a>
              <a href="#"><img src="/assets/linkedIn.svg" alt="LinkedIn" className="bg-green-100 p-2 rounded-md w-10 h-10" /></a>
            </div>
          </div>
  
          {/* Column 3: Features */}
          <div>
            <h3 className="font-bold text-xl mb-2">Features</h3>
            <ul className="space-y-1 text-sm md:text-base">
              <li>Post Jobs</li>
              <li>Applicant Tracking</li>
              <li>Chatbot Interviews</li>
              <li>Resume Review</li>
              <li>Job Matching</li>
              <li>Personalized Tips</li>
            </ul>
          </div>
        </div>
  
        {/* Bottom copyright */}
        <div className="border-t border-black pt-4 text-center text-sm md:text-base font-semibold">
          Copyright © 2024 Thynk Tech DZ
        </div>
      </footer>
    );
  };
  
  export default Footer;
  