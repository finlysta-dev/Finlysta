import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  
  if (!token) {
    return new Response('Missing token', { status: 400 });
  }
  
  // Create a readable stream for SSE
  const stream = new ReadableStream({
    async start(controller) {
      let lastStatus = '';
      let intervalId: NodeJS.Timeout;
      
      const sendEvent = (data: any) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };
      
      const checkStatus = async () => {
        try {
          const job = await prisma.job.findUnique({
            where: { id: token },
            select: { status: true }
          });
          
          if (job && job.status !== lastStatus) {
            lastStatus = job.status;
            sendEvent({ status: job.status, changed: true });
          }
        } catch (error) {
          console.error('Error checking status:', error);
        }
      };
      
      // Send initial status
      await checkStatus();
      
      // Check every 3 seconds for status changes
      intervalId = setInterval(checkStatus, 3000);
      
      // Clean up on close
      request.signal.addEventListener('abort', () => {
        clearInterval(intervalId);
        controller.close();
      });
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}