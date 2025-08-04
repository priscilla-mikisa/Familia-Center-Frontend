// import { useState, useEffect } from 'react';
// import { UserService } from '../api/user/route';

// export const useUser = (id?: number) => {
//   const [user, setUser] = useState<any>(null);
//   const [users, setUsers] = useState<any[]>([]);
//   const [counselors, setCounselors] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchUser = async (userId: number) => {
//     try {
//       const data = await UserService.getUser(userId);
//       setUser(data);
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const data = await UserService.getUsers();
//       setUsers(data.data);
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   const fetchCounselors = async () => {
//     try {
//       const data = await UserService.getCounselors();
//       setCounselors(data.data);
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   const updateUser = async (userId: number, userData: any) => {
//     try {
//       const data = await UserService.updateUser(userId, userData);
//       setUser(data);
//       return data;
//     } catch (err) {
//       setError((err as Error).message);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         if (id) {
//           await fetchUser(id);
//         }
//         await fetchCounselors();
//         setLoading(false);
//       } catch (err) {
//         setError((err as Error).message);
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [id]);

//   return {
//     user,
//     users,
//     counselors,
//     loading,
//     error,
//     updateUser,
//     refresh: () => id ? fetchUser(id) : fetchUsers(),
//   };
// };

import { useState, useEffect } from 'react';
import { UserService } from '../api/user/user';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: string;
}

export const useUser = (id?: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [counselors, setCounselors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (userId: number) => {
    try {
      const data = await UserService.getUser(userId);
      setUser(data.data as User);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user');
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await UserService.getUsers();
      setUsers(data.data as User[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    }
  };

  const fetchCounselors = async () => {
    try {
      const data = await UserService.getCounselors();
      setCounselors(data.data as User[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch counselors');
    }
  };

  const updateUser = async (userId: number, userData: Partial<User>) => {
    try {
      const data = await UserService.updateUser(userId, JSON.stringify(userData));
      setUser(data.data as User);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        if (id) {
          await fetchUser(id);
        }
        await fetchCounselors();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return {
    user,
    users,
    counselors,
    loading,
    error,
    updateUser,
    refresh: () => id ? fetchUser(id) : fetchUsers(),
  };
};