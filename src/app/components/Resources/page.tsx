'use client';
import { usePrograms } from "@/app/hooks/usePrograms";
import Layout from "../Layout";

const ResourcesPage = () => {
  const { resources, loading, error } = usePrograms();

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
            {loading ? (
              <div className="p-4 text-center">Loading resources...</div>
            ) : error ? (
              <div className="p-4 text-red-500">Error: {error}</div>
            ) : resources.length > 0 ? (
              resources.map(resource => (
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
                      {/* <span>{resource}</span> */}
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
              ))
            ) : (
              <div className="p-4 text-center text-gray-600">No resources available</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;