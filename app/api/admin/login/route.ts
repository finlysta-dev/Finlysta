import prisma from "@/lib/prisma"
import bcrypt from 'bcryptjs';
import { NextResponse } from "next/server"

export async function POST(req: Request){

  const body = await req.json()

  const admin = await prisma.admin.findUnique({
    where:{
      email: body.email
    }
  })

  if(!admin){
    return NextResponse.json({success:false})
  }

  const validPassword = await bcrypt.compare(
    body.password,
    admin.password
  )

  if(!validPassword){
    return NextResponse.json({success:false})
  }

  return NextResponse.json({success:true})
}