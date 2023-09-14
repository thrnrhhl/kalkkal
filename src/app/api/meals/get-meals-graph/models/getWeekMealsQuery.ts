import prisma from "@/prisma";
import { JsonValue } from "@prisma/client/runtime/library";

export const getWeekMealsQuery = async (dates: Date[]) => {
    try {
        const result = await prisma.meals.aggregateRaw({
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
                                                dateString: dates[0].toISOString()
                                            }
                                        }
                                    ],
                                },
                                {
                                    $lt: [
                                        '$date',
                                        {
                                           $dateFromString: {
                                                dateString: dates[dates.length - 1].toISOString()
                                            } 
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                },
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
                                in: '$$record.kcal'
                            }
                        }                     
                    }
                },
            ]
        });


        return result as any;
    } catch(e) {
        throw e;
    }
}