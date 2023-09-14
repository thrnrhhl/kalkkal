import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const ButtonLogout = () => {
    const logout = async () => await signOut({ redirect: true, callbackUrl: '/' });

    return (
        <LogOut className="text-[#448582] w-4 h-4 cursor-pointer" onClick={logout} />
    );
};