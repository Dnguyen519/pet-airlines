import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Debug Inquiry API ===');
    
    // Check environment variables
    const envVars = {
      SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      RESEND_KEY: !!process.env.RESEND_API_KEY,
    };
    
    console.log('Environment Variables:', envVars);
    
    // Parse request body
    const data = await request.json();
    console.log('Request Data:', data);
    
    // Test Supabase connection
    let supabaseTest = 'Not tested';
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data: countries, error } = await supabase
        .from('countries')
        .select('id, name')
        .limit(1);
      
      if (error) {
        supabaseTest = `Error: ${error.message}`;
      } else {
        supabaseTest = `Success: ${countries?.length || 0} countries found`;
      }
    } catch (err) {
      supabaseTest = `Exception: ${err}`;
    }
    
    console.log('Supabase Test:', supabaseTest);
    
    return NextResponse.json({
      success: true,
      debug: {
        environmentVariables: envVars,
        requestData: data,
        supabaseConnection: supabaseTest,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Debug API Error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}