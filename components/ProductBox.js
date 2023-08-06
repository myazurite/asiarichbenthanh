import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import Image from "next/image"


const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.4);

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &::before {
    top: 0;
    left: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  &::after {
    bottom: 0;
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }
`;


const WhiteBox = styled(Link)`
  position: relative;

  img {
    object-fit: cover;
    border-radius: 10px;
  }

  div {
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    height: 150px;
    width: 100%;
    overflow: hidden;
    @media screen and (min-width: 768px) {
      height: 220px;
    }
  }
`;

const Title = styled.span`
  position: absolute;
  bottom: 0;
  font-weight: 600;
  text-align: center;
  font-size: .9rem;
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: end;
  justify-content: center;
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
  background: linear-gradient(to top, rgba(34, 34, 34, 0.9), rgba(34, 34, 34, 0));
  @media screen and (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;

const PriceRow = styled.div`
  flex: 1;
  margin-bottom: 5px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    padding-bottom: 3px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;

const FlashEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  animation: flash 0.5s linear;

  @keyframes flash {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const FlashEffectContainer = styled.div`
  position: relative;
`;

export default function ProductBox({_id, title, description, price, images, showBuyButton = true}) {
    const {addProduct} = useContext(CartContext);
    const url = '/product/' + _id;
    const [showFlash, setShowFlash] = useState(false);

    function handleBuyClick() {
        addProduct(_id);
        setShowFlash(true);
        setTimeout(() => {
            setShowFlash(false);
        }, 500);
    }

    function formatNumber(num) {
        return new Intl.NumberFormat('de-DE').format(num);
    }

    return (
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <Image src={images?.[0]} alt="Image" fill={true} />
                    <Title>{title}</Title>
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <PriceRow>
                    <Price>
                        {formatNumber(price)} ₫
                    </Price>
                    {/* Wrap the Button with a FlashEffectContainer */}
                    <FlashEffectContainer>
                        {showBuyButton &&
                            <Button
                                buyBtn
                                onClick={handleBuyClick}
                            >
                                <CartIcon/> Mua
                            </Button>
                        }
                        {showFlash && <FlashEffect />} {/* Render the flash effect only when showFlash is true */}
                    </FlashEffectContainer>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>
    );
}
