import { useState, useEffect } from 'react';
import { SessionService } from '../api/sessions/sessions';

export const useSessions = (sessionId?: number) => {
  const [sessions, setSessions] = useState<string[]>([]);
  const [session, setSession] = useState<string>('');
  const [upcomingSessions, setUpcomingSessions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = async () => {
    try {
      const data = await SessionService.getSessions();
      setSessions(data.data as string[]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchUpcomingSessions = async () => {
    try {
      const data = await SessionService.getSessions({ upcoming: true });
      setUpcomingSessions(data.data as string[]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchSession = async (id: number) => {
    try {
      const data = await SessionService.getSession(id);
      setSession(data.data as string);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const bookSession = async (id: number) => {
    try {
      await SessionService.bookSession(id);
      await fetchUpcomingSessions();
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  const submitFeedback = async (id: number, feedback: string) => {
    try {
      await SessionService.submitFeedback(id, feedback);
      if (sessionId) await fetchSession(sessionId);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await fetchSessions();
        await fetchUpcomingSessions();
        if (sessionId) {
          await fetchSession(sessionId);
        }
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };

    loadData();
  }, [sessionId]);

  return {
    sessions,
    upcomingSessions,
    session,
        loading,
    error,
    bookSession,
    submitFeedback,
    refresh: fetchSessions,
  };
};