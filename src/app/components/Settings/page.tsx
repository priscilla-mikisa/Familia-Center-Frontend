'use client';
import { useUser } from '@/app/hooks/useUser';
import Layout from '../Layout';

const SettingsPage = () => {
  const { user, loading, error, updateUser } = useUser();

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    
    const updatedData = {
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    };

    try {
      if (user) {
        await updateUser(user.id, updatedData);
      } else {
        alert('User data is not available.');
      }
      alert('Profile updated successfully!');
    } catch (err) {
      alert(`Error updating profile: ${(err as Error).message}`);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData);
    

    alert('Password change functionality to be implemented');
  };

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (error) return <Layout><div>Error: {error}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
        
        {/* Profile Information */}
        <form onSubmit={handleProfileUpdate}>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Profile Information</h2>
              <p className="text-gray-600 text-sm">Update your account information and profile details</p>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
                  <span className="text-green-600 text-2xl font-bold">
                    {user?.first_name?.[0]}{user?.last_name?.[0]}
                  </span>
                </div>
                <div>
                  <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm mr-3">
                    Change Photo
                  </button>
                  <button type="button" className="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-50 text-sm">
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    defaultValue={user?.first_name || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    defaultValue={user?.last_name || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={user?.email || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={user?.phone || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Update Profile
              </button>
            </div>
          </div>
        </form>
        
        {/* Security */}
        <form onSubmit={handlePasswordChange}>
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
                  name="current_password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="new_password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Change Password
              </button>
            </div>
          </div>
        </form>
        
        {/* Danger Zone */}
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
              <button 
                type="button"
                className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
              >
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