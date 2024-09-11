import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: "variable"
});

export const metadata: Metadata = {
  title: "CodepediA",
  description: "The code library to save you the search effort.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ 'backgroundColor': '#e9e9e9' }} className={ sourceCodePro.className }>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#181818',
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
