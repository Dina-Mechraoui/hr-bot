
import Link from 'next/link';
import { LogOut } from '@deemlol/next-icons';
import { logoutUser } from '@/api/auth';

const SidebarContent = ({ isActive, navLinks, data }) => {
  const handleLogout = async () => {
    try {
      await logoutUser();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
    return (
        <div className="w-full flex flex-col items-center justify-between h-full">
          <div className="w-full flex flex-col items-center">
            <img src="/assets/LOGO.svg" alt="Bot Icon" className="w-12 h-12 mb-6" />
    
            <div className="flex flex-col w-full items-center bg-[#468585] mb-6 p-2">
              <img src="/assets/avatar.png" alt="Profile" className="w-12 h-12 rounded-full" />
              <p className="text-white px-4 py-1 mt-2 font-medium text-sm">Lilia Ali</p>
            </div>
    
            <nav className="flex flex-col font-semibold items-center space-y-6 w-full px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-col items-center text-center gap-2 ${
                    isActive(link.href) ? 'text-[#468585]' : 'text-black'
                  } hover:text-[#386969]`}
                >
                  {link.icon}
                  <span className="text-xs">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
    
          <button onClick={handleLogout} className="mb-2 flex items-center gap-2 border border-[#468585] text-[#468585] hover:bg-[#468585] hover:text-white transition px-4 py-2 rounded-full text-sm">
            <LogOut className="w-4 h-4 " />
            <span className='hidden lg:block'>Log Out</span>
          </button>
        </div>
      );
}
 
export default SidebarContent;