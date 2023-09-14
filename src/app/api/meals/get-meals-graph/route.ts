import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/shared/lib';
import { getDatesForCurrentAndPreviousWeeks } from "@/src/shared/config/helpers";
import {getWeekMealsQuery} from './models/getWeekMealsQuery';
import moment from "moment";

export async function GET(req: Request) {
    try {   
        const session = await getServerSession(authOptions);
        const { currentWeek, previousWeek } = getDatesForCurrentAndPreviousWeeks();

        if(!session) return NextResponse.json(
                {
                    ok: 1, 
                    message: 'Пользователь не авторизован'
                }, 
                {status: 401}
            );
    
        const previousMeals = await getWeekMealsQuery(previousWeek);
        const currentMeals = await getWeekMealsQuery(currentWeek);
        
        const previosData = previousWeek.map((key) => {

            let mealItem = previousMeals.find(item => {

                return item.date === moment(key).format('YYYY-MM-DD')
            });
            
            if(mealItem) {
                return mealItem.records.reduce((acc, cur) => acc+cur, 0);
            } else {
                return 0
            }
        });

        const currentData = currentWeek.map((key) => {
            let mealItem = currentMeals.find(item => item.date === moment(key).format('YYYY-MM-DD'));
            if(mealItem) {
                return mealItem.records.reduce((acc, cur) => acc+cur, 0);
            } else {
                return 0
            }
        });





        const graphLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

            return NextResponse.json(
                {
                    ok: 1, 
                    data: {
                        graphLabels,
                        previosData,
                        currentData
                    }
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