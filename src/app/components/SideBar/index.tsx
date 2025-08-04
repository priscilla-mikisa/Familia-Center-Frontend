'use client';
import { useState } from 'react';
import {
  BarChart2,
  BookOpen,
  FileText,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Video,
  X,
  ArrowBigLeft
} from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';
import LogoutModal from '../LogoutModal';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ activeTab, setActiveTab, isMenuOpen, setIsMenuOpen }: SidebarProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 lg:w-72 bg-white shadow-md flex-col h-screen fixed">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Image
                src='/images/logo.png'
                alt='logo'
                width={50}
                height={50}
                className="text-white"
              />
            </div>
            <span className="text-lg font-bold text-gray-900">Familia Center</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-4">
            <Link href='https://familia-center.netlify.app/'>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'home' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('home')}
              >
                <Home className="w-5 h-5" />
                <span>Back</span>
              </button>
            </Link>

            <Link href='/'>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'dashboard' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart2 className="w-5 h-5" />
                <span>Home</span>
              </button>
            </Link>
            
            <Link href='/components/Sessions'>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'sessions' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('sessions')}
              >
                <Video className="w-5 h-5" />
                <span>Sessions</span>
              </button>
            </Link>

            <Link href='/components/Programs'>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'programs' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('programs')}
              >
                <BookOpen className="w-5 h-5" />
                <span>Programs</span>
              </button>
            </Link>
            
            <Link href='/components/Resources'>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'resources' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('resources')}
              >
                <FileText className="w-5 h-5" />
                <span>Resources</span>
              </button>
            </Link>
            
            {/* <Link href='/components/Messages'>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'messages' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('messages')}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Messages</span>
              </button>
            </Link> */}
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <Link href='/components/Settings'>
            <button className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </Link>
          
          <button 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full"
            onClick={() => setShowLogoutModal(true)}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          className="p-2 rounded-md bg-white shadow"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div 
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <Image
                src='/images/logo.png'
                alt='logo'
                width={50}
                height={50}
                className="text-white"
              />
            </div>
            <span className="text-lg font-bold text-gray-900">Familia Center</span>
          </div>
        </div>
        
        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-4">
            <Link href='https://familia-center.netlify.app/' onClick={() => setIsMenuOpen(false)}>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'home' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('home')}
              >
                <ArrowBigLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </Link>

            <Link href='/' onClick={() => setIsMenuOpen(false)}>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'dashboard' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>
            </Link>
            
            <Link href='/components/Sessions' onClick={() => setIsMenuOpen(false)}>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'sessions' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('sessions')}
              >
                <Video className="w-5 h-5" />
                <span>Sessions</span>
              </button>
            </Link>

            <Link href='/components/Programs' onClick={() => setIsMenuOpen(false)}>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'programs' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('programs')}
              >
                <BookOpen className="w-5 h-5" />
                <span>Programs</span>
              </button>
            </Link>
            
            <Link href='/components/Resources' onClick={() => setIsMenuOpen(false)}>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'resources' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab('resources');
                setIsMenuOpen(false);
              }}
            >
              <FileText className="w-5 h-5" />
              <span>Resources</span>
            </button>
            </Link>

            <Link href='/components/Messages' onClick={() => setIsMenuOpen(false)}>
              <button 
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  activeTab === 'messages' 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab('messages');
                setIsMenuOpen(false);
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
            </button>
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t">
          <Link href='/components/Settings' onClick={() => setIsMenuOpen(false)}>
            <button 
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </Link>
          
          <button 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 w-full"
            onClick={() => {
              setShowLogoutModal(true);
              setIsMenuOpen(false);
            }}
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
      />
    </>
  );
};

export default Sidebar;