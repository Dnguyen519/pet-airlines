'use client'

import { useState } from 'react'

interface TestResults {
  environment?: any
  supabase?: any
  email?: any
  inquiry?: any
}

export default function TestDebugPage() {
  const [results, setResults] = useState<TestResults>({})
  const [loading, setLoading] = useState<string>('')

  const testSupabaseConnection = async () => {
    setLoading('supabase')
    try {
      const response = await fetch('/api/test-1-supabase', { method: 'POST' })
      const data = await response.json()
      setResults(prev => ({ ...prev, supabase: data }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, supabase: { error: error.message } }))
    }
    setLoading('')
  }

  const testEmailService = async () => {
    setLoading('email')
    try {
      const response = await fetch('/api/test-2-email', { method: 'POST' })
      const data = await response.json()
      setResults(prev => ({ ...prev, email: data }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, email: { error: error.message } }))
    }
    setLoading('')
  }

  const testInquirySubmission = async () => {
    setLoading('inquiry')
    try {
      const response = await fetch('/api/test-3-inquiry', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Test User',
          email: 'test@example.com',
          pet_type: 'dog',
          from_city: 'Toronto',
          to_city: 'Seoul'
        })
      })
      const data = await response.json()
      setResults(prev => ({ ...prev, inquiry: data }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, inquiry: { error: error.message } }))
    }
    setLoading('')
  }

  const testEnvironmentVariables = async () => {
    setLoading('env')
    try {
      const response = await fetch('/api/test-0-environment', { method: 'POST' })
      const data = await response.json()
      setResults(prev => ({ ...prev, environment: data }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, environment: { error: error.message } }))
    }
    setLoading('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🧪 Pet Airlines Debug Center
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={testEnvironmentVariables}
            disabled={loading === 'env'}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg disabled:opacity-50"
          >
            {loading === 'env' ? 'Testing...' : '1. Test Environment Variables'}
          </button>

          <button
            onClick={testSupabaseConnection}
            disabled={loading === 'supabase'}
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg disabled:opacity-50"
          >
            {loading === 'supabase' ? 'Testing...' : '2. Test Supabase Connection'}
          </button>

          <button
            onClick={testEmailService}
            disabled={loading === 'email'}
            className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg disabled:opacity-50"
          >
            {loading === 'email' ? 'Testing...' : '3. Test Email Service'}
          </button>

          <button
            onClick={testInquirySubmission}
            disabled={loading === 'inquiry'}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg disabled:opacity-50"
          >
            {loading === 'inquiry' ? 'Testing...' : '4. Test Full Inquiry Flow'}
          </button>
        </div>

        {/* Results Display */}
        <div className="space-y-6">
          {Object.entries(results).map(([test, result]) => (
            <div key={test} className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-3 capitalize">{test} Test Results</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Debug Instructions:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1. Test environment variables first to ensure all keys are present</li>
            <li>2. Test Supabase connection to check database access and RLS policies</li>
            <li>3. Test email service independently to isolate Resend API issues</li>
            <li>4. Test full inquiry flow to identify integration problems</li>
          </ul>
        </div>
      </div>
    </div>
  )
}