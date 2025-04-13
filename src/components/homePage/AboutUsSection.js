const AboutUsSection = () => {
    return ( 
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
    );
}
 
export default AboutUsSection;