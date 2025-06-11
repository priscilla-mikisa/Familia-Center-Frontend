'use client'
import Layout from '../Layout';

const MessagesPage = () => {
  const conversations = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      lastMessage: "Looking forward to our session tomorrow",
      time: "10:30 AM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      lastMessage: "Here's the resource I mentioned",
      time: "Yesterday",
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: "Support Team",
      lastMessage: "Your request has been processed",
      time: "Jun 10",
      unread: 0,
      online: false
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row h-[calc(100vh-150px)]">
        {/* Conversations List */}
        <div className="w-full md:w-1/3 border-r">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Messages</h1>
          </div>
          <div className="overflow-y-auto">
            {conversations.map(conversation => (
              <div key={conversation.id} className="p-4 border-b hover:bg-gray-50 cursor-pointer flex items-start">
                <div className="relative mr-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="ml-2 flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-xs text-white font-medium">
                    {conversation.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conversation View */}
        <div className="w-full md:w-2/3 flex flex-col">
          <div className="p-4 border-b flex items-center">
            <div className="relative mr-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold">DJ</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Dr. Sarah Johnson</h3>
              <p className="text-sm text-gray-600">Online now</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {/* Received messages */}
              <div className="flex">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-green-600 text-xs">SJ</span>
                </div>
                <div>
                  <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                    <p>Hi Alex, how are you feeling after our last session?</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">10:15 AM</p>
                </div>
              </div>

              {/* Sent messages */}
              <div className="flex justify-end">
                <div className="flex flex-col items-end">
                  <div className="bg-green-600 text-white rounded-lg rounded-tr-none p-4 shadow-sm max-w-md">
                    <p>Much better, thank you! The exercises you suggested really helped.</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">10:18 AM</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                  <span className="text-blue-600 text-xs">A</span>
                </div>
              </div>

              <div className="flex">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-green-600 text-xs">SJ</span>
                </div>
                <div>
                  <div className="bg-white rounded-lg rounded-tl-none p-4 shadow-sm max-w-md">
                    <p>That's great to hear! I'm looking forward to our session tomorrow at 10 AM.</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 text-white px-6 py-3 rounded-r-lg hover:bg-green-700">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;