import {createGlobalStyle} from "styled-components";
import {CartContext, CartContextProvider} from "@/components/CartContext";
import FooterComponent from "@/components/Footer";
import CartSummary from "@/components/CartSummary";
import {SessionProvider} from "next-auth/react";
import Header from "@/components/Header";
import ScrollToTop from "@/components/scrollButton";
import {Mulish} from "next/font/google";

const mulish = Mulish({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: ${mulish.style.fontFamily};
  }
`;
export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <>
        <GlobalStyles/>
        <SessionProvider session={session}>
            <CartContextProvider>
                <Header/>
                <Component {...pageProps} />
                <CartSummary/>
                <FooterComponent/>
                <ScrollToTop/>
            </CartContextProvider>
        </SessionProvider>
    </>
  );
}
