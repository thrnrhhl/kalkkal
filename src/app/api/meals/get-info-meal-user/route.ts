import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/shared/lib';
import { getDatesForCurrentAndPreviousWeeks } from "@/src/shared/config/helpers";

export async function GET(req: Request) {
    try {   
        const session = await getServerSession(authOptions);

        const { currentWeek } = getDatesForCurrentAndPreviousWeeks();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if(!session) return NextResponse.json(
            { ok: 1,  message: 'Пользователь не авторизован' }, 
            {status: 401}
        );
            
        const weekMeals = await prisma.meals.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $gt: [
                                        '$date',
                                        {
                                            $dateFromString: {
                                                dateString: currentWeek[0].toISOString()
                                            }
                                        }
                                    ],
                                },
                                {
                                    $lt: [
                                        '$date',
                                        {
                                            $dateFromString: {
                                                dateString: currentWeek[currentWeek.length-1].toISOString()
                                            }
                                        }
                                    ],
                                },
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        date: 1,
                        kcal: 1                    
                    }
                },
            ],
        });

        console.log(weekMeals);
        

        const todayMeals = await prisma.meals.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                {
                                    $gte: [
                                        '$date',
                                        {
                                            $dateFromString: {
                                                dateString: today.toISOString()
                                            }
                                        }
                                    ],
                                },
                                {
                                    $lt: [
                                        '$date',
                                        {
                                            $dateFromString: {
                                                dateString: tomorrow.toISOString()
                                            }
                                        }
                                    ],
                                },
                            ]
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        kcal: 1                    
                    }
                },
            ],
        });

        console.log(weekMeals);
        
            return NextResponse.json(
                {
                    ok: 1, 
                    data: {
                        today: todayMeals.reduce((acc, cur) => acc + cur.kcal, 0),
                        week: weekMeals.reduce((acc, cur) => acc + cur.kcal, 0),
                    }
                }, 
                {status: 200}
            );

    } catch(e) {
        throw e;
    }
}