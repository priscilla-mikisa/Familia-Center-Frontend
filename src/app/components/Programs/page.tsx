'use client';
import { Award, BookOpen, Clock} from "lucide-react";
import Layout from "../Layout";


const Header = () => {
    const enrolledPrograms = [
        {
          id: 1,
          title: "Marriage & Relationships",
          progress: 60,
          weeks: "Week 4 of 6",
          nextSession: "June 18, 3:00 PM"
        },
        {
          id: 2,
          title: "Parenting Excellence",
          progress: 30,
          weeks: "Week 2 of 6",
          nextSession: "June 20, 10:00 AM"
        }
      ];
    
  return (
    <Layout>
    <div className="bg-white rounded-xl shadow">
                      <div className="px-6 py-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900">Your Programs</h3>
                      </div>
                      <div className="p-6">
                        {enrolledPrograms.length > 0 ? (
                          <div className="space-y-6">
                            {enrolledPrograms.map(program => (
                              <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium text-gray-900">{program.title}</h4>
                                    <div className="mt-1 text-sm text-gray-600">
                                      <span className="inline-flex items-center">
                                        <Award className="w-4 h-4 mr-1" />
                                        {program.weeks}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-sm font-medium text-green-600">{program.progress}%</span>
                                </div>
                                <div className="mt-3">
                                  <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-600 h-2 rounded-full" 
                                      style={{ width: `${program.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="mt-3 text-sm text-gray-600">
                                  <span className="inline-flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    Next session: {program.nextSession}
                                  </span>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                                    Continue Program
                                  </button>
                                  <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                                    View Materials
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <BookOpen className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-600">You haven&apos;t enrolled in any programs yet</p>
                            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                              Browse Programs
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    </Layout>
  );
}
export default Header;