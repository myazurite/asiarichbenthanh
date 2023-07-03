import {useContext, useEffect, useState} from "react";
import {CartContext} from "@/components/CartContext";
import styled from "styled-components";
import CartIcon from "@/components/icons/CartIcon";
import Button from "@/components/Button";
import {useRouter} from "next/router";
import axios from "axios";
import Center from "@/components/Center";
import Badge from "@mui/material/Badge";


const CartSummaryWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #000;
  padding: 10px;
  display: flex;
  align-items: center;
  
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
            <Button size={'xl'} onClick={handleRedirectToCart}>
                <Badge badgeContent={totalItems} color="success">
                    <CartIcon/>
                </Badge>
            </Button>
            <Total>{formatNumber(calculateTotalPrice())} ₫</Total>
        </CartSummaryWrapper>
    );
}

export default CartSummary;
