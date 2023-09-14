import './globals.css';
import "react-loading-skeleton/dist/skeleton.css";
import type { Metadata } from 'next'
import Link from 'next/link'
import { Providers } from './providers'
import { authOptions } from '../shared/lib';
import { getServerSession } from 'next-auth';
import { Header } from '../widgets/header';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Kalkulator Kkal',
  description: 'Онлайн калькулятор калорий и учет приемов пищи. Следите за своим рационом и достигайте своих целей.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)


  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kalkulator Kkal</title>
        <meta name="description" content="Онлайн калькулятор калорий и учет приемов пищи. Следите за своим рационом и достигайте своих целей." />
        <meta name="keywords" content="калории, калькулятор, учет приемов пищи, здоровое питание" />
        <meta httpEquiv="Content-Language" content="ru" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta property="og:title" content="Kalkulator Kkal" />
        <meta property="og:description" content="Онлайн калькулятор калорий и учет приемов пищи. Следите за своим рационом и достигайте своих целей." />
        <meta property="og:image" content="ссылка на изображение вашего сайта" />
        <meta property="og:url" content="ссылка на ваш сайт" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&family=Unbounded:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Yandex.Metrika counter */}
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
                      m[i].l=1*new Date();
                      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

                      ym(94951764, "init", {
                        clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
              });
            `
          }}
        />

        <noscript><div><img src="https://mc.yandex.ru/watch/94951764" style={{ position: 'absolute', left: -9999 }} alt="" /></div></noscript>
        {/* /Yandex.Metrika counter */}
      </head>
      <body className="bg-[#f5f5f5]">
        <Providers session={session}>
          <Header />
          {children}
        </Providers>

      </body>
    </html>
  )
}
