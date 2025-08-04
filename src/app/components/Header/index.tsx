'use client';
import { Bell, ChevronDown, Menu, User, X } from "lucide-react";
import { useState } from "react";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  return (
    <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <button 
                  className="md:hidden mr-4"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-full hover:bg-gray-100">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="relative">
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-900">User</p>
                      <p className="text-xs text-gray-500">Patient</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
  );
}
export default Header;