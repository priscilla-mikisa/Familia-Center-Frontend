// import { useState, useEffect } from 'react';
// import { ProgramService } from '../api/programs/route';

// export const usePrograms = (programId?: number) => {
//   const [programs, setPrograms] = useState<any[]>([]);
//   const [program, setProgram] = useState<any>(null);
//   const [resources, setResources] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
// // 
//   const fetchPrograms = async () => {
//     try {
//       const data = await ProgramService.getPrograms();
//       setPrograms(data.data);
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   const fetchProgram = async (id: number) => {
//     try {
//       const data = await ProgramService.getProgram(id);
//       setProgram(data);
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   const fetchResources = async (id: number) => {
//     try {
//       const data = await ProgramService.getProgramResources(id);
//       setResources(data.data);
//     } catch (err) {
//       setError((err as Error).message);
//     }
//   };

//   const enrollInProgram = async (id: number) => {
//     try {
//       await ProgramService.enrollInProgram(id);
//       if (programId) await fetchProgram(programId);
//       await fetchPrograms();
//     } catch (err) {
//       setError((err as Error).message);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       try {
//         await fetchPrograms();
//         if (programId) {
//           await fetchProgram(programId);
//           await fetchResources(programId);
//         }
//         setLoading(false);
//       } catch (err) {
//         setError((err as Error).message);
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [programId]);

//   return {
//     programs,
//     program,
//     resources,
//     loading,
//     error,
//     enrollInProgram,
//     refresh: fetchPrograms,
//   };
// };


import { useState, useEffect } from 'react';
import { ProgramService } from '../api/programs/program';

interface Program {
  id: number;
  title: string;
  description: string;
  is_enrolled: boolean;
  current_week: number;
  total_weeks: number;
  session_count: number;
  resources_count: number;
  next_session?: string; // Added next_session property

}

interface ProgramResource {
  id: string;
  title: string;
  type: string;
  category: string;
}

export const usePrograms = (programId?: number) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [program, setProgram] = useState<Program | null>(null);
  const [resources, setResources] = useState<ProgramResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      const data = await ProgramService.getPrograms();
      setPrograms(data.data as Program[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch programs');
    }
  };

  const fetchProgram = async (id: number) => {
    try {
      const data = await ProgramService.getProgram(id);
      setProgram(data.data as Program);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch program');
    }
  };

  const fetchResources = async (id: number) => {
    try {
      const data = await ProgramService.getProgramResources(id);
      setResources(data.data as ProgramResource[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch resources');
    }
  };

  const enrollInProgram = async (id: number) => {
    try {
      await ProgramService.enrollInProgram(id);
      if (programId) await fetchProgram(programId);
      await fetchPrograms();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll');
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      try {
        await fetchPrograms();
        if (programId) {
          await fetchProgram(programId);
          await fetchResources(programId);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [programId]);

  return {
    programs,
    program,
    resources,
    loading,
    error,
    enrollInProgram,
    refresh: fetchPrograms,
  };
};