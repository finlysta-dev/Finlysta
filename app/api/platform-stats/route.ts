import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){

  try{

    const totalInternships = await prisma.internship.count({
      where:{
        published:true
      }
    });

    const activeInternships = await prisma.internship.count({
      where:{
        published:true
      }
    });

    const companies = await prisma.internship.groupBy({
      by:["company"]
    });

    const totalCompanies = companies.length;

    return NextResponse.json({
      totalInternships,
      activeInternships,
      totalCompanies
    });

  }catch(err){

    return NextResponse.json({
      totalInternships:0,
      activeInternships:0,
      totalCompanies:0
    });

  }

}
