import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/shared/lib';

export async function GET(req: Request) {
    try {   
        const session = await getServerSession(authOptions);


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if(!session) return NextResponse.json(
                {
                    ok: 1, 
                    message: 'Пользователь не авторизован'
                }, 
                {status: 401}
            );


        const meals = await prisma.meals.aggregateRaw({
            pipeline: [
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: '%Y-%m-%d',
                                date: '$date'
                            }
                        },

                        records: {$push: '$$ROOT'}
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        records: {
                            $map: {
                                input: '$records',
                                as: 'record',
                                in: {
                                    id: '$$record.id',
                                    product: '$$record.product',
                                    gram: '$$record.gram',
                                    kcal: '$$record.kcal',
                                }
                            }
                        }                     
                    }
                },
                {
                    $sort: {
                        date: -1
                    }
                }
            ],
        });


            return NextResponse.json(
                {
                    ok: 1, 
                    data: meals
                }, 
                {status: 200}
            );

    } catch(e) {
        throw e;
    }
}


// {
//                     $match: {
//                         $expr: {
//                             $and: [
//                                 {
//                                     $gte: [
//                                         '$createdAt',
//                                         {
//                                             $dateFromString: {
//                                                 dateString: today.toISOString()
//                                             }
//                                         }
//                                     ],
//                                 },
//                                 {
//                                     $lt: [
//                                         '$createdAt',
//                                         {
//                                            $dateFromString: {
//                                                 dateString: tomorrow.toISOString()
//                                             } 
//                                         }
//                                     ]
//                                 }
//                             ]
//                         }
//                     }
//                 },