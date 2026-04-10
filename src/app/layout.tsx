import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryClientProvider } from "./ReactQueryClientProvider";

// styled-components issus solution
import StyledComponentsRegistry from "./StyledComponentsRegistry";

// fontawesome issue solution
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Analytics } from '@vercel/analytics/react';
config.autoAddCss = false

export const metadata: Metadata = {
  title: "MovieFilter",
  description: "현재 감정, 상황에 따른 영화 추천 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider> 
      <html lang="en">
        <body>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
