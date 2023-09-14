import { LoginForm } from "@/src/features/login-form";
import { image2 } from "@/src/shared/config/images";
import Image from "next/image";

export default function Page() {
    return (
        <main className="p-[16px] lg:flex flex-col justify-center items-center lg:h-[calc(100dvh-46px)]">
            <div className="flex flex-col items-center justify-between gap-[20px] lg:gap-[100px] lg:flex-row mt-[20px] lg:mt-0">
                <div className="flex justify-center">
                    <Image src={image2} alt="image2" width="500" height="500" className="w-[300px] h-[300px]" />
                </div>
                <div className="w-full lg:w-[400px] flex-shrink-0">
                    <h1 className="text-[30px] text-[#152E37] font-black mb-[20px]">Авторизация</h1>
                    <LoginForm />

                    <p className="text-xs text-[#525252] mt-[20px]">
                        * Эта форма является как авторизацией так и регистрацией
                    </p>
                </div>
            </div>
        </main>
    );
}