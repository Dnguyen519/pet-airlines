import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Pet Airlines database functionality...');
    
    // Test 1: Read from countries table (should work with is_active = true filter)
    const { data: countries, error: countriesError } = await supabase
      .from('countries')
      .select('id, name, code, is_active')
      .eq('is_active', true)
      .limit(5);

    // Test 2: Read from cities table
    const { data: cities, error: citiesError } = await supabase
      .from('cities')
      .select('id, name, country_id')
      .limit(5);

    // Test 3: Test inquiry insertion (should work with RLS policy)
    const testInquiry = {
      full_name: 'Test Customer',
      email: 'test@example.com',
      pet_type: 'dog',
      pet_count: 1,
      from_city: 'Toronto',
      to_city: 'Seoul',
      status: 'new',
      preferred_language: 'en'
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('inquiries')
      .insert([testInquiry])
      .select('id, inquiry_number, full_name, email')
      .single();

    // Test 4: Clean up test data if insert was successful
    let deleteResult = null;
    if (insertResult?.id) {
      const { error: deleteError } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', insertResult.id);
      deleteResult = deleteError ? `Delete failed: ${deleteError.message}` : 'Test data cleaned up successfully';
    }

    return NextResponse.json({
      success: true,
      message: 'Pet Airlines database functionality test complete',
      tests: {
        countries: {
          success: !countriesError,
          error: countriesError?.message,
          data: countries,
          count: countries?.length || 0
        },
        cities: {
          success: !citiesError,
          error: citiesError?.message,
          data: cities,
          count: cities?.length || 0
        },
        inquiryInsert: {
          success: !insertError,
          error: insertError?.message,
          data: insertResult,
          inquiryNumber: insertResult?.inquiry_number
        },
        cleanup: deleteResult
      },
      overall: {
        databaseWorking: !countriesError && !citiesError && !insertError,
        readyForProduction: !countriesError && !citiesError && !insertError
      }
    });
    
  } catch (error) {
    console.error('Supabase test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Unexpected error testing Supabase',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}