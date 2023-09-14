'use client';

import { LoginForm } from "@/src/features/login-form";

export default function Page() {
    return (
        <main className="p-[16px] flex flex-col justify-center items-center h-[calc(100dvh-46px)]">
            <h1 className="text-[30px] text-[#152E37] font-black mb-[20px]">Авторизация</h1>
            <LoginForm />
        </main>
    );
}