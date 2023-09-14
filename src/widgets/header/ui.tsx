'use client';
import { ChevronRight, UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const Header = () => {
    const { data: session } = useSession();
    // Kalkulator Kkal<
    return (
        <header className="backdrop-blur-sm sticky top-0 border-b z-[1]">
            <div className=" flex items-center justify-between px-[20px] container m-auto">
                <Link href="/" className="text-[30px] font-[900] text-[#242424] text-left">KalKkal</Link>
                {!!session && (
                    <Link href="/me">
                        <button className="text-sm flex text-[#152E37] items-center justify-center gap-[5px] transition-[.5s] bg-[#44858250] p-[3px_5px] rounded-full">
                            <UserCircle className="w-4 h-4 text-[#152E37]" />
                            {session.user.login}
                            {/* <ChevronRight className="w-4 h-4 text-[#152E37]" /> */}
                        </button>
                    </Link>
                )}
                {!!!session && (
                    <Link href="/login">
                        <button className="bg-[#152E37] rounded-full text-[#fff] p-[5px_15px] text-sm">Войти</button>
                    </Link>
                )}
            </div>

        </header>
    );
};