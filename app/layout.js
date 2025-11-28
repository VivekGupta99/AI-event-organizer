import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";



export const metadata = {
  title: "Spott",
  description: "Discover and create AI-powered events effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body
        className={`bg-linear-to-br form-gray-950 via-zinc-900 to-stone-900 text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >


          {/* Header here */}
          <Header />

          <main className="relative min-h-screen container mx-auto pt-40 md:pt-32">
            <div className=" pointer-events-none absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/20  rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20  rounded-full blur-3xl"></div>
            </div>
            <div className=" relative z-10 min-h-[70vh]">{children}</div>

            {/* Footer */}
            <footer className=" border-t border-gray-800/50 pt-8 px-6 max-w-7xl mx-auto">
              <div className=" text-sm text-gray-400">create AI-powered events effortlessly with Spott</div>
            </footer>
          </main>

        </ThemeProvider>
      </body>
    </html>
  );
}
