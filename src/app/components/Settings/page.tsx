'use client'
import Layout from '../Layout';

const SettingsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            <p className="text-gray-600 text-sm">Update your account information and profile details</p>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
                <span className="text-green-600 text-2xl font-bold">A</span>
              </div>
              <div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm mr-3">
                  Change Photo
                </button>
                <button className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                  Remove
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  defaultValue="Alex"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  defaultValue="Morgan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="alex@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+256 741817334"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Update Profile
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="text-gray-600 text-sm">Manage your password and security settings</p>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Change Password
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mt-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
            <p className="text-gray-600 text-sm">Permanent actions that cannot be undone</p>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-900">Delete Account</h3>
                <p className="text-gray-600 text-sm">Permanently remove your account and all data</p>
              </div>
              <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;