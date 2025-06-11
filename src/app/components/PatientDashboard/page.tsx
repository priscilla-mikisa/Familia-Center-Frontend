'use client'
import { useState } from 'react';
import {
  Calendar,
  Video,
  BookOpen,
  FileText,
  MessageCircle,
  User,
  Bell,
  Search,
  ChevronDown,
  Clock,
  CheckCircle,
  Award,
  BarChart2,
  Heart,
  Menu,
  X,
  Settings,
  LogOut,
  Home,
  Sidebar
} from 'lucide-react';
import Header from '../Header';
import Layout from '../Layout';
import Sessions from '../Sessions/page';

const PatientDashboard = () => {
  
  // Mock data for the dashboard
  
 
  
 
  const upcomingSessions = [
    {
      id: 1,
      title: "Marriage Counseling Session",
      date: "Tomorrow, 10:00 AM",
      duration: "60 mins",
      counselor: "Dr. Sarah Johnson",
      status: "Scheduled"
    },
    {
      id: 2,
      title: "Parenting Workshop",
      date: "June 15, 2:00 PM",
      duration: "90 mins",
      counselor: "Dr. Michael Chen",
      status: "Scheduled"
    }
  ];

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header/>
        
        
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back, Alex!</h2>
                  <p className="max-w-xl">Your journey to stronger relationships and personal growth continues. You have 2 upcoming sessions this week.</p>
                </div>
                <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Upcoming Sessions
                </button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Sessions</p>
                    <p className="text-2xl font-bold mt-1">24</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Video className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Active Programs</p>
                    <p className="text-2xl font-bold mt-1">2</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Resources</p>
                    <p className="text-2xl font-bold mt-1">12</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">New Messages</p>
                    <p className="text-2xl font-bold mt-1">3</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Upcoming Sessions */}
                <div className="bg-white rounded-xl shadow">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
                  </div>
                  <div className="p-6">
                    {upcomingSessions.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingSessions.map(session => (
                          <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium text-gray-900">{session.title}</h4>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  <span>{session.date}</span>
                                  <span className="mx-2">•</span>
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{session.duration}</span>
                                </div>
                                <div className="mt-2 flex items-center">
                                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                                    <User className="w-3 h-3 text-green-600" />
                                  </div>
                                  <span className="text-sm text-gray-600">{session.counselor}</span>
                                </div>
                              </div>
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                {session.status}
                              </span>
                            </div>
                            <div className="mt-4 flex space-x-2">
                              <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                                Join Session
                              </button>
                              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                                Reschedule
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600">No upcoming sessions scheduled</p>
                        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                          Book a Session
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* Enrolled Programs */}
                
              </div>
              
              {/* Right Column */}
              <div className="space-y-8">
                {/* Recent Sessions */}
               
                
                {/* Resources */}

                
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow">
                  <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                          <Video className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium">Book Session</span>
                      </button>
                      
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium">Join Program</span>
                      </button>
                      
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                          <FileText className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium">Resources</span>
                      </button>
                      
                      <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                          <MessageCircle className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium">Messages</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </Layout>
  );
};

export default PatientDashboard;