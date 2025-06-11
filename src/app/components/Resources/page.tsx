// 'use client';

// import { FileText } from "lucide-react";
// import Layout from "../Layout";


// const Header = () => {
//  const resources = [
//     {
//       id: 1,
//       title: "Communication Techniques Guide",
//       type: "PDF",
//       category: "Marriage Counseling",
//       size: "2.4 MB"
//     },
//     {
//       id: 2,
//       title: "Child Development Milestones",
//       type: "PDF",
//       category: "Parenting",
//       size: "1.8 MB"
//     },
//     {
//       id: 3,
//       title: "Mindfulness Meditation Audio",
//       type: "MP3",
//       category: "Stress Management",
//       size: "15.2 MB"
//     }
//   ];
 
//   return (
//     <Layout>
//     <div className="bg-white rounded-xl shadow">
//     <div className="px-6 py-4 border-b">
//       <h3 className="text-lg font-semibold text-gray-900">Recommended Resources</h3>
//     </div>
//     <div className="p-6">
//       {resources.length > 0 ? (
//         <div className="space-y-4">
//           {resources.map(resource => (
//             <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
//               <div className="flex items-start">
//                 <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
//                   <FileText className="w-5 h-5 text-green-600" />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900">{resource.title}</h4>
//                   <div className="mt-1 text-sm text-gray-600">
//                     <span className="inline-block bg-gray-100 rounded px-2 py-1 text-xs">
//                       {resource.type}
//                     </span>
//                     <span className="ml-2">{resource.category}</span>
//                     <span className="ml-2">•</span>
//                     <span className="ml-2">{resource.size}</span>
//                   </div>
//                 </div>
//               </div>
//               <button className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm">
//                 Download
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-8">
//           <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//             <FileText className="w-8 h-8 text-gray-400" />
//           </div>
//           <p className="text-gray-600">No resources available</p>
//         </div>
//       )}
//     </div>
//   </div>
//   </Layout>
//   );
// }
// export default Header;

// app/components/Resources/page.tsx
"use client"

import Layout from "../Layout";

const ResourcesPage = () => {
  const resources = [
    {
      id: 1,
      title: "Communication Techniques Guide",
      type: "PDF",
      category: "Marriage Counseling",
      size: "2.4 MB"
    },
    {
      id: 2,
      title: "Child Development Milestones",
      type: "PDF",
      category: "Parenting",
      size: "1.8 MB"
    },
    {
      id: 3,
      title: "Mindfulness Meditation Audio",
      type: "MP3",
      category: "Stress Management",
      size: "15.2 MB"
    },
    {
      id: 4,
      title: "Conflict Resolution Workbook",
      type: "PDF",
      category: "Relationships",
      size: "3.1 MB"
    },
    {
      id: 5,
      title: "Parenting Styles Assessment",
      type: "PDF",
      category: "Parenting",
      size: "1.2 MB"
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Resources Library</h1>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
            New Resource
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b flex items-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>All Categories</option>
                <option>Marriage Counseling</option>
                <option>Parenting</option>
                <option>Stress Management</option>
                <option>Relationships</option>
              </select>
            </div>
          </div>
          
          <div className="divide-y">
            {resources.map(resource => (
              <div key={resource.id} className="p-4 flex items-start hover:bg-gray-50 transition-colors">
                <div className="mr-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    resource.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {resource.type === 'PDF' ? (
                      <span className="text-red-600 font-bold text-sm">PDF</span>
                    ) : (
                      <span className="text-blue-600 font-bold text-sm">MP3</span>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{resource.title}</h3>
                  <div className="mt-1 text-sm text-gray-600">
                    <span className="inline-block bg-gray-100 rounded px-2 py-1 text-xs mr-2">
                      {resource.category}
                    </span>
                    <span>{resource.size}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;