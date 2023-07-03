import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const WhiteBox = styled(Link)`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  height: 120px;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    height: 180px;
  }
  img{
    object-fit: cover;
    max-width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;

const Title = styled(Link)`
  font-weight: 500;
  font-size:1rem;
  color:inherit;
  text-decoration:none;
  display: flex;
  flex: 1;
  align-items: center;
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex:1;
  justify-content: space-between;
`;

const PriceRow = styled.div`
  flex: 1;
  margin-bottom: 5px;
  margin-top:10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 10px;
    padding-bottom: 3px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:600;
  //text-align: right;
`;

export default function ProductBox({_id, title, description, price, images, showBuyButton = true}) {
    const { addProduct } = useContext(CartContext);
    const url = '/product/' + _id;

    function formatNumber(num) {
        return new Intl.NumberFormat('de-DE').format(num);
    }

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]} alt="" />
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <PriceRow>
                    <Title href={url}>{title}</Title>
                    <Price>
                        {formatNumber(price)} ₫
                    </Price>
                </PriceRow>
                {showBuyButton &&
                    <Button
                        block
                        primary
                        outline
                        onClick={() => addProduct(_id)}
                    >
                        <CartIcon/> Mua
                    </Button>
                }
            </ProductInfoBox>
        </ProductWrapper>
    );
}
