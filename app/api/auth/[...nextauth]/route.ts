// This route is intentionally disabled.
// Authentication is handled by custom JWT auth in lib/auth/auth.ts
export async function GET() {
  return new Response(
    JSON.stringify({ 
      error: 'Auth route disabled. Use /api/auth/login, /api/auth/register, /api/auth/me' 
    }),
    {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export async function POST() {
  return new Response(
    JSON.stringify({ 
      error: 'Auth route disabled. Use /api/auth/login, /api/auth/register, /api/auth/me' 
    }),
    {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}