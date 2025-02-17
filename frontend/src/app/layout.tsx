'use client';
import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
          <body>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {children}
              </ThemeProvider>
          </body>
      </html>
  );
}
