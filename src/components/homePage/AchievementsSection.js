const AchievementsSection = () => {
    return ( 
        <section className="px-6 py-16">
            <div className="">
                <h1 className="text-4xl md:text-5xl text-[#468585] mb-4 font-extrabold  relative inline-block">
                Our Achievement
                        <img src="/assets/vector2.svg" alt="Vector" className="absolute  -bottom-5 -right-6 " />
                </h1>
                <p className="text-sm mb-18 font-semibold ml-12 text-gray-700">We’re proud of the impact we’ve made:</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 justify-between gap-y-10">
                <div className="flex items-start gap-4">
                    <div className="bg-[#FFF5F9] p-3 rounded-lg flex items-center justify-center w-12 h-12 col-span-1 row-span-2">
                        <img src="/assets/hr.svg" alt="HRs" className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">500+</h3>
                        <p className="text-sm text-gray-700">HRs</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-[#FFF5F9] p-3 rounded-lg flex items-center justify-center w-12 h-12 col-span-1 row-span-2">
                        <img src="/assets/hob.svg" alt="HRs" className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-xl mb-2">1,200+</h3>
                        <p className="text-sm text-gray-700">Job posts</p>
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
                        <p className="text-sm text-gray-700">Client satisfaction rate</p>
                    </div>
                </div>
            </div>
        </section> 
    );
}
 
export default AchievementsSection;