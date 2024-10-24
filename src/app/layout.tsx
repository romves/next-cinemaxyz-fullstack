import Navbar from "@/shared/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/shared/components/Footer";
import Providers from "@/shared/components/providers/Providers";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Toaster } from "@/shared/components/ui/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CinemaXYZ",
  description: "Watch together with your family and friends",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />

          {authModal}
          <Toaster />
          
          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
