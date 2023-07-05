import { useState, useEffect } from "react";
import styled from "styled-components";

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 60px;
  right: 20px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  background-color: #fff;
  border: 1px solid rgba(0,0,0,0.4);
  border-radius: 50%;
  padding: 4px 6px ;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 4px 3px 4px rgba(0,0,0,0.6);
  z-index: 999;
  svg {
    width: 25px;
    height: 25px;
  }

  &:hover {
    background-color: #f1f1f1;
  }
`;

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 100);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <ScrollToTopButton onClick={scrollToTop} isVisible={isVisible}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"/>
            </svg>
        </ScrollToTopButton>
    );
};

export default ScrollToTop;
