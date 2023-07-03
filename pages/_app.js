import {createGlobalStyle} from "styled-components";
import {CartContext, CartContextProvider} from "@/components/CartContext";
import FooterComponent from "@/components/Footer";
import CartSummary from "@/components/CartSummary";

const GlobalStyles = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap");
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Quicksand', sans-serif;
  }
`;
export default function App({ Component, pageProps }) {
  return (
    <>
        <GlobalStyles/>
        <CartContextProvider>
            <Component {...pageProps} />
            <CartSummary/>
            <FooterComponent/>
        </CartContextProvider>
    </>
  );
}
