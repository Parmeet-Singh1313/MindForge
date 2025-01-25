import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <GoogleOneTap/>
        <body
          className={`${outfit.variable} font-outfit antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}