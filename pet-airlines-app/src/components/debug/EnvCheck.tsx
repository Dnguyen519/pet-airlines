'use client'

export default function EnvCheck() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (process.env.NODE_ENV === 'production') {
    return null // Don't show in production
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-xs max-w-sm">
      <div className="font-bold mb-2">Environment Check:</div>
      <div>URL: {supabaseUrl ? '✅' : '❌'}</div>
      <div>Key: {supabaseAnonKey ? '✅' : '❌'}</div>
      <div className="text-gray-400 mt-1">
        {supabaseUrl && `URL: ${supabaseUrl.substring(0, 30)}...`}
      </div>
    </div>
  )
}