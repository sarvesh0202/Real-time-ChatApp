import { Inter } from "next/font/google";
import "./globals.css";
import ContextProvider from "../../Helper/Context";
import { ThemeProvider } from "@mui/material";
import theme from '../theme';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nutrii",
  description: "By FlexBoys",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>
          <ContextProvider>
            {children}
          </ContextProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}
