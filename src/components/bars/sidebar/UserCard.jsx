

export default function UserCard({ fullName = "Guest", avatar = "/assets/avatar.png" }) {
  return (
    <div className="flex flex-col w-full items-center bg-[#468585] mb-6 p-2">
      <img src={avatar} alt="" className="w-12 h-12 rounded-full" />
      <p className="text-white px-4 py-1 mt-2 text-center font-medium text-sm">{fullName}</p>
    </div>
  );
}

