import * as yup from 'yup';
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/shared/lib';

const schema = yup.object().shape({
    id: yup.string().required(),
    gram: yup.number().required(),
    product: yup.string().required(),
    kcal: yup.number().required(),
    date: yup.string().required(),
});

export async function PUT(req: Request) {
    try {   
        const session = await getServerSession(authOptions);

        // Если сессии пользовтаеля нет то возвращаем ошибку
        if(!session) return NextResponse.json(
                {
                    ok: 0, 
                    message: 'Пользователь не авторизован'
                }, 
                {status: 401}
            );

        // Получаем данные
        const body = await req.json();

        // Валидируем данные
        await schema.validate(body);

        // Ищем документ
        const mealDocument = await prisma.meals.findUnique({
            where: {
                id: body.id
            }
        });

        // Если документ не найден, то возвращаем ошибку
        if(!mealDocument) return NextResponse.json(
            {
                ok: 0,
                message: 'Документ не найден'
            },
            { status: 404 }
        );

        // Обновляем документ
        const updDocument = await prisma.meals.update({
            where: {
                id: body.id
            },
            data: {
                gram: body.gram,
                product: body.product,
                kcal: body.kcal,
                date: new Date(body.date).toISOString()
            }
        })

        // Возвращаем ответ
            return NextResponse.json(
                {
                    ok: 1, 
                    data: {
                        id: updDocument.id,
                        gram: updDocument.gram,
                        product: updDocument.product,
                        kcal: updDocument.kcal,
                    }
                }, 
                {status: 200}
            );

    } catch(e) {
        throw e;
    }
}