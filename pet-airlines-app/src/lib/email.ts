import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from = 'Pet Airlines <onboarding@resend.dev>' }: EmailOptions) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}

export interface InquiryEmailData {
  fullName: string;
  email: string;
  inquiryNumber: string;
  petType: string;
  originCountry: string;
  destinationCountry: string;
  travelDate: string;
  language: string;
}

export async function sendInquiryConfirmation(data: InquiryEmailData) {
  const subject = getSubjectByLanguage(data.language);
  const html = generateInquiryConfirmationEmail(data);
  
  return await sendEmail({
    to: data.email,
    subject,
    html,
  });
}

export async function sendInquiryNotification(data: InquiryEmailData) {
  const subject = `New Pet Airlines Inquiry - ${data.inquiryNumber}`;
  const html = generateInquiryNotificationEmail(data);
  
  return await sendEmail({
    to: process.env.ADMIN_EMAIL || 'info@pet-airlines.com',
    subject,
    html,
  });
}

function getSubjectByLanguage(language: string): string {
  const subjects: Record<string, string> = {
    en: 'Pet Airlines - Inquiry Confirmation',
    es: 'Pet Airlines - Confirmación de Consulta',
    fr: 'Pet Airlines - Confirmation de Demande',
    de: 'Pet Airlines - Anfrage Bestätigung',
    it: 'Pet Airlines - Conferma Richiesta',
    pt: 'Pet Airlines - Confirmação de Consulta',
  };
  
  return subjects[language] || subjects.en;
}

function generateInquiryConfirmationEmail(data: InquiryEmailData): string {
  const messages = getMessagesByLanguage(data.language);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pet Airlines - Inquiry Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="margin: 0; font-size: 28px;">🐾 Pet Airlines</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px;">${messages.globalTransport}</p>
      </div>
      
      <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
        <h2 style="color: #667eea; margin-top: 0;">${messages.hello} ${data.fullName}!</h2>
        
        <p>${messages.thankYou}</p>
        
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
          <h3 style="margin-top: 0; color: #667eea;">${messages.inquiryDetails}</h3>
          <p><strong>${messages.inquiryNumber}:</strong> ${data.inquiryNumber}</p>
          <p><strong>${messages.petType}:</strong> ${data.petType}</p>
          <p><strong>${messages.route}:</strong> ${data.originCountry} → ${data.destinationCountry}</p>
          <p><strong>${messages.travelDate}:</strong> ${data.travelDate}</p>
        </div>
        
        <p>${messages.nextSteps}</p>
        
        <div style="background: #e8f2ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0;"><strong>📞 ${messages.urgentInquiry}</strong></p>
          <p style="margin: 5px 0 0 0;">WhatsApp: +1 (555) 123-4567</p>
        </div>
        
        <p>${messages.bestRegards}<br>
        <strong>Pet Airlines Team</strong><br>
        🌍 ${messages.globalTransport}</p>
      </div>
    </body>
    </html>
  `;
}

function generateInquiryNotificationEmail(data: InquiryEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Pet Airlines Inquiry</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>New Pet Airlines Inquiry Received</h2>
      
      <p><strong>Inquiry Number:</strong> ${data.inquiryNumber}</p>
      <p><strong>Customer Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Pet Type:</strong> ${data.petType}</p>
      <p><strong>Route:</strong> ${data.originCountry} → ${data.destinationCountry}</p>
      <p><strong>Travel Date:</strong> ${data.travelDate}</p>
      <p><strong>Language:</strong> ${data.language}</p>
      
      <p>Please respond within 24 hours as per our service commitment.</p>
    </body>
    </html>
  `;
}

function getMessagesByLanguage(language: string) {
  const messages: Record<string, any> = {
    en: {
      globalTransport: "Global Pet Transportation",
      hello: "Hello",
      thankYou: "Thank you for your inquiry with Pet Airlines! We've received your request and our team will review it shortly.",
      inquiryDetails: "Inquiry Details",
      inquiryNumber: "Inquiry Number",
      petType: "Pet Type",
      route: "Route",
      travelDate: "Travel Date",
      nextSteps: "Our team will contact you within 24 hours with a detailed quote and next steps for your pet's journey.",
      urgentInquiry: "For urgent inquiries, contact us directly:",
      bestRegards: "Best regards,"
    },
    es: {
      globalTransport: "Transporte Global de Mascotas",
      hello: "Hola",
      thankYou: "¡Gracias por su consulta con Pet Airlines! Hemos recibido su solicitud y nuestro equipo la revisará en breve.",
      inquiryDetails: "Detalles de la Consulta",
      inquiryNumber: "Número de Consulta",
      petType: "Tipo de Mascota",
      route: "Ruta",
      travelDate: "Fecha de Viaje",
      nextSteps: "Nuestro equipo se pondrá en contacto con usted dentro de 24 horas con una cotización detallada y los próximos pasos para el viaje de su mascota.",
      urgentInquiry: "Para consultas urgentes, contáctenos directamente:",
      bestRegards: "Saludos cordiales,"
    },
    fr: {
      globalTransport: "Transport Global d'Animaux",
      hello: "Bonjour",
      thankYou: "Merci pour votre demande avec Pet Airlines ! Nous avons reçu votre demande et notre équipe l'examinera sous peu.",
      inquiryDetails: "Détails de la Demande",
      inquiryNumber: "Numéro de Demande",
      petType: "Type d'Animal",
      route: "Itinéraire",
      travelDate: "Date de Voyage",
      nextSteps: "Notre équipe vous contactera dans les 24 heures avec un devis détaillé et les prochaines étapes pour le voyage de votre animal.",
      urgentInquiry: "Pour les demandes urgentes, contactez-nous directement:",
      bestRegards: "Cordialement,"
    },
    de: {
      globalTransport: "Globaler Tiertransport",
      hello: "Hallo",
      thankYou: "Vielen Dank für Ihre Anfrage bei Pet Airlines! Wir haben Ihre Anfrage erhalten und unser Team wird sie in Kürze prüfen.",
      inquiryDetails: "Anfrage-Details",
      inquiryNumber: "Anfrage-Nummer",
      petType: "Tierart",
      route: "Route",
      travelDate: "Reisedatum",
      nextSteps: "Unser Team wird Sie innerhalb von 24 Stunden mit einem detaillierten Angebot und den nächsten Schritten für die Reise Ihres Tieres kontaktieren.",
      urgentInquiry: "Für dringende Anfragen kontaktieren Sie uns direkt:",
      bestRegards: "Mit freundlichen Grüßen,"
    },
    it: {
      globalTransport: "Trasporto Globale di Animali",
      hello: "Ciao",
      thankYou: "Grazie per la sua richiesta con Pet Airlines! Abbiamo ricevuto la sua richiesta e il nostro team la esaminerà a breve.",
      inquiryDetails: "Dettagli della Richiesta",
      inquiryNumber: "Numero di Richiesta",
      petType: "Tipo di Animale",
      route: "Percorso",
      travelDate: "Data di Viaggio",
      nextSteps: "Il nostro team la contatterà entro 24 ore con un preventivo dettagliato e i prossimi passi per il viaggio del suo animale.",
      urgentInquiry: "Per richieste urgenti, ci contatti direttamente:",
      bestRegards: "Cordiali saluti,"
    },
    pt: {
      globalTransport: "Transporte Global de Animais",
      hello: "Olá",
      thankYou: "Obrigado pela sua consulta com a Pet Airlines! Recebemos a sua solicitação e a nossa equipa irá analisá-la em breve.",
      inquiryDetails: "Detalhes da Consulta",
      inquiryNumber: "Número da Consulta",
      petType: "Tipo de Animal",
      route: "Rota",
      travelDate: "Data de Viagem",
      nextSteps: "A nossa equipa entrará em contacto consigo dentro de 24 horas com um orçamento detalhado e os próximos passos para a viagem do seu animal.",
      urgentInquiry: "Para consultas urgentes, contacte-nos diretamente:",
      bestRegards: "Melhores cumprimentos,"
    }
  };
  
  return messages[language] || messages.en;
}