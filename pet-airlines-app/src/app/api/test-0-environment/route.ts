import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Environment Variables Test ===');
    
    const envCheck = {
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: !!process.env.VERCEL,
      timestamp: new Date().toISOString()
    };

    // Check if critical environment variables have values (not just existence)
    const detailedCheck = {
      supabase_url_format: process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('supabase.co'),
      supabase_key_length: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || 0,
      resend_key_format: process.env.RESEND_API_KEY?.startsWith('re_'),
      admin_email: process.env.ADMIN_EMAIL,
    };

    const allCriticalPresent = envCheck.SUPABASE_URL && envCheck.SUPABASE_ANON_KEY && envCheck.RESEND_API_KEY;

    return NextResponse.json({
      success: allCriticalPresent,
      message: allCriticalPresent ? 'All environment variables present' : 'Missing critical environment variables',
      environment: envCheck,
      validation: detailedCheck,
      recommendation: allCriticalPresent ? 'Environment setup looks good' : 'Check missing environment variables in Vercel dashboard'
    });

  } catch (error) {
    console.error('Environment test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check environment variables',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}