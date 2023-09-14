import { IMeal } from "@/src/shared/api/meals/model";
import { Binary, Calendar, Scale } from "lucide-react";
import moment from "moment";
import { FC } from "react";

interface MealCardProps extends Omit<IMeal, 'id'> { };

export const MealCard: FC<MealCardProps> = ({ product, gram, kcal, date }) => {
    return (
        <div className="bg-[#fff] rounded-[10px] p-[15px] flex flex-col gap-[5px] shadow h-fit cursor-pointer">
            {/* <p className="text-[#525252] font-regular text-sm">13.09.2023</p> */}
            <p className="text-[#242424] font-regular text-md font-medium">{product}</p>
            <div className="flex items-center gap-[10px]">
                <p className="text-[#242424] font-black text-xs bg-[#f8f9fa] p-[5px] w-fit rounded-[5px] flex items-center gap-[5px]">
                    <Binary className="text-[#448582] w-4 h-4" />
                    {kcal} ккал</p>
                <p className="text-[#242424] font-black text-xs bg-[#f8f9fa] p-[5px] w-fit rounded-[5px] flex items-center gap-[5px]">
                    <Scale className="text-[#448582] w-4 h-4" />
                    {gram} грамм
                </p>
                <p className="text-[#242424] font-black text-xs bg-[#f8f9fa] p-[5px] w-fit rounded-[5px] flex items-center gap-[5px]">
                    <Calendar className="text-[#448582] w-4 h-4" />
                    {moment(date).format('DD.MM.YYYY')}
                </p>
            </div>
        </div>
    );
};