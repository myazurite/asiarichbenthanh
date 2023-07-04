import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import styled from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import axios from "axios";
import Badge from "@mui/material/Badge";


const CartSummaryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #000;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  div {
    align-items: center;
    display: flex;
  }
  
  button {
    background-color: transparent;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Total = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const GoToCartButton = styled.div`

  gap: 5px;
  span{
    font-weight: 600;
    font-size: 1rem;
  }
`

function CartSummary() {
    const {cartProducts} = useContext(CartContext);
    const router = useRouter();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (cartProducts.length > 0) {
            axios
                .post("/api/cart", {ids: cartProducts})
                .then((response) => {
                    setProducts(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching product details:", error);
                });
        } else {
            setProducts([]);
        }
    }, [cartProducts]);

    const totalItems = cartProducts.length;

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        for (const productId of cartProducts) {
            const product = products.find((p) => p._id === productId);
            if (product) {
                totalPrice += product.price;
            }
        }
        return totalPrice;
    };

    function formatNumber(num) {
        return new Intl.NumberFormat("de-DE").format(num);
    }

    const handleRedirectToCart = () => {
        router.push("/cart");
    };

    if (!cartProducts || cartProducts.length === 0) return null;

    return (
        <CartSummaryWrapper>
            <div>
                <Button size={"xl"} onClick={handleRedirectToCart}>
                    <Badge badgeContent={totalItems} color="success">
                        <CartIcon />
                    </Badge>
                </Button>
                <Total>{formatNumber(calculateTotalPrice())} ₫</Total>
            </div>
            <GoToCartButton>
                <Button size={"sm"} onClick={handleRedirectToCart}>
                    <span>Vào giỏ hàng</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Button>
            </GoToCartButton>
        </CartSummaryWrapper>
    );
}

export default CartSummary;
