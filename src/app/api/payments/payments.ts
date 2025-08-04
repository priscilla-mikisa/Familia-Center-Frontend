// src/app/api/programs/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import mockApiClient from '../mockApiClient';

interface Program {
  id: number;
  title: string;
  description: string;
  is_enrolled: boolean;
  current_week: number;
  total_weeks: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const upcoming = searchParams.get('upcoming');

    if (id) {
      const response = await mockApiClient.get<Program>(`/programs/${id}/`);
      return NextResponse.json(response.data);
    } else {
      const params = upcoming ? { upcoming: true } : undefined;
      const response = await mockApiClient.get<Program[]>('/programs/', { params });
      return NextResponse.json(response.data);
    }
  } catch (error) {
    console.error('Failed to fetch programs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { programId } = await request.json();
    
    if (!programId) {
      return NextResponse.json(
        { error: 'Program ID is required' },
        { status: 400 }
      );
    }

    // Fixed: Added empty config object as third argument
    const response = await mockApiClient.post(
      `/programs/${programId}/enroll/`, 
      {}, // empty data object
      {}  // empty config object
    );
    return NextResponse.json(response.data);
    
  } catch (error) {
    console.error('Failed to enroll in program:', error);
    return NextResponse.json(
      { error: 'Failed to enroll in program' },
      { status: 500 }
    );
  }
}