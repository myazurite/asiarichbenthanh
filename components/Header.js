import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import {useContext, useState} from "react";
import {CartContext} from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
// import Center from "@/components/Center";
// import {useContext, useState} from "react";
// import {CartContext} from "@/components/CartContext";
// import BarsIcon from "@/components/icons/Bars";
import logo from "@/public/assets/Logo.jpg";

const StyledHeader = styled.header`
  background-color: #005f41;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  position: relative;
  z-index: 3;
  img{
    max-height: 50px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  //padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #005f41;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color:#ddd;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href='/'>
                        <img src={logo.src} alt=""/>
                    </Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href='/'>Trang chủ</NavLink>
                        <NavLink href='/products'>Sản phẩm</NavLink>
                        <NavLink href='/categories'>Danh mục</NavLink>
                        <NavLink href='/account'>Tài khoản</NavLink>
                        <NavLink href='/cart'>Giỏ hàng ({cartProducts.length})</NavLink>
                    </StyledNav>
                    <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                        <BarsIcon/>
                    </NavButton>
                </Wrapper>
            </Center>
        </StyledHeader>
    )
}
