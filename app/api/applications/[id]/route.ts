import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, notes } = body;

    const application = await prisma.jobApplication.update({
      where: { id: params.id },
      data: {
        status,
        notes,
        reviewedAt: new Date(),
      },
      include: {
        job: {
          include: {
            recruiter: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      message: `Application ${status}`,
      application,
    });

  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    );
  }
}