'use client';
import Image from 'next/image';
import { imageMainHome } from '../shared/config/images';
import { FormCalculate } from '../features/form-calculate';

export default function Home() {

  return (
    <main className="min-h-screen m-auto bg-[#f5f5f5] p-[16px] flex flex-col lg:flex-row container gap-[50px] mt-[30px]">
      <div>
        <Image src={imageMainHome} alt="" width="600" height="600" />
        <p className="text-lg text-[#242424] mt-[20px]">
          <span className="text-[25px] text-[#242424] font-black">KalKkal</span> - это инновационное веб-приложение, созданное с целью помочь вам достичь вашей максимальной жизненной активности и здоровья. Этот проект разработан, чтобы простым и удобным образом помочь вам рассчитать и отслеживать ваше ежедневное потребление калорий, а также предоставить персонализированные рекомендации для достижения ваших целей в области фитнеса и здоровья.
        </p>
      </div>
      <FormCalculate />
    </main>
  )
}
