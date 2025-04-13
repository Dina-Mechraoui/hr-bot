import TrackerCircle from "@/components/TrackerCircle"; 
export default function UsageTracker() {
  return (
    <div className="p-10">
      <h2 className="text-2xl max-sm:text-center font-bold mb-10 text-[#1f2937]">Usage tracker</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-16">
        <TrackerCircle label="Posts" value={28} total={30} subtitle="16 Days Left" />
        <TrackerCircle label="Num. of applicants" value={53} total={70} />
        <TrackerCircle label="Recruitements" value={4} total={20} />
      </div>
    </div>
  );
}
