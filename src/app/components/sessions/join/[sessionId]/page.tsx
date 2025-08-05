// // app/sessions/join/[sessionId]/page.tsx
// 'use client';

// import { useParams } from 'next/navigation';
// import Layout from '@/app/components/Layout';

// export default function JoinSessionPage() {
//   const { sessionId } = useParams();

//   return (
//     <Layout>
//       <div className="max-w-3xl mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-6">Join Session</h1>
//         <div className="bg-white rounded-lg shadow p-6">
//           <p className="mb-4">You are about to join session: {sessionId}</p>
//           <div className="bg-blue-50 p-4 rounded-lg mb-6">
//             <p className="text-blue-700">This would be where your video call interface would appear in a real application.</p>
//           </div>
//           <button 
//             className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             onClick={() => alert(`Joining session ${sessionId}`)}
//           >
//             Connect Now
//           </button>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// app/sessions/join/[sessionId]/page.tsx

'use client';

import { useParams, useRouter } from 'next/navigation';
import { Video, Mic, MicOff, VideoOff, PhoneOff, User, Clock, Calendar } from 'lucide-react';
import Layout from '@/app/components/Layout';
import { useState } from 'react';

export default function JoinSessionPage() {
  const { sessionId } = useParams();
  const router = useRouter();
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [connecting, setConnecting] = useState(false);

  // Mock session data
  const sessionData = {
    id: sessionId,
    title: "Initial Consultation",
    counselor: "Dr. Sarah Johnson",
    date: new Date(Date.now() + 86400000),
    duration: 45,
    status: "Starting soon"
  };

  const handleJoinSession = () => {
    setConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      alert(`Successfully joined session ${sessionId}`);
      setConnecting(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Video Call Section */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">Join Your Session</h1>
            <p className="text-gray-600 mb-6">Connect with your counselor for your scheduled appointment</p>
            
            <div className="bg-gray-900 rounded-xl overflow-hidden aspect-video relative">
              {/* Video placeholder with counselor info */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <div className="text-center">
                  <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-medium text-white">{sessionData.counselor}</h3>
                  <p className="text-gray-300 mt-1">{sessionData.status}</p>
                </div>
              </div>
              
              {/* Local video preview (would be user's camera in real app) */}
              {!videoOff && (
                <div className="absolute bottom-4 right-4 w-1/4 h-1/4 bg-gray-700 rounded-lg overflow-hidden border-2 border-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            {/* Call controls */}
            <div className="flex justify-center gap-4 mt-6">
              <button 
                className={`p-3 rounded-full ${micMuted ? 'bg-red-500' : 'bg-gray-200'} hover:bg-gray-300 transition-colors`}
                onClick={() => setMicMuted(!micMuted)}
              >
                {micMuted ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button 
                className={`p-3 rounded-full ${videoOff ? 'bg-red-500' : 'bg-gray-200'} hover:bg-gray-300 transition-colors`}
                onClick={() => setVideoOff(!videoOff)}
              >
                {videoOff ? <VideoOff className="w-5 h-5 text-white" /> : <Video className="w-5 h-5" />}
              </button>
              
              <button 
                className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
                onClick={() => router.push('/dashboard')}
              >
                <PhoneOff className="w-5 h-5" />
              </button>
              
              <button 
                className={`px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium flex items-center gap-2 ${connecting ? 'opacity-75' : ''}`}
                onClick={handleJoinSession}
                disabled={connecting}
              >
                {connecting ? (
                  <>
                    <span className="animate-spin">↻</span> Connecting...
                  </>
                ) : (
                  <>
                    <Video className="w-5 h-5" /> Join Now
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Session Details Sidebar */}
          <div className="lg:w-80 bg-white rounded-xl shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Session Details</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">{sessionData.title}</h3>
                <p className="text-gray-600 text-sm">Session ID: {sessionData.id}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-gray-900">
                    {sessionData.date.toLocaleDateString()} at {formatTime(sessionData.date)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="text-gray-900">{sessionData.duration} minutes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Counselor</p>
                  <p className="text-gray-900">{sessionData.counselor}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Need help?</h4>
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  Contact support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}