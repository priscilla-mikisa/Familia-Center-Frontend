import { demoDatabase } from '../utils/demoData';
import { delay } from './mockUtils';

interface ApiConfig {
  params?: Record<string, unknown>;
}

interface ApiResponse<T> {
  data: T;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Session {
  id: number;
  title: string;
  start_time: string;
  status: string;
  duration: number;
  counselor: {
    name: string;
  };
}

interface Program {
  id: number;
  title: string;
  is_enrolled: boolean;
  current_week: number;
  total_weeks: number;
  session_count: number;
  resources_count: number;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: string;
}

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

const mockApiClient = {
  get: async <T = unknown>(url: string, config?: Pick<ApiConfig, 'params'>): Promise<ApiResponse<T>> => {
    await delay(150);

    if (url === '/auth/me') {
      return { data: demoDatabase.users[0] as unknown as T };
    }
    
    if (url === '/sessions/') {
      if (config?.params?.upcoming) {
        return { 
          data: demoDatabase.sessions.filter(s => new Date(s.start_time) > new Date()) as unknown as T 
        };
      }
      return { data: demoDatabase.sessions as unknown as T };
    }
    
    if (url.startsWith('/sessions/') && url.endsWith('/')) {
      const sessionId = parseInt(url.split('/')[2]);
      if (isNaN(sessionId)) throw new Error('Invalid session ID');
      const session = demoDatabase.sessions.find(s => s.id === sessionId);
      return { data: (session || null) as unknown as T };
    }
    
    if (url === '/programs/') {
      return { data: demoDatabase.programs as unknown as T };
    }
    
    if (url.startsWith('/programs/') && url.endsWith('/')) {
      const programId = parseInt(url.split('/')[2]);
      if (isNaN(programId)) throw new Error('Invalid program ID');
      const program = demoDatabase.programs.find(p => p.id === programId);
      return { data: (program || null) as unknown as T };
    }
    
    if (url.startsWith('/programs/') && url.includes('/resources/')) {
      const programId = parseInt(url.split('/')[2]);
      if (isNaN(programId)) throw new Error('Invalid program ID');
      return { data: demoDatabase.resources as unknown as T };
    }
    
    if (url === '/resources') {
      return { data: demoDatabase.resources as unknown as T };
    }
    
    if (url === '/users/') {
      return { data: demoDatabase.users as unknown as T };
    }
    
    if (url.startsWith('/users/') && url.endsWith('/')) {
      const userId = parseInt(url.split('/')[2]);
      if (isNaN(userId)) throw new Error('Invalid user ID');
      const user = demoDatabase.users.find(u => u.id === userId);
      return { data: (user || null) as unknown as T };
    }
    
    if (url === '/counselors/') {
      return { data: demoDatabase.users.filter(u => u.role === 'counselor') as unknown as T };
    }
    
    if (url === '/payments/history') {
      return { data: demoDatabase.payments as unknown as T };
    }
    
    throw new Error(`Mock API route not found: ${url}`);
  },
  
  post: async <T = unknown, D = unknown>(
    url: string, 
    data?: D
  ): Promise<ApiResponse<T>> => {
    await delay(200);
    
    if (url === '/auth/login') {
      if (!data || typeof data !== 'object' || !('email' in data) || !('password' in data)) {
        throw new Error('Email and password are required');
      }
      return { 
        data: { 
          user: demoDatabase.users[0], 
          token: 'mock-auth-token',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600
        } as unknown as T
      };
    }
    
    if (url === '/auth/register') {
      if (!data || typeof data !== 'object' || !('name' in data) || !('email' in data) || !('password' in data)) {
        throw new Error('Name, email and password are required');
      }
      const newUser = {
        ...(data as unknown as Omit<User, 'id'>),
        id: demoDatabase.users.length + 1,
        role: 'patient',
      };
      demoDatabase.users.push(newUser);
      return { 
        data: { 
          user: newUser, 
          token: 'mock-auth-token',
          refreshToken: 'mock-refresh-token'
        } as unknown as T
      };
    }
    
    if (url === '/auth/refresh') {
      if (!data || typeof data !== 'object' || !('refreshToken' in data)) {
        throw new Error('Refresh token is required');
      }
      return { 
        data: { 
          token: 'new-mock-auth-token',
          refreshToken: 'new-mock-refresh-token'
        } as unknown as T
      };
    }
    
    if (url === '/auth/logout') {
      return { data: { success: true } as unknown as T };
    }
    
    if (url.startsWith('/sessions/') && url.includes('/book/')) {
      const sessionId = parseInt(url.split('/')[2]);
      if (isNaN(sessionId)) throw new Error('Invalid session ID');
      const session = demoDatabase.sessions.find(s => s.id === sessionId);
      
      if (!session) throw new Error('Session not found');
      
      session.status = 'scheduled';
      return { data: session as unknown as T };
    }
    
    if (url.startsWith('/sessions/') && url.includes('/feedback/')) {
      const sessionId = parseInt(url.split('/')[2]);
      if (isNaN(sessionId)) throw new Error('Invalid session ID');
      if (!data || typeof data !== 'object' || !('feedback' in data)) {
        throw new Error('Feedback is required');
      }
      return { data: { success: true } as unknown as T };
    }
    
    if (url.startsWith('/programs/') && url.includes('/enroll/')) {
      const programId = parseInt(url.split('/')[2]);
      if (isNaN(programId)) throw new Error('Invalid program ID');
      const program = demoDatabase.programs.find(p => p.id === programId);
      
      if (!program) throw new Error('Program not found');
      
      program.is_enrolled = true;
      program.current_week = 1;
      return { data: program as unknown as T };
    }
    
    if (url === '/payments/initiate') {
      if (!data || typeof data !== 'object' || !('amount' in data) || !('currency' in data) || !('paymentMethod' in data)) {
        throw new Error('Amount, currency and payment method are required');
      }
      const newPayment = {
        id: `PAY-${Math.floor(Math.random() * 100000)}`,
        amount: (data as { amount: number }).amount,
        currency: (data as { currency: string }).currency,
        status: 'pending',
        method: (data as { paymentMethod: string }).paymentMethod,
        date: new Date().toISOString(),
      };
      
      demoDatabase.payments.unshift(newPayment);
      return { data: newPayment as unknown as T };
    }
    
    if (url === '/resources') {
      if (!(data instanceof FormData)) {
        throw new Error('Invalid resource data format');
      }
      
      const title = data.get('title')?.toString() || 'New Resource';
      const description = data.get('description')?.toString() || '';
      const type = data.get('type')?.toString() || 'PDF';
      const category = data.get('category')?.toString() || 'General';

      const newResource = {
        id: `${demoDatabase.resources.length + 1}`,
        title,
        description,
        type,
        category,
        size: '0 KB',
        url: '/resources/new',
        created_at: new Date().toISOString(),
      };
      
      demoDatabase.resources.unshift(newResource);
      return { data: newResource as unknown as T };
    }
    
    if (url.startsWith('/users/') && url.endsWith('/')) {
      const userId = parseInt(url.split('/')[2]);
      if (isNaN(userId)) throw new Error('Invalid user ID');
      const user = demoDatabase.users.find(u => u.id === userId);
      
      if (!user) throw new Error('User not found');
      
      Object.assign(user, data);
      return { data: user as unknown as T };
    }
    
    throw new Error(`Mock API route not found: ${url}`);
  },
  
  patch: async <T = unknown, D = unknown>(
    url: string, 
    data?: D
  ): Promise<ApiResponse<T>> => {
    await delay(150);
    
    if (url.startsWith('/users/') && url.endsWith('/')) {
      const userId = parseInt(url.split('/')[2]);
      if (isNaN(userId)) throw new Error('Invalid user ID');
      const user = demoDatabase.users.find(u => u.id === userId);
      
      if (!user) throw new Error('User not found');
      
      if (data && typeof data === 'object' && 'role' in data && data.role !== user.role) {
        throw new Error('Cannot change user role');
      }
      
      if (data && typeof data === 'object') {
        Object.assign(user, data);
      }
      
      return { data: user as unknown as T };
    }
    
    throw new Error(`Mock API route not found: ${url}`);
  },
};

export default mockApiClient;