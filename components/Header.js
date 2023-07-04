import Link from "next/link";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import logo from "@/public/assets/Logo.jpg";
import SearchIcon from "@/components/SearchIcon";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  background-color: #005f41;
  z-index: 1;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: sticky;
  z-index: 1;
  img {
    max-height: 50px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  padding: 70px 20px 20px;
  background-color: #005f41;
  transform: translateX(${(props) => (props.mobileNavActive ? "0" : "100%")});
  transition: transform 0.3s ease-in-out;
  z-index: 2;

  @media screen and (min-width: 768px) {
    position: static;
    transform: none;
    width: 40%;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
  text-decoration: none;
  padding: 10px 0;
  
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  margin: auto 0;
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (min-width: 768px) {
    max-width: 70%;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: ${(props) => (props.mobileNavActive ? "block" : "none")};

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const SideIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  a {
    display: inline-block;
    width: 20px;
    height: 20px;
    color: #fff;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`

export default function Header() {
    const { cartProducts } = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);

    useEffect(() => {
        if (mobileNavActive) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [mobileNavActive]);

    const handleOverlayClick = () => {
        setMobileNavActive(false);
    };

    return (
        <StyledHeader>
            <StyledDiv>
                <Wrapper>
                    <Logo href="/">
                        <img src={logo.src} alt="" />
                    </Logo>
                    <StyledNav mobileNavActive={mobileNavActive}>
                        <NavLink href="/">Trang chủ</NavLink>
                        <NavLink href="/products">Sản phẩm</NavLink>
                        <NavLink href="/categories">Danh mục</NavLink>
                        {/*<NavLink href="/account">Tài khoản</NavLink>*/}
                        <NavLink href="/cart">Giỏ hàng ({cartProducts.length})</NavLink>
                    </StyledNav>
                    <SideIcons>
                        <Link href='/search'><SearchIcon/></Link>
                        <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
                            <BarsIcon />
                        </NavButton>
                    </SideIcons>
                </Wrapper>
            </StyledDiv>
            <Overlay
                mobileNavActive={mobileNavActive}
                onClick={handleOverlayClick}
            />
        </StyledHeader>
    );
}
