import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Full Inquiry Flow Test ===');
    
    const requestData = await request.json();
    
    // Step 1: Test Supabase inquiry insertion
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    );

    const inquiryData = {
      full_name: requestData.full_name || 'Test User',
      email: requestData.email || 'test@example.com',
      phone: requestData.phone || null,
      pet_type: requestData.pet_type || 'dog',
      pet_breed: requestData.pet_breed || null,
      pet_weight_kg: requestData.pet_weight_kg || null,
      pet_count: requestData.pet_count || 1,
      from_country_id: requestData.from_country_id || null,
      from_city: requestData.from_city || 'Test City',
      to_country_id: requestData.to_country_id || null,
      to_city: requestData.to_city || 'Test Destination',
      travel_date: requestData.travel_date || null,
      special_requests: requestData.special_requests || 'Debug test inquiry',
      status: 'new',
      preferred_language: requestData.preferred_language || 'en'
    };

    const { data: inquiryResult, error: inquiryError } = await supabase
      .from('inquiries')
      .insert([inquiryData])
      .select()
      .single();

    // Step 2: Test email sending (if inquiry was successful)
    let emailResult = null;
    if (inquiryResult && !inquiryError) {
      try {
        const emailData = {
          fullName: inquiryResult.full_name,
          email: inquiryResult.email,
          inquiryNumber: inquiryResult.inquiry_number,
          petType: inquiryResult.pet_type,
          originCountry: inquiryResult.from_city,
          destinationCountry: inquiryResult.to_city,
          travelDate: inquiryResult.travel_date || 'To be determined',
          language: inquiryResult.preferred_language || 'en'
        };

        const emailResponse = await fetch(`${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3001'}/api/send-inquiry-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });

        emailResult = {
          success: emailResponse.ok,
          status: emailResponse.status,
          data: emailResponse.ok ? await emailResponse.json() : null,
          error: !emailResponse.ok ? await emailResponse.text() : null
        };
      } catch (emailError: any) {
        emailResult = {
          success: false,
          error: emailError.message
        };
      }
    }

    // Step 3: Clean up test data
    let cleanupResult = null;
    if (inquiryResult?.id) {
      const { error: deleteError } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', inquiryResult.id);
      
      cleanupResult = {
        success: !deleteError,
        error: deleteError?.message || null
      };
    }

    const overallSuccess = !inquiryError && emailResult?.success && cleanupResult?.success;

    return NextResponse.json({
      success: overallSuccess,
      message: 'Full inquiry flow test completed',
      steps: {
        inquirySubmission: {
          success: !inquiryError,
          error: inquiryError?.message || null,
          inquiryId: inquiryResult?.id || null,
          inquiryNumber: inquiryResult?.inquiry_number || null
        },
        emailSending: emailResult,
        cleanup: cleanupResult
      },
      testData: {
        input: requestData,
        generatedInquiry: inquiryResult || null
      },
      recommendation: overallSuccess 
        ? 'Full inquiry flow is working correctly'
        : 'Check individual test results for specific issues'
    });

  } catch (error) {
    console.error('Full inquiry test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Full inquiry flow test failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}