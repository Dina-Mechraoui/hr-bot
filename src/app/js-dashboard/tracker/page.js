import TrackerCircle from "@/components/TrackerCircle";

export default function CandidateUsageTracker() {
  return (
    <div className="p-4 md:p-10">
      <h2 className="text-2xl max-sm:text-center font-bold mb-10 text-gray-800">Usage Tracker</h2>
      <div className="flex flex-wrap justify-center sm:justify-start gap-16">
        <TrackerCircle label="Applications" value={4} total={15} subtitle="16 Days Left" />
        <TrackerCircle label="Resume consulter" value={10} total={15} subtitle="16 Days Left" />
      </div>
    </div>
  );
}
