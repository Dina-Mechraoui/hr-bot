
export default function TrackerCircle({ label, value, total, subtitle = '' }) {
    const radius = 60;
    const stroke = 12;
    const normalizedRadius = radius - stroke / 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const percent = Math.min((value / total) * 100, 100);
    const strokeDashoffset = circumference * (1 - percent / 100);
  
    return (
      <div className="flex flex-col items-center">
        <p className="text-sm font-bold mb-4">{label}</p>
        <div className="relative w-[130px] h-[130px]">
        <svg height={radius * 2} width={radius * 2} className="transform rotate-[-90deg]  scale-y-[-1]">
  
            <circle
              stroke="#a3a3a3"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke="#468585"
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              className="transition-all duration-300"
            />
          </svg>
  
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <p className="text-black text-sm font-bold">
              {value}/{total}
            </p>
            {subtitle && (
              <p className="text-xs text-[#4b5563] font-normal mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }