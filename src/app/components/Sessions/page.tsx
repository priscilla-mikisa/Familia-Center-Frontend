'use client';

import { Calendar, Clock, User } from "lucide-react";
import Layout from "../Layout";


const Sessions = () => {
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

      const recentSessions = [
        {
          id: 1,
          title: "Individual Therapy",
          date: "June 5, 2025",
          duration: "45 mins",
          counselor: "Dr. Emily Rodriguez",
          status: "Completed"
        },
        {
          id: 2,
          title: "Couples Counseling",
          date: "May 28, 2025",
          duration: "60 mins",
          counselor: "Dr. James Wilson",
          status: "Completed"
        }
      ];
    
    
  return (
    <Layout>
    <div className="space-y-8">
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
                 <div className="bg-white rounded-xl shadow">
                                  <div className="px-6 py-4 border-b">
                                    <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
                                  </div>
                                  <div className="p-6">
                                    {recentSessions.length > 0 ? (
                                      <div className="space-y-4">
                                        {recentSessions.map(session => (
                                          <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                              <div>
                                                <h4 className="font-medium text-gray-900">{session.title}</h4>
                                                <div className="mt-1 text-sm text-gray-600">
                                                  <span className="inline-flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    {session.date}
                                                  </span>
                                                </div>
                                              </div>
                                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                                                {session.status}
                                              </span>
                                            </div>
                                            <div className="mt-3 flex items-center text-sm text-gray-600">
                                              <User className="w-4 h-4 mr-1" />
                                              <span>{session.counselor}</span>
                                            </div>
                                            <div className="mt-3 flex space-x-2">
                                              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                                                View Notes
                                              </button>
                                              <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                                                Watch Recording
                                              </button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="text-center py-8">
                                        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                          <Clock className="w-8 h-8 text-gray-400" />
                                        </div>
                                        <p className="text-gray-600">No recent sessions</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                </div>
                                </Layout>
  );
}
export default Sessions;

