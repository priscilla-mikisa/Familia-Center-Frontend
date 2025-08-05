'use client';
import { Calendar, Video, BookOpen, FileText, MessageCircle, User, Clock } from 'lucide-react';
import Header from '../Header';
import Layout from '../Layout';
import { useEffect, useState } from 'react';

type Session = {
  id: string;
  title?: string;
  start_time?: string | Date;
  duration?: number;
  counselor?: string;
  status?: string;
  message?: string;
} | string;

type Program = {
  id: string;
  session_count?: number;
  resources_count?: number;
  is_enrolled?: boolean;
};

const useMockSessions = () => {
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(setError);


  useEffect(() => {
    setLoading(true);
    // Simulate loading
    const timer = setTimeout(() => {
      setUpcomingSessions([
        {
          id: '1',
          title: 'Initial Consultation',
          start_time: new Date(Date.now() + 86400000), // Tomorrow
          duration: 45,
          counselor: 'Dr. Sarah Johnson',
          status: 'Scheduled'
        },
        {
          id: '2',
          title: 'Follow-up Session',
          start_time: new Date(Date.now() + 172800000), // Day after tomorrow
          duration: 30,
          counselor: 'Dr. Michael Chen',
          status: 'Confirmed'
        }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { upcomingSessions, loading, error };
};

const useMockPrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(setError);
  

  useEffect(() => {
    setLoading(true);
    // Simulate loading
    const timer = setTimeout(() => {
      setPrograms([
        {
          id: '1',
          session_count: 5,
          resources_count: 12,
          is_enrolled: true
        },
        {
          id: '2',
          session_count: 8,
          resources_count: 15,
          is_enrolled: false
        }
      ]);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { programs, loading, error };
};

const PatientDashboard = () => {
  const { upcomingSessions = [], loading: sessionsLoading } = useMockSessions();
  const { programs = [] } = useMockPrograms();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatSessionDate = (dateInput: string | Date | undefined) => {
    if (!isClient || !dateInput) return 'Date not available';
    try {
      const date = new Date(dateInput);
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleString();
    } catch {
      return 'Date error';
    }
  };
 console.log(formatSessionDate);
 
  // Calculate stats from mock data
  const totalSessions = upcomingSessions.length + (programs?.reduce((acc, program) => acc + (program.session_count || 0), 0) || 0);
  const activePrograms = programs?.filter(p => p.is_enrolled).length || 0;
  const totalResources = programs?.reduce((acc, program) => acc + (program.resources_count || 0), 0) || 0;

  const renderSessionContent = (session: Session) => {
    if (typeof session === 'string') {
      return {
        id: session,
        title: 'Session',
        date: null,
        duration: 'N/A',
        counselor: 'Counselor not specified',
        status: 'Scheduled'
      };
    }

    return {
      id: session.id,
      title: session.title || 'Session',
      date: session.start_time || 'Date not available',
      duration: session.duration ? `${session.duration} mins` : 'N/A',
      counselor: session.counselor || 'Counselor not specified',
      status: session.status || 'Scheduled'
    };
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
                    <p className="max-w-xl">Your journey to stronger relationships and personal growth continues.</p>
                  </div>
                  <button className="mt-4 md:mt-0 px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    View Upcoming Sessions
                  </button>
                </div>
              </div>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Sessions Card */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Sessions</p>
                      <p className="text-2xl font-bold mt-1">{totalSessions}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Video className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
                
                {/* Active Programs Card */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Active Programs</p>
                      <p className="text-2xl font-bold mt-1">{activePrograms}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                
                {/* Resources Card */}
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Resources</p>
                      <p className="text-2xl font-bold mt-1">{totalResources}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                {/* Messages Card */}
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
                      {sessionsLoading ? (
                        <div className="flex justify-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                        </div>
                      ) : upcomingSessions.length > 0 ? (
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
                                      {/* <span>{formatSessionDate(content.date?.t)}</span> */}
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
                </div>
                
                {/* Right Column */}
                <div className="space-y-8">
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

// 'use client';
// import { Calendar, Video, BookOpen, FileText, MessageCircle, User, Clock } from 'lucide-react';
// import Header from '../Header';
// import Layout from '../Layout';
// import { useSessions } from '@/app/hooks/useSessions';
// import { usePrograms } from '@/app/hooks/usePrograms';

// const PatientDashboard = () => {
//   const { upcomingSessions, loading: sessionsLoading, error: sessionsError, demoBookFirstAvailable } = useSessions();
//   const { programs, loading: programsLoading, error: programsError, enrollInProgram } = usePrograms();

//   // Calculate stats
//   const totalSessions = upcomingSessions.length + (programs.reduce((acc, program) => acc + program.session_count, 0));
//   const activePrograms = programs.filter(p => p.is_enrolled).length;
//   const totalResources = programs.reduce((acc, program) => acc + program.resources_count, 0);

//   const handleQuickAction = (action: string) => {
//     switch(action) {
//       case 'book':
//         demoBookFirstAvailable();
//         break;
//       case 'program':
//         if (programs.length > 0) {
//           const firstAvailable = programs.find(p => !p.is_enrolled);
//           if (firstAvailable) {
//             enrollInProgram(firstAvailable.id);
//           } else {
//             alert('You are enrolled in all available programs');
//           }
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <Layout>
//       <div className="min-h-screen bg-gray-50 flex">
//         <div className="flex-1 flex flex-col overflow-hidden">
//           <Header />
          
//           <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
//             <div className="max-w-7xl mx-auto">
//               {/* Welcome Banner */}
//               <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 mb-8 text-white">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between">
//                   <div>
//                     <h2 className="text-2xl font-bold mb-2">Welcome back, User</h2>
//                     <p className="max-w-xl">Your journey to stronger relationships and personal growth continues.</p>
//                   </div>
//                   <button 
//                     onClick={() => demoBookFirstAvailable()}
//                     className="mt-4 md:mt-0 px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
//                   >
//                     Book Demo Session
//                   </button>
//                 </div>
//               </div>
              
//               {/* Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                 {/* Total Sessions Card */}
//                 <div className="bg-white rounded-xl shadow p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500">Total Sessions</p>
//                       <p className="text-2xl font-bold mt-1">{totalSessions}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                       <Video className="w-6 h-6 text-green-600" />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Active Programs Card */}
//                 <div className="bg-white rounded-xl shadow p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500">Active Programs</p>
//                       <p className="text-2xl font-bold mt-1">{activePrograms}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                       <BookOpen className="w-6 h-6 text-blue-600" />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Resources Card */}
//                 <div className="bg-white rounded-xl shadow p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500">Resources</p>
//                       <p className="text-2xl font-bold mt-1">{totalResources}</p>
//                     </div>
//                     <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                       <FileText className="w-6 h-6 text-purple-600" />
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Messages Card */}
//                 <div className="bg-white rounded-xl shadow p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-500">New Messages</p>
//                       <p className="text-2xl font-bold mt-1">3</p>
//                     </div>
//                     <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
//                       <MessageCircle className="w-6 h-6 text-yellow-600" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Main Content Grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Left Column */}
//                 <div className="lg:col-span-2 space-y-8">
//                   {/* Upcoming Sessions */}
//                   <div className="bg-white rounded-xl shadow">
//                     <div className="px-6 py-4 border-b">
//                       <h3 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h3>
//                     </div>
//                     <div className="p-6">
//                       {sessionsLoading ? (
//                         <div className="flex justify-center py-8">
//                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//                         </div>
//                       ) : sessionsError ? (
//                         <div className="text-red-500 p-4">{sessionsError}</div>
//                       ) : upcomingSessions.length > 0 ? (
//                         <div className="space-y-4">
//                           {upcomingSessions.map(session => (
//                             <div key={session} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                               <div className="flex justify-between items-start">
//                                 <div>
//                                   <h4 className="font-medium text-gray-900">{session}</h4>
//                                   <div className="flex items-center mt-1 text-sm text-gray-500">
//                                     <Calendar className="w-4 h-4 mr-1" />
//                                     <span>{new Date(session).toLocaleString()}</span>
//                                     <span className="mx-2">•</span>
//                                     <Clock className="w-4 h-4 mr-1" />
//                                     <span>{session} mins</span>
//                                   </div>
//                                   <div className="mt-2 flex items-center">
//                                     <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
//                                       <User className="w-3 h-3 text-green-600" />
//                                     </div>
//                                     <span className="text-sm text-gray-600">{session}</span>
//                                   </div>
//                                 </div>
//                                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
//                                   Scheduled
//                                 </span>
//                               </div>
//                               <div className="mt-4 flex space-x-2">
//                                 <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
//                                   Join Session
//                                 </button>
//                                 <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//                                   Reschedule
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center py-8">
//                           <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                             <Calendar className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <p className="text-gray-600">No upcoming sessions scheduled</p>
//                           <button 
//                             onClick={() => demoBookFirstAvailable()}
//                             className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
//                           >
//                             Book a Session
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Right Column */}
//                 <div className="space-y-8">
//                   {/* Quick Actions */}
//                   <div className="bg-white rounded-xl shadow">
//                     <div className="px-6 py-4 border-b">
//                       <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
//                     </div>
//                     <div className="p-6">
//                       <div className="grid grid-cols-2 gap-4">
//                         <button 
//                           onClick={() => handleQuickAction('book')}
//                           className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
//                         >
//                           <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
//                             <Video className="w-5 h-5 text-green-600" />
//                           </div>
//                           <span className="text-sm font-medium">Book Session</span>
//                         </button>
                        
//                         <button 
//                           onClick={() => handleQuickAction('program')}
//                           className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
//                         >
//                           <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
//                             <BookOpen className="w-5 h-5 text-blue-600" />
//                           </div>
//                           <span className="text-sm font-medium">Join Program</span>
//                         </button>
                        
//                         <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                           <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
//                             <FileText className="w-5 h-5 text-purple-600" />
//                           </div>
//                           <span className="text-sm font-medium">Resources</span>
//                         </button>
                        
//                         <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                           <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
//                             <MessageCircle className="w-5 h-5 text-yellow-600" />
//                           </div>
//                           <span className="text-sm font-medium">Messages</span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Active Programs */}
//                   <div className="bg-white rounded-xl shadow">
//                     <div className="px-6 py-4 border-b">
//                       <h3 className="text-lg font-semibold text-gray-900">Your Programs</h3>
//                     </div>
//                     <div className="p-6">
//                       {programsLoading ? (
//                         <div className="flex justify-center py-8">
//                           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
//                         </div>
//                       ) : programsError ? (
//                         <div className="text-red-500 p-4">{programsError}</div>
//                       ) : programs.filter(p => p.is_enrolled).length > 0 ? (
//                         <div className="space-y-4">
//                           {programs.filter(p => p.is_enrolled).slice(0, 2).map(program => (
//                             <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                               <div className="flex justify-between items-start">
//                                 <div>
//                                   <h4 className="font-medium text-gray-900">{program.title}</h4>
//                                   <div className="mt-1 text-sm text-gray-600">
//                                     <span className="inline-flex items-center">
//                                       Week {program.current_week} of {program.total_weeks}
//                                     </span>
//                                   </div>
//                                 </div>
//                                 <span className="text-sm font-medium text-green-600">
//                                   {Math.round((program.current_week / program.total_weeks) * 100)}%
//                                 </span>
//                               </div>
//                               <div className="mt-3">
//                                 <div className="w-full bg-gray-200 rounded-full h-2">
//                                   <div 
//                                     className="bg-green-600 h-2 rounded-full" 
//                                     style={{ width: `${(program.current_week / program.total_weeks) * 100}%` }}
//                                   ></div>
//                                 </div>
//                               </div>
//                               {program.next_session && (
//                                 <div className="mt-3 text-sm text-gray-600">
//                                   <span className="inline-flex items-center">
//                                     <Clock className="w-4 h-4 mr-1" />
//                                     Next session: {new Date(program.next_session).toLocaleString()}
//                                   </span>
//                                 </div>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       ) : (
//                         <div className="text-center py-8">
//                           <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                             <BookOpen className="w-8 h-8 text-gray-400" />
//                           </div>
//                           <p className="text-gray-600">You haven&apos;t enrolled in any programs yet</p>
//                           <button 
//                             onClick={() => handleQuickAction('program')}
//                             className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
//                           >
//                             Browse Programs
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default PatientDashboard;