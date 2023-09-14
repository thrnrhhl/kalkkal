import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/shared/lib';


const schema = yup.object().shape({
    gram: yup.number().required(),
    product: yup.string().required(),
    kcal: yup.number().required(),
});

export async function POST(req: Request) {
    try {   
        const session = await getServerSession(authOptions);

        if(!session) return NextResponse.json(
                {
                    ok: 1, 
                    message: 'Пользователь не авторизован'
                }, 
                {status: 401}
            );

        const body = await req.json();

        await schema.validate(body);


        const newDocument = await prisma.meals.create({
            data: {
                userId: session?.user.id || '',
                gram: body.gram,
                product: body.product,
                kcal: body.kcal,
                date: new Date(body.date).toISOString()
            }
        })


            return NextResponse.json(
                {
                    ok: 1, 
                    data: {
                        id: newDocument.id,
                        gram: newDocument.gram,
                        product: newDocument.product,
                        kcal: newDocument.kcal,
                    }
                }, 
                {status: 200}
            );

    } catch(e) {
        throw e;
    }
}