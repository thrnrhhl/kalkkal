'use client';
import { FormMeal } from "@/src/features/form-meal";
import { mealsApi } from "@/src/shared/api";
import { signOut, useSession } from "next-auth/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { MealCard } from "@/src/entities/meal";
import { lineChartOption } from "@/src/shared/config/constants";
import Skeleton from 'react-loading-skeleton'
import { ButtonLogout } from "@/src/features/button-logout";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Page() {
    const { data: session } = useSession();
    const meals = mealsApi.useGetMealsQuery(null);
    const mealsGraph = mealsApi.useGetMealsGraphQuery(null);
    const infoMealUser = mealsApi.useGetInfoMealUserQuery(null);

    return (
        <main className="p-[16px] bg-[#f5f5f5] min-h-screen lg:h-full container flex flex-col lg:flex-row justify-between m-auto gap-[50px]">
            <div className="lg:sticky top-[62px] h-fit w-full lg:w-[420px] flex-shrink-0">
                <div className="flex items-center justify-between  mb-[20px]">
                    <h1 className="text-[35px] font-[900] text-[#242424] text-left">Привет, {session?.user.login}</h1>
                    <ButtonLogout />
                </div>


                {infoMealUser.isLoading && (
                    <Skeleton className="h-[92px] w-full my-[10px] !rounded-[10px] " />
                )}

                {infoMealUser.isSuccess && (
                    <div className="p-[20px] rounded-[10px] bg-[#44858215] my-[10px] border border-[#44858250]">
                        <span className="text-[20px] font-black text-[#242424]">
                            Сегодня вы съели: <span className="text-[#448582]">{infoMealUser?.data?.data.today}</span> ккал</span>
                        <span className="block text-sm text-[#525252]">За эту неделю вы съели: {infoMealUser?.data?.data.week} ккал</span>
                    </div>
                )}

                <FormMeal />

                {infoMealUser.isLoading && (
                    <Skeleton className="h-[211px] w-full mt-[20px] !rounded-[10px] " />
                )}
                {mealsGraph.isSuccess && (
                    <div className="p-[20px] bg-[#fff] rounded-[10px] mt-[20px]">
                        <Line options={lineChartOption} data={{
                            labels: mealsGraph?.data?.data.graphLabels,
                            datasets: [
                                {
                                    label: 'Текущая неделя',
                                    data: mealsGraph?.data?.data.currentData,
                                    borderColor: 'rgb(21, 56, 55)',
                                    backgroundColor: 'rgba(21, 56, 55, 1)',
                                },
                                {
                                    label: 'Предыдущая неделя',
                                    data: mealsGraph?.data?.data.previosData,
                                    borderColor: 'rgba(68, 133, 130, 1)',
                                    backgroundColor: 'rgba(68, 133, 130, 1)',
                                },
                            ],
                        }} />
                    </div>
                )}


            </div>

            {meals.isLoading && (
                <div className="w-full h-fit">
                    <div className="flex justify-between items-center mb-[10px] sticky top-[50px] lg:relative lg:top-0">
                        <Skeleton className="!w-[136px] h-[36px] !rounded-[10px]" />
                        <Skeleton className="!w-[88px] h-[34px] !rounded-[10px]" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                        {Array(10).fill(null).map((key, index) => (
                            <Skeleton key={index} className="w-full h-[85px] !rounded-[10px]" />
                        ))}
                    </div>
                </div>
            )}
            {meals.isSuccess && (
                <div className="flex flex-col gap-[20px] w-full  h-fit">
                    {meals?.data?.data.map((key, index) => (
                        <div key={index}>
                            <div className="flex justify-between items-center mb-[10px] sticky top-[50px] lg:relative lg:top-0">
                                <h3 className="text-[24px] text-[#242424] font-black">{moment(key.date).format('DD.MM.YYYY')}</h3>
                                <div className="text-[#448582] text-[16px] font-black bg-[#fff] shadow p-[5px] rounded-[5px] h-fit">{key.records.reduce((acc, cur) => acc + cur.kcal, 0)} ккал</div>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[10px]">
                                {key.records.map((meal, indexMeal) => (
                                    <MealCard
                                        key={indexMeal}
                                        product={meal.product}
                                        gram={meal.gram}
                                        kcal={meal.kcal}
                                        date={meal.date}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}