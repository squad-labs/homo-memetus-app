import "ress";
import "@/styles/globals.scss";
import ReduxProvider from "@/states/global/provider";
import Web3Provider from "@/providers/Web3Provider";
import AppProvider from "@/providers/AppProvider";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Web3Provider>
            <AppProvider>{children}</AppProvider>
          </Web3Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
