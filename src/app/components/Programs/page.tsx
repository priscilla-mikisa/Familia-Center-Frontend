// 'use client';
// import { Award, BookOpen, Clock } from "lucide-react";
// import Layout from "../Layout";
// import { usePrograms } from "@/app/hooks/usePrograms";

// const ProgramsPage = () => {
//   const { programs, loading, error, enrollInProgram } = usePrograms();

//   return (
//     <Layout>
//       <div className="bg-white rounded-xl shadow">
//         <div className="px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold text-gray-900">Your Programs</h3>
//         </div>
//         <div className="p-6">
//           {loading ? (
//             <div>Loading...</div>
//           ) : error ? (
//             <div>Error: {error}</div>
//           ) : programs.filter(p => p.is_enrolled).length > 0 ? (
//             <div className="space-y-6">
//               {programs.filter(p => p.is_enrolled).map(program => (
//                 <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h4 className="font-medium text-gray-900">{program.title}</h4>
//                       <div className="mt-1 text-sm text-gray-600">
//                         <span className="inline-flex items-center">
//                           <Award className="w-4 h-4 mr-1" />
//                           Week {program.current_week} of {program.total_weeks}
//                         </span>
//                       </div>
//                     </div>
//                     <span className="text-sm font-medium text-green-600">
//                       {Math.round((program.current_week / program.total_weeks) * 100)}%
//                     </span>
//                   </div>
//                   <div className="mt-3">
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div 
//                         className="bg-green-600 h-2 rounded-full" 
//                         style={{ width: `${(program.current_week / program.total_weeks) * 100}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                   <div className="mt-3 text-sm text-gray-600">
//                     <span className="inline-flex items-center">
//                       <Clock className="w-4 h-4 mr-1" />
//                       Next session: {program.next_session ? new Date(program.next_session).toLocaleString() : 'Not scheduled'}
//                     </span>
//                   </div>
//                   <div className="mt-4 flex space-x-2">
//                     <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
//                       Continue Program
//                     </button>
//                     <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
//                       View Materials
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                 <BookOpen className="w-8 h-8 text-gray-400" />
//               </div>
//               <p className="text-gray-600">You haven't enrolled in any programs yet</p>
//               <button 
//                 className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
//                 onClick={() => {
//                   // Example: enroll in first available program
//                   if (programs.length > 0) {
//                     enrollInProgram(programs[0].id);
//                   }
//                 }}
//               >
//                 Browse Programs
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ProgramsPage;

'use client';
import { useCallback, useEffect, useState } from 'react';
import { Award, BookOpen, Clock } from "lucide-react";
import Layout from "../Layout";
import { usePrograms } from "@/app/hooks/usePrograms";
import { CardSkeleton } from '../LoadingSkeleton/page';

const ProgramsPage = () => {
  const { programs: initialPrograms, loading, error, enrollInProgram } = usePrograms();
  const [programs, setPrograms] = useState(initialPrograms);

  useEffect(() => {
    setPrograms(initialPrograms);
  }, [initialPrograms]);

  const handleEnroll = useCallback(async (programId: number) => {
    if (confirm('Demo: Enroll in this program?')) {
      try {
        // Optimistic update
        setPrograms(prev => prev.map(p => 
          p.id === programId ? { ...p, is_enrolled: true, current_week: 1 } : p
        ));
        
        await enrollInProgram(programId);
      } catch (err) {
        // Rollback on error
        setPrograms(initialPrograms);
        alert('Enrollment failed. Please try again.');
        console.log(err);

      }
     
    }
  }, [enrollInProgram, initialPrograms]);

  if (loading) {
    return (
      <Layout>
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Available Programs</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Available Programs</h3>
          </div>
          <div className="p-6 text-red-500">
            Error: {error}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white rounded-xl shadow">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Available Programs</h3>
        </div>
        <div className="p-6">
          {programs.length > 0 ? (
            <div className="space-y-6">
              {programs.map(program => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900">{program.title}</h4>
                      <p className="mt-1 text-sm text-gray-600">{program.description}</p>
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="inline-flex items-center mr-4">
                          <Award className="w-4 h-4 mr-1" />
                          {program.total_weeks} weeks
                        </span>
                        <span className="inline-flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {program.resources_count} resources
                        </span>
                      </div>
                    </div>
                    {program.is_enrolled ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        Enrolled
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleEnroll(program.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                      >
                        Enroll
                      </button>
                    )}
                  </div>
                  
                  {program.is_enrolled && (
                    <>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>
                            Week {program.current_week} of {program.total_weeks}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(program.current_week / program.total_weeks) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {program.next_session && (
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="inline-flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Next session: {new Date(program.next_session).toLocaleString()}
                          </span>
                        </div>
                      )}
                      
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                          Continue
                        </button>
                        <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                          Resources
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No programs available at this time</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProgramsPage;