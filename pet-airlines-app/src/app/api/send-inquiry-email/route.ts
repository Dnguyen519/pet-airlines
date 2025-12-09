import { NextRequest, NextResponse } from 'next/server';
import { sendInquiryConfirmation, sendInquiryNotification, InquiryEmailData } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data: InquiryEmailData = await request.json();
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.inquiryNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Send confirmation email to customer
    const customerEmailResult = await sendInquiryConfirmation(data);
    
    // Send notification email to admin
    const adminEmailResult = await sendInquiryNotification(data);
    
    // Check if both emails were sent successfully
    if (customerEmailResult.success && adminEmailResult.success) {
      return NextResponse.json({
        success: true,
        message: 'Emails sent successfully'
      });
    } else {
      console.error('Email sending failed:', {
        customer: customerEmailResult,
        admin: adminEmailResult
      });
      
      return NextResponse.json(
        { 
          error: 'Failed to send emails',
          details: {
            customerEmail: customerEmailResult.success,
            adminEmail: adminEmailResult.success
          }
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}