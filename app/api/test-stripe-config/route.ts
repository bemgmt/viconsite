import { NextResponse } from "next/server"

export async function GET() {
  // Comprehensive test endpoint
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  const secretKey = process.env.STRIPE_SECRET_KEY
  
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    publishableKey: {
      exists: !!publishableKey,
      length: publishableKey?.length || 0,
      prefix: publishableKey?.substring(0, 10) || 'N/A',
      fullValue: publishableKey || 'NOT SET',
      isUndefined: publishableKey === undefined,
      isEmpty: publishableKey === '',
      trimmedEmpty: publishableKey?.trim() === ''
    },
    secretKey: {
      exists: !!secretKey,
      length: secretKey?.length || 0,
      prefix: secretKey?.substring(0, 10) || 'N/A'
    },
    allEnvVars: Object.keys(process.env)
      .filter(key => key.includes('STRIPE'))
      .reduce((acc, key) => {
        acc[key] = {
          exists: !!process.env[key],
          length: process.env[key]?.length || 0,
          prefix: process.env[key]?.substring(0, 10) || 'N/A'
        }
        return acc
      }, {} as Record<string, any>)
  })
}

