import styled from 'styled-components';
import logo from "@/public/assets/Logo.jpg";
import {AiOutlinePhone} from "react-icons/ai";
import {FaFacebookSquare, FaShippingFast} from "react-icons/fa";
import Image from "next/image";
import qrbank from "@/public/assets/qrbank.jpg"
import Zalo from "@/components/icons/Zalo";
import {BsPinMap} from "react-icons/bs";
import Link from "next/link";
import visa from "@/public/assets/footer/visa-logo-png-2015.png";
import mc from "@/public/assets/footer/mastercard-26161.png";
import cash from "@/public/assets/footer/cash.png";
import jcb from "@/public/assets/footer/jcb.png";
import ibank from "@/public/assets/footer/banking.png";

const Footer = styled.footer`
  background-color: #164d26;
  padding: 20px 0;
  @media screen and (min-width: 768px) {
    height: 250px;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  p {
    color: #D3D3D3;
    padding: 0;
    margin: 5px 0;
    font-size: .9rem;
  }

  img {
    border-radius: 5px;
  }

  :last-child {
    justify-content: center;
    align-self: start;
  }

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    margin-left: 40px;
  }
`;

const ColumnTitle = styled.h3`
  font-weight: bold;
  color: #fff;

  span {
    display: flex;
    gap: 5px;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 10px;
    color: #0D3D29;
    background: #F0E68C;
    border-radius: 5px;
  }
`;

const BrandImage = styled.img`
  width: 120px;
  height: auto;

  @media screen and (min-width: 768px) {
    width: 150px;
  }
`;

const AddressWrapper = styled.div`
  display: flex;
  gap: 10px;
  
  a {
    text-decoration: none;
  }

  svg {
    color: #fff;
    margin-top: 5px;
    width: 20px;
    height: 20px;
  }
`

const PaymentWrapper = styled.div`
  display: flex;
  gap: 5px;
  div {
    width: 50px;
    background: #f3f3f3;
    border-radius: 5px;
    padding: 0 3px;
    display: grid;
    place-items: center;
  }
`

const StyledDiv = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default function FooterComponent() {
    return (
        <Footer>
            <StyledDiv>
                <FooterColumn>
                    <BrandImage src={logo.src} alt='Brand'/>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>THÔNG TIN LIÊN HỆ</ColumnTitle>
                    <AddressWrapper>
                        <span><BsPinMap size={20}/></span>
                        <div>
                            <p>SH13, CC One Verandah</p>
                            <p>SH13, CC One Verandah</p>
                            <p>cổng Tạ Hiện</p>
                            <p>P.Thạnh Mỹ Lợi, Q.2, Tp. Thủ Đức</p>
                        </div>
                    </AddressWrapper>
                    <AddressWrapper><AiOutlinePhone size={20}/>
                        <p>Hotline: (+84) 909 400 310</p>
                    </AddressWrapper>
                    <AddressWrapper>
                        <Zalo/>
                        <p>0909 400 310</p>
                    </AddressWrapper>
                    <AddressWrapper>
                        <Link href="https://www.facebook.com/profile.php?id=100095049372297" target={"_blank"}><FaFacebookSquare size={20}/></Link>
                        <Link href="https://www.facebook.com/profile.php?id=100095049372297" target={"_blank"}>
                            <p>Little Bến Thành - Đi chợ Sài Gòn</p>
                        </Link>
                    </AddressWrapper>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>PHƯƠNG THỨC THANH TOÁN</ColumnTitle>
                    <PaymentWrapper>
                        <div>
                            <Image
                                alt="Visa"
                                src={visa}
                                width={40}
                                height={15}
                            />
                        </div>
                        <div>
                            <Image
                                alt="Mastercard"
                                src={mc}
                                width={35}
                                height={35}
                            />
                        </div>
                        <div>
                            <Image
                                alt="JCB"
                                src={jcb}
                                width={40}
                                height={35}
                            />
                        </div>
                        <div>
                            <Image
                                alt="Tiền mặt"
                                src={cash}
                                width={50}
                                height={32}
                            />
                        </div>
                        <div>
                            <Image
                                alt="Online Banking"
                                src={ibank}
                                width={40}
                                height={30}
                            />
                        </div>
                    </PaymentWrapper>
                    <ColumnTitle>
                        <span><FaShippingFast size={24}/> Giao hàng miễn phí</span>
                    </ColumnTitle>
                </FooterColumn>
            </StyledDiv>
        </Footer>
    );
}
