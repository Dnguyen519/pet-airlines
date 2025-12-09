import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Email Service Test ===');
    
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!resendApiKey) {
      return NextResponse.json({
        success: false,
        error: 'Missing RESEND_API_KEY environment variable'
      });
    }

    // Dynamic import to avoid build-time errors
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    // Test 1: Validate API key by trying to get domains
    let apiKeyValid = false;
    try {
      await resend.domains.list();
      apiKeyValid = true;
    } catch (domainError: any) {
      if (!domainError.message.includes('Invalid API key')) {
        apiKeyValid = true; // API key is valid but domain access might be restricted
      }
    }

    // Test 2: Send a test email
    let emailSent = false;
    let emailError = null;
    let emailId = null;

    try {
      const { data, error } = await resend.emails.send({
        from: 'Pet Airlines <noreply@pet-airlines.com>',
        to: adminEmail || 'info@pet-airlines.com',
        subject: '🧪 Pet Airlines - Test Email',
        html: `
          <h2>Test Email from Pet Airlines Debug System</h2>
          <p>This is a test email to verify the email service is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'unknown'}</p>
          <p><strong>Vercel:</strong> ${process.env.VERCEL ? 'Yes' : 'No'}</p>
          <hr>
          <p><em>This email was sent automatically by the debug system.</em></p>
        `,
      });

      if (error) {
        emailError = error.message;
      } else {
        emailSent = true;
        emailId = data?.id;
      }
    } catch (sendError: any) {
      emailError = sendError.message;
    }

    return NextResponse.json({
      success: apiKeyValid && emailSent,
      message: 'Email service test completed',
      tests: {
        apiKey: {
          success: apiKeyValid,
          status: apiKeyValid ? 'API key is valid' : 'API key is invalid'
        },
        emailSend: {
          success: emailSent,
          error: emailError,
          emailId: emailId,
          recipient: adminEmail || 'info@pet-airlines.com'
        }
      },
      configuration: {
        hasApiKey: !!resendApiKey,
        hasAdminEmail: !!adminEmail,
        adminEmail: adminEmail || 'info@pet-airlines.com (default)',
        fromAddress: 'Pet Airlines <noreply@pet-airlines.com>'
      },
      recommendation: 
        (apiKeyValid && emailSent)
          ? 'Email service is working correctly'
          : 'Check Resend API configuration and domain setup'
    });

  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      error: 'Email service test failed',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}