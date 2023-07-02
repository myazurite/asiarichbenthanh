import styled from 'styled-components';
import logo from "@/public/assets/Logo.jpg";

const Footer = styled.footer`
  background-color: #005f41;
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

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    margin-left: 40px;
  }
`;

const ColumnTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

const BrandImage = styled.img`
  width: 120px;
  height: auto;

  @media screen and (min-width: 768px) {
    width: 150px;
  }
`;

const StyledDiv = styled.div`
  max-width:800px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export default function FooterComponent() {
    return (
        <Footer>
            <StyledDiv>
                <FooterColumn>
                    <BrandImage src={logo.src} alt='Brand' />
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>Địa chỉ</ColumnTitle>
                    <p>CC Obe Verandah</p>
                    <p>SH-13, cổng Tạ Hiện</p>
                    <p>P.Thạnh Mỹ Lợi, Q.2, TP. Thủ Đức</p>
                </FooterColumn>
                <FooterColumn>
                    <ColumnTitle>Hotline</ColumnTitle>
                    <p>Giao hàng miễn phí</p>
                    <p>0909 400 310</p>
                </FooterColumn>
            </StyledDiv>
        </Footer>
    );
}
