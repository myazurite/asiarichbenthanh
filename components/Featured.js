import styled from "styled-components";
import Center from "@/components/Center";
import thumbnail from "@/public/assets/thumbnail1.jpg";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import ButtonLink from "@/components/ButtonLink";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Image from "next/image";

const Bg = styled.div`
  color:#fff;
  width: 100%;
  height: 350px;
  img{
    object-fit: cover;
  }
  div {
    position: relative;
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    height: 130px;
  }
`;

const FeaturedWrapper = styled.div`
  border-bottom: 1px solid lightgray;
`

const PromoBg = styled.div `
  //background: rgba(0, 95, 65, 0.9);
  padding: 50px 0;
  color: #fff;
  width: 100%;
  @media screen and (max-width: 768px) {
    padding-top: 30px;
    padding-bottom: 0;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
`
const Title = styled.h1`
  color: #000;
  margin:0;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#000;
  font-size:.95rem;
  line-height: 1.5;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img{
    max-width: 100%;
    max-height: 350px;
    display: block;
    margin: 0 auto;
    border-radius: 10px;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img{
      max-width: 100%;
    }
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
`;

export default function Featured({product}) {
    const {setCartProducts} = useContext(CartContext)
    function addFeaturedToCart() {
        setCartProducts(prev => [...prev, product._id]);
    }

    return (
        <>
            <FeaturedWrapper>
                <Bg>
                    <div>
                        <Image fill={true} src={thumbnail} alt="Đồ tươi mỗi ngày"/>
                    </div>
                </Bg>
                <PromoBg>
                    <Center>
                        <ColumnsWrapper>
                            <Column>
                                <div>
                                    <Title>Thực phẩm năm sao</Title>
                                    <Desc>Tinh hoa thực phẩm việt chất lượng <br/> Tiện lợi <br/> Không chất bảo quản <br/> Không màu thực phẩm <br/> Không bột ngọt/bột nêm <br/> Bánh mì, bánh bao không bột nổi</Desc>
                                    <ButtonsWrapper>
                                        <ButtonLink
                                            href={'/product/' + product._id}
                                            outline
                                            primary
                                            size='l'
                                        >
                                            Xem thêm
                                        </ButtonLink>
                                        <Button onClick={addFeaturedToCart} primary size='l'><CartIcon/> Mua ngay</Button>
                                    </ButtonsWrapper>
                                </div>
                            </Column>
                            <Column>
                                <img src={product.images[0]} alt=""/>
                            </Column>
                        </ColumnsWrapper>
                    </Center>
                </PromoBg>
            </FeaturedWrapper>
        </>
    )
}

