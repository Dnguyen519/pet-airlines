'use client'

import { useState } from 'react'

export default function EmailPreview() {
  const [language, setLanguage] = useState('en')
  
  const sampleData = {
    fullName: 'John Smith',
    email: 'john.smith@example.com',
    inquiryNumber: 'PA-2024-001234',
    petType: 'dog',
    originCountry: 'Canada',
    destinationCountry: 'Japan',
    travelDate: '2024-03-15',
    language: language
  }

  const getMessagesByLanguage = (lang: string) => {
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
    }
    
    return messages[lang] || messages.en
  }

  const messages = getMessagesByLanguage(language)

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Pet Airlines Email Template Preview</h1>
          <div className="flex justify-center space-x-4">
            <label className="flex items-center">
              <span className="mr-2">Language:</span>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="pt">Português</option>
              </select>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
          {/* Email Content */}
          <div style={{
            fontFamily: 'Arial, sans-serif',
            lineHeight: '1.6',
            color: '#333',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '0'
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '30px',
              textAlign: 'center',
              borderRadius: '0'
            }}>
              <h1 style={{
                margin: '0',
                fontSize: '28px'
              }}>
                🐾 Pet Airlines
              </h1>
              <p style={{
                margin: '10px 0 0 0',
                fontSize: '16px'
              }}>
                {messages.globalTransport}
              </p>
            </div>
            
            {/* Body */}
            <div style={{
              background: '#f9f9f9',
              padding: '30px'
            }}>
              <h2 style={{
                color: '#667eea',
                marginTop: '0'
              }}>
                {messages.hello} {sampleData.fullName}!
              </h2>
              
              <p>{messages.thankYou}</p>
              
              <div style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                margin: '20px 0',
                borderLeft: '4px solid #667eea'
              }}>
                <h3 style={{
                  marginTop: '0',
                  color: '#667eea'
                }}>
                  {messages.inquiryDetails}
                </h3>
                <p><strong>{messages.inquiryNumber}:</strong> {sampleData.inquiryNumber}</p>
                <p><strong>{messages.petType}:</strong> {sampleData.petType}</p>
                <p><strong>{messages.route}:</strong> {sampleData.originCountry} → {sampleData.destinationCountry}</p>
                <p><strong>{messages.travelDate}:</strong> {sampleData.travelDate}</p>
              </div>
              
              <p>{messages.nextSteps}</p>
              
              <div style={{
                background: '#e8f2ff',
                padding: '15px',
                borderRadius: '8px',
                margin: '20px 0'
              }}>
                <p style={{ margin: '0' }}>
                  <strong>📞 {messages.urgentInquiry}</strong>
                </p>
                <p style={{ margin: '5px 0 0 0' }}>
                  WhatsApp: +1 (555) 123-4567
                </p>
              </div>
              
              <p>
                {messages.bestRegards}<br />
                <strong>Pet Airlines Team</strong><br />
                🌍 {messages.globalTransport}
              </p>
            </div>
          </div>
        </div>

        {/* Admin Email Preview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto mt-8">
          <div className="bg-gray-800 text-white p-4">
            <h3 className="text-lg font-semibold">Admin Notification Email Preview</h3>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">New Pet Airlines Inquiry Received</h2>
            
            <div className="space-y-2">
              <p><strong>Inquiry Number:</strong> {sampleData.inquiryNumber}</p>
              <p><strong>Customer Name:</strong> {sampleData.fullName}</p>
              <p><strong>Email:</strong> {sampleData.email}</p>
              <p><strong>Pet Type:</strong> {sampleData.petType}</p>
              <p><strong>Route:</strong> {sampleData.originCountry} → {sampleData.destinationCountry}</p>
              <p><strong>Travel Date:</strong> {sampleData.travelDate}</p>
              <p><strong>Language:</strong> {sampleData.language}</p>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400">
              <p className="text-sm text-yellow-800">
                Please respond within 24 hours as per our service commitment.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            This is how your customers will see the confirmation email when they submit an inquiry.
          </p>
        </div>
      </div>
    </div>
  )
}