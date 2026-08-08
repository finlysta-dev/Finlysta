// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  console.log('📝 [LOGOUT] API called')
  
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  })

  response.cookies.delete('token')
  
  console.log('✅ [LOGOUT] Logged out')
  return response
}