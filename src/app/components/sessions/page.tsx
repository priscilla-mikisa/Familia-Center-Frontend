'use client';
import { Calendar, Clock, User, Video, BookOpen, FileText, MessageCircle } from "lucide-react";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [stats, setStats] = useState({
    totalSessions: 12,
    activePrograms: 3,
    resources: 24,
    newMessages: 2
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUpcomingSessions([
        {
          id: '1',
          title: 'Initial Consultation',
          date: new Date(Date.now() + 86400000),
          duration: 45,
          counselor: 'Dr. Sarah Johnson',
          status: 'Scheduled'
        },
        {
          id: '2',
          title: 'Follow-up Session',
          date: new Date(Date.now() + 172800000),
          duration: 30,
          counselor: 'Dr. Michael Chen',
          status: 'Confirmed'
        }
      ]);

      setSessions([
        {
          id: '3',
          title: 'First Therapy Session',
          date: new Date(Date.now() - 86400000),
          duration: 60,
          counselor: 'Dr. Emily Wilson',
          status: 'Completed'
        }
      ]);

      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { upcomingSessions, sessions, stats, loading, error };
};

const SessionsPage = () => {
  const router = useRouter();
  const { 
    upcomingSessions = [], 
    sessions = [], 
    stats,
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
      return isNaN(date.getTime()) ? 'Invalid date' : date.toLocaleDateString();
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
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
              <p className="max-w-xl">Your journey to stronger relationships and personal growth continues.</p>
            </div>
            <button 
              className="mt-4 md:mt-0 px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              onClick={() => window.scrollTo({ top: document.getElementById('upcoming-sessions')?.offsetTop, behavior: 'smooth' })}
            >
              View Upcoming Sessions
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <Video className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Sessions</p>
                <p className="text-xl font-bold">{stats.totalSessions}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Programs</p>
                <p className="text-xl font-bold">{stats.activePrograms}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resources</p>
                <p className="text-xl font-bold">{stats.resources}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <MessageCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Messages</p>
                <p className="text-xl font-bold">{stats.newMessages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl shadow" id="upcoming-sessions">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Sessions</h2>
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
                          <h3 className="font-medium text-gray-900">{content.title}</h3>
                          <div className="flex items-center mt-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{content.duration} mins</span>
                            <span className="mx-2">•</span>
                            <User className="w-4 h-4 mr-1" />
                            <span>{content.counselor}</span>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{safeFormatDate(content.date)}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {content.status}
                        </span>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button 
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                          onClick={() => router.push(`/sessions/join/${content.id}`)}
                        >
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

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => router.push('/sessions/book')}
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Video className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm font-medium">Book Session</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => router.push('/programs')}
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Join Program</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => router.push('/resources')}
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Resources</span>
              </button>
              
              <button 
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                onClick={() => router.push('/messages')}
              >
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm font-medium">Messages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SessionsPage;