export const demoDatabase = {
    users: [
      {
        id: 1,
        first_name: 'Alex',
        last_name: 'Morgan',
        email: 'alex@example.com',
        phone: '+254712345678',
        role: 'patient',
      },
      {
        id: 2,
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah@mytherapist.ng',
        role: 'counselor',
        specialization: 'Marriage Counseling',
      },
      {
        id: 3,
        first_name: 'Michael',
        last_name: 'Chen',
        email: 'michael@mytherapist.ng',
        role: 'counselor',
        specialization: 'Child Psychology',
      },
    ],
    
    sessions: [
      {
        id: 1,
        title: 'Initial Consultation',
        description: 'First session to understand your needs',
        start_time: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        end_time: new Date(Date.now() + 86400000 + 3600000).toISOString(),
        duration: 60,
        counselor: {
          id: 2,
          name: 'Dr. Sarah Johnson',
          specialization: 'Marriage Counseling',
        },
        status: 'scheduled',
      },
      {
        id: 2,
        title: 'Follow-up Session',
        description: 'Continuing our discussion from last week',
        start_time: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
        end_time: new Date(Date.now() + 86400000 * 3 + 3600000).toISOString(),
        duration: 60,
        counselor: {
          id: 3,
          name: 'Dr. Michael Chen',
          specialization: 'Child Psychology',
        },
        status: 'scheduled',
      },
      {
        id: 3,
        title: 'Previous Session',
        description: 'Discussion about parenting techniques',
        start_time: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
        end_time: new Date(Date.now() - 86400000 * 5 + 3600000).toISOString(),
        duration: 60,
        counselor: {
          id: 3,
          name: 'Dr. Michael Chen',
          specialization: 'Child Psychology',
        },
        status: 'completed',
      },
    ],
    
    programs: [
      {
        id: 1,
        title: 'Marriage Restoration Program',
        description: '6-week program to strengthen your marriage',
        total_weeks: 6,
        current_week: 2,
        is_enrolled: true,
        resources_count: 8,
        session_count: 3,
        next_session: new Date(Date.now() + 86400000 * 7).toISOString(), // 1 week from now
      },
      {
        id: 2,
        title: 'Parenting Teens',
        description: '4-week program for parents of teenagers',
        total_weeks: 4,
        current_week: 0,
        is_enrolled: false,
        resources_count: 5,
        session_count: 2,
      },
      {
        id: 3,
        title: 'Stress Management',
        description: '8-week mindfulness and stress reduction program',
        total_weeks: 8,
        current_week: 5,
        is_enrolled: true,
        resources_count: 12,
        session_count: 6,
        next_session: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      },
    ],
    
    resources: [
      {
        id: '1',
        title: 'Communication in Marriage',
        description: 'Guide to effective communication with your spouse',
        type: 'PDF',
        category: 'Marriage Counseling',
        size: '2.4 MB',
        url: '/resources/1',
        created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
      {
        id: '2',
        title: 'Managing Teen Emotions',
        description: 'Audio guide for parents',
        type: 'Audio',
        category: 'Parenting',
        size: '15.2 MB',
        url: '/resources/2',
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: '3',
        title: 'Mindfulness Meditation',
        description: 'Video tutorial for beginners',
        type: 'Video',
        category: 'Stress Management',
        size: '45.7 MB',
        url: '/resources/3',
        created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ],
    
    conversations: [
      {
        id: 1,
        name: 'Dr. Sarah Johnson',
        lastMessage: 'Looking forward to our session tomorrow',
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        unread: 2,
        online: true,
      },
      {
        id: 2,
        name: 'Dr. Michael Chen',
        lastMessage: 'Here are those resources I mentioned',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        unread: 0,
        online: false,
      },
      {
        id: 3,
        name: 'Support Team',
        lastMessage: 'Your payment has been processed',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        unread: 0,
        online: false,
      },
    ],
    
    messages: {
      1: [
        {
          id: 1,
          sender: 'Dr. Sarah Johnson',
          content: 'Hi Alex, how are you feeling after our last session?',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          isCurrentUser: false,
        },
        {
          id: 2,
          sender: 'You',
          content: 'Much better, thank you! The exercises you suggested really helped.',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          isCurrentUser: true,
        },
        {
          id: 3,
          sender: 'Dr. Sarah Johnson',
          content: "That's great to hear! I'm looking forward to our session tomorrow at 10 AM.",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          isCurrentUser: false,
        },
      ],
      2: [
        {
          id: 1,
          sender: 'Dr. Michael Chen',
          content: 'Here are those resources I mentioned about child development.',
          timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          isCurrentUser: false,
        },
        {
          id: 2,
          sender: 'You',
          content: 'Thanks, I will review them before our next session.',
          timestamp: new Date(Date.now() - 86400000).toISOString(),
          isCurrentUser: true,
        },
      ],
      3: [
        {
          id: 1,
          sender: 'Support Team',
          content: 'Your payment has been processed successfully.',
          timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
          isCurrentUser: false,
        },
      ],
    },
    
    payments: [
      {
        id: 'PAY-12345',
        amount: 5000,
        currency: 'NGN',
        status: 'completed',
        method: 'mpesa',
        date: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: 'PAY-12346',
        amount: 7500,
        currency: 'NGN',
        status: 'completed',
        method: 'card',
        date: new Date(Date.now() - 86400000 * 10).toISOString(),
      },
      {
        id: 'PAY-12347',
        amount: 3000,
        currency: 'NGN',
        status: 'pending',
        method: 'airtel',
        date: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
  };