import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import prisma from "@/prisma";


const schema = yup.object().shape({
    login: yup.string().required(),
    pwd: yup.string().required(),
});

export async function POST(req: Request) {
    try {   

        const body = await req.json();

        const { login, pwd }: { login: string, pwd: string; } = body;

        await schema.validate(body);

        // Поиск пользователя
        const userDoc = await prisma.users.findUnique({
            where: {
                login: login
            }
        });

        if(!userDoc) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(pwd, salt);

            const new_doc = await prisma.users.create({
                data: {
                    login: login,
                    pwd: hash,
                }
            });

            const jwt_token = jwt.sign(
            { id: new_doc.id },
            "kalkulator-kkal",
            {  expiresIn: "30d", }
            );

            return NextResponse.json(
                {
                    ok: 1, 
                    data: { 
                        id: new_doc.id,
                        login: new_doc.login,
                        accessToken: jwt_token
                    }
                }, 
                { status: 200 })
        }

        const is_valid_pass = await bcrypt.compare(
            pwd,
            userDoc.pwd
        );

        if (!is_valid_pass) {
            return NextResponse.json(
                {
                    ok: 0, 
                    message: "Не верный логин или пароль",
                }, 
                {status: 400}
            );
        }

        const jwt_token = jwt.sign(
            { id: userDoc.id },
            "kalkulator-kkal",
            {  expiresIn: "30d", }
        );

            return NextResponse.json(
                {
                    ok: 1, 
                    data: {
                        id: userDoc.id,
                        login: userDoc.login,
                        accessToken: jwt_token
                    }
                }, 
                {status: 200}
            );

    } catch(e) {
        throw e;
    }
}