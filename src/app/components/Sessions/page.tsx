'use client';
import { Calendar, Clock, User } from "lucide-react";
import Layout from "../Layout";
import { useEffect, useState } from "react";

type Session = {
  id?: string;
  title?: string;
  date?: string | Date;
  start_time?: string | Date;
  duration?: string | number;
  counselor?: string;
  status?: string;
} | string;

const useMockSessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(setError);


  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setUpcomingSessions([
        {
          id: '1',
          title: 'Initial Consultation',
          date: new Date(Date.now() + 86400000), // Tomorrow
          duration: 45,
          counselor: 'Dr. Sarah Johnson',
          status: 'Scheduled'
        },
        {
          id: '2',
          title: 'Follow-up Session',
          date: new Date(Date.now() + 172800000), // Day after tomorrow
          duration: 30,
          counselor: 'Dr. Michael Chen',
          status: 'Confirmed'
        }
      ]);

      setSessions([
        {
          id: '3',
          title: 'First Therapy Session',
          date: new Date(Date.now() - 86400000), // Yesterday
          duration: 60,
          counselor: 'Dr. Emily Wilson',
          status: 'Completed'
        },
        {
          id: '4',
          title: 'Assessment Session',
          date: new Date(Date.now() - 259200000), // 3 days ago
          duration: 90,
          counselor: 'Dr. James Peterson',
          status: 'Completed'
        }
      ]);

      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { upcomingSessions, sessions, loading, error };
};

const SessionsPage = () => {
  const { 
    upcomingSessions = [], 
    sessions = [], 
    loading, 
    error 
  } = useMockSessions();
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const safeFormatDate = (dateString: string | number | Date | null | undefined) => {
    if (!isClient || !dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleString();
    } catch {
      return 'Date error';
    }
  };

  const renderSessionContent = (session: Session) => {
    if (typeof session === 'string') {
      return {
        id: Math.random().toString(36).substring(2, 9),
        title: session,
        date: null,
        duration: 'N/A',
        counselor: 'Counselor not specified',
        status: 'Status unknown'
      };
    }
    
    return {
      id: session?.id || Math.random().toString(36).substring(2, 9),
      title: session?.title || 'Session',
      date: session?.date || session?.start_time || null,
      duration: session?.duration || 'N/A',
      counselor: session?.counselor || 'Counselor not specified',
      status: session?.status || 'Status unknown'
    };
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{String(error)}</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
          </div>
          <div className="p-6">
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map(session => {
                  const content = renderSessionContent(session);
                  return (
                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{content.title}</h4>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{safeFormatDate(content.date)}</span>
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{content.duration}</span>
                          </div>
                          <div className="mt-2 flex items-center">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                              <User className="w-3 h-3 text-green-600" />
                            </div>
                            <span className="text-sm text-gray-600">{content.counselor}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {content.status}
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
                  );
                })}
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
        
        {/* Recent Sessions */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
          </div>
          <div className="p-6">
            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map(session => {
                  const content = renderSessionContent(session);
                  return (
                    <div key={content.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{content.title}</h4>
                          <div className="mt-1 text-sm text-gray-600">
                            <span className="inline-flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {safeFormatDate(content.date)}
                            </span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                          Completed
                        </span>
                      </div>
                      <div className="mt-3 flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        <span>{content.counselor}</span>
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
                  );
                })}
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
};

export default SessionsPage;

// 'use client';
// import { useMemo } from 'react';
// import { Calendar, Clock, User } from "lucide-react";
// import Layout from "../Layout";
// import { useSessions } from "@/app/hooks/useSessions";
// import { SessionsSkeleton } from '../LoadingSkeleton';

// const SessionsPage = () => {
//   const { 
//     sessions, 
//     upcomingSessions, 
//     loading, 
//     error, 
//     bookSession: demoBookFirstAvailable,
//   } = useSessions();

//   const pastSessions = useMemo(() => {
//     return sessions.filter(s => new Date(s) < new Date()).slice(0, 3);
//   }, [sessions]);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="space-y-8">
//           <div className="bg-white rounded-xl shadow">
//             <div className="px-6 py-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
//             </div>
//             <div className="p-6">
//               <SessionsSkeleton />
//             </div>
//           </div>
//           <div className="bg-white rounded-xl shadow">
//             <div className="px-6 py-4 border-b">
//               <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
//             </div>
//             <div className="p-6">
//               <SessionsSkeleton />
//             </div>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   if (error) {
//     return (
//       <Layout>
//         <div className="bg-white rounded-xl shadow">
//           <div className="px-6 py-4 border-b">
//             <h3 className="text-lg font-semibold text-gray-900">Sessions</h3>
//           </div>
//           <div className="p-6 text-red-500">
//             Error: {error}
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="space-y-8">
//         {/* Upcoming Sessions */}
//         <div className="bg-white rounded-xl shadow">
//           <div className="px-6 py-4 border-b">
//             <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
//           </div>
//           <div className="p-6">
//             {upcomingSessions.length > 0 ? (
//               <div className="space-y-4">
//                 {upcomingSessions.map(session => (
//                   <div key={session} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-medium text-gray-900">{session}</h4>
//                         <div className="flex items-center mt-1 text-sm text-gray-500">
//                           <Calendar className="w-4 h-4 mr-1" />
//                           <span>{new Date(session).toLocaleString()}</span>
//                           <span className="mx-2">•</span>
//                           <Clock className="w-4 h-4 mr-1" />
//                           <span>{session} mins</span>
//                         </div>
//                         <div className="mt-2 flex items-center">
//                           <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
//                             <User className="w-3 h-3 text-green-600" />
//                           </div>
//                           <span className="text-sm text-gray-600">{session}</span>
//                         </div>
//                       </div>
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                         Scheduled
//                       </span>
//                     </div>
//                     <div className="mt-4 flex space-x-2">
//                       <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
//                         Join Session
//                       </button>
//                       <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//                         Reschedule
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Calendar className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-gray-600">No upcoming sessions scheduled</p>
//                 <button 
//                   onClick={() => demoBookFirstAvailable()}
//                   className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
//                 >
//                   Book a Session
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
        
//         {/* Recent Sessions */}
//         <div className="bg-white rounded-xl shadow">
//           <div className="px-6 py-4 border-b">
//             <h3 className="text-lg font-semibold text-gray-900">Recent Sessions</h3>
//           </div>
//           <div className="p-6">
//             {pastSessions.length > 0 ? (
//               <div className="space-y-4">
//                 {pastSessions.map(session => (
//                   <div key={session} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <h4 className="font-medium text-gray-900">{session}</h4>
//                         <div className="mt-1 text-sm text-gray-600">
//                           <span className="inline-flex items-center">
//                             <Calendar className="w-4 h-4 mr-1" />
//                             {new Date(session).toLocaleString()}
//                           </span>
//                         </div>
//                       </div>
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
//                         Completed
//                       </span>
//                     </div>
//                     <div className="mt-3 flex items-center text-sm text-gray-600">
//                       <User className="w-4 h-4 mr-1" />
//                       <span>{session}</span>
//                     </div>
//                     <div className="mt-3 flex space-x-2">
//                       <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//                         View Notes
//                       </button>
//                       <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//                         Watch Recording
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                   <Clock className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <p className="text-gray-600">No recent sessions</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default SessionsPage;