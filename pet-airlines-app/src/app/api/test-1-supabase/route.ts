import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Supabase Connection Test ===');
    
    // Dynamic import to avoid build-time errors
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing Supabase environment variables',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseAnonKey
        }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });

    // Test 1: Try to read from countries table
    const { data: countries, error: countriesError } = await supabase
      .from('countries')
      .select('id, name, code')
      .eq('is_active', true)
      .limit(3);

    // Test 2: Try to read from cities table
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .select('id, name')
      .limit(3);

    // Test 3: Test simple inquiry insert (will be deleted immediately)
    const testInquiry = {
      full_name: 'Debug Test',
      email: 'debug@test.com',
      pet_type: 'dog',
      pet_count: 1,
      from_city: 'Test City',
      to_city: 'Test Destination',
      status: 'new',
      preferred_language: 'en'
    };

    const { data: insertTest, error: insertError } = await supabase
      .from('inquiries')
      .insert([testInquiry])
      .select('id, inquiry_number')
      .single();

    // Clean up test data
    if (insertTest?.id) {
      await supabase
        .from('inquiries')
        .delete()
        .eq('id', insertTest.id);
    }

    return NextResponse.json({
      success: !countriesError && !citiesError && !insertError,
      message: 'Supabase connection test completed',
      tests: {
        countries: {
          success: !countriesError,
          error: countriesError?.message || null,
          count: countries?.length || 0,
          sample: countries?.[0] || null
        },
        cities: {
          success: !citiesError,
          error: citiesError?.message || null,
          count: cities?.length || 0,
          sample: cities?.[0] || null
        },
        inquiryInsert: {
          success: !insertError,
          error: insertError?.message || null,
          testId: insertTest?.id || null,
          inquiryNumber: insertTest?.inquiry_number || null
        }
      },
      recommendation: 
        (!countriesError && !citiesError && !insertError) 
          ? 'Supabase is working correctly'
          : 'Check RLS policies and table permissions'
    });

  } catch (error) {
    console.error('Supabase test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Supabase connection failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}