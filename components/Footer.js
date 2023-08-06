import styled from 'styled-components';
import logo from "@/public/assets/Logo-alt.jpg";
import {FiMapPin} from "react-icons/fi";
import {AiOutlinePhone} from "react-icons/ai";
import {FaShippingFast} from "react-icons/fa";
import Image from "next/image";
import qrbank from "@/public/assets/qrbank.jpg"

const Footer = styled.footer`
  background-color: #005100;
  padding: 20px 0;
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
    align-items: center;
  }

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    margin-left: 40px;
  }
`;

const ColumnTitle = styled.h2`
  font-weight: bold;
  color: #fff;

  span {
    display: flex;
    gap: 5px;
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
                    <ColumnTitle><FiMapPin size={18}/> Địa chỉ</ColumnTitle>
                    <p>SH13, CC One Verandah</p>
                    <p>cổng Tạ Hiện</p>
                    <p>P.Thạnh Mỹ Lợi, Q.2, Tp. Thủ Đức</p>
                    <ColumnTitle><AiOutlinePhone size={20}/> Hotline</ColumnTitle>
                    <p>(+84) 909 400 310</p>
                    <p>Zalo: 0909 400 310</p>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>
                        <span><FaShippingFast size={24}/> Giao hàng miễn phí</span>
                    </ColumnTitle>
                    <Image
                        alt='Giao hàng miễn phí'
                       width={165}
                       height={200}
                       src={qrbank}
                    />
                </FooterColumn>
            </StyledDiv>
        </Footer>
    );
}
