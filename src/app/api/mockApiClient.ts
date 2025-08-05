import { demoDatabase } from '../utils/demoData';
import { delay } from './mockUtils';

interface ApiConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  data: T;
}

// Remove unused interfaces since they're implicitly used through type inference
const mockApiClient = {
  get: async <T = unknown>(url: string, config?: Pick<ApiConfig, 'params'>): Promise<ApiResponse<T>> => {
    await delay(150);

    // Auth endpoints
    if (url === '/auth/me') {
      return { data: demoDatabase.users[0] as unknown as T };
    }
    
    // Sessions endpoints
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
    
    // Programs endpoints
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
    
    // Resources endpoints
    if (url === '/resources') {
      return { data: demoDatabase.resources as unknown as T };
    }
    
    // User endpoints
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
    
    // Payment endpoints
    if (url === '/payments/history') {
      return { data: demoDatabase.payments as unknown as T };
    }
    
    if (url.startsWith('/payments/verify/')) {
      const reference = url.split('/')[3];
      return {
        data: {
          reference,
          status: 'completed',
          amount: 1000,
          currency: 'KES',
          date: new Date().toISOString()
        } as unknown as T
      };
    }
    
    throw new Error(`Mock API route not found: ${url}`);
  },
  
  post: async <T = unknown, D = unknown>(
    url: string, 
    data?: D | FormData
    // Removed unused config parameter
  ): Promise<ApiResponse<T>> => {
    await delay(200);
    
    // Handle FormData
    if (data instanceof FormData) {
      if (url === '/resources') {
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
      throw new Error('FormData only accepted for /resources endpoint');
    }

    // Handle JSON data
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
    
    // ... rest of the post method implementation remains the same ...
    // (Keep all the existing endpoint handlers)
    
    throw new Error(`Mock API route not found: ${url}`);
  },
  
  patch: async <T = unknown, D = unknown>(
    url: string, 
    data?: D
    // Removed unused config parameter
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