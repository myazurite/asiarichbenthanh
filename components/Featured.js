import styled from "styled-components";
import Center from "@/components/Center";
import thumbnail from "@/public/assets/thumbnail1.jpg";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import ButtonLink from "@/components/ButtonLink";
import {useContext} from "react";
import {CartContext} from "@/components/CartContext";
import Image from "next/image";
import {RevealWrapper} from "next-reveal";
import {Montserrat_Alternates} from "next/font/google";
import Star from "@/components/icons/Star";

const montAlt = Montserrat_Alternates({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
})

const Bg = styled.div`
  color: #fff;
  width: 100%;
  height: 350px;

  img {
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

const PromoBg = styled.div`
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
  font-family: ${montAlt.style.fontFamily};
  color: #164d26;
  margin: 0;
  font-weight: 500;
  font-size: 1.5rem;
  display: flex;
  align-items: center;

  svg {
    width: 45px;
    height: 45px;
    fill: #FFD700;
    margin-top: 7px;
  }

  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;
const Desc = styled.p`
  color: #000;
  font-size: .95rem;
  line-height: 1.5;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;

  img {
    max-width: 100%;
    max-height: 350px;
    display: block;
    margin: 0 auto;
    border-radius: 10px;
  }

  div:nth-child(1) {
    order: 2;
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    & > div:nth-child(1) {
      order: 0;
    }

    img {
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
  gap: 10px;
  margin-top: 25px;
`;

const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const ImgColumn = styled(Column)`
  & > div {
    width: 100%;
  }
`

const ContentWrapper = styled.div`
  
`

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
                                    <RevealWrapper origin={'left'} delay={0}>
                                        <ContentWrapper>
                                            <Title>THỰC PHẨM NĂM S<Star/>O</Title>
                                            <Desc>Tinh hoa thực phẩm Việt chất lượng <br/> Tiện lợi, bữa ăn sẵn sàng
                                                trong 15 phút <br/> Không chất bảo
                                                quản <br/> Không màu thực phẩm <br/> Không bột ngọt/bột nêm <br/> Bánh
                                                mì, bánh
                                                bao không bột nổi</Desc>
                                            <ButtonsWrapper>
                                                <ButtonLink
                                                    href={'/product/' + product._id}
                                                    outline
                                                    primary
                                                    size='l'
                                                >
                                                    Xem thêm
                                                </ButtonLink>
                                                <Button onClick={addFeaturedToCart} buyBtn size='l'><CartIcon/> Mua
                                                    ngay</Button>
                                            </ButtonsWrapper>
                                        </ContentWrapper>
                                    </RevealWrapper>
                                </div>
                            </Column>
                            <RevealWrapper>
                                <ImgColumn>
                                    <CenterImg>
                                        <img className={'main'} src={product.images?.[0]} alt=""/>
                                    </CenterImg>
                                </ImgColumn>
                            </RevealWrapper>
                        </ColumnsWrapper>
                    </Center>
                </PromoBg>
            </FeaturedWrapper>
        </>
    )
}

