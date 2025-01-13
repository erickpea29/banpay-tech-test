import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import { Roboto } from "next/font/google";
import { Nunito_Sans } from "next/font/google";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const nunito_sans = Nunito_Sans({
  variable: "--font-nunito-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.variable} ${nunito_sans.variable}`}>
      <ClerkProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Component {...pageProps} />
        </ThemeProvider>
      </ClerkProvider>
    </div>
  );
}
