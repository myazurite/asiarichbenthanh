import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import {RevealWrapper} from "next-reveal";

export const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({products}) {
    return (
        <StyledProductsGrid>
            {products?.length > 0 && products.map((product, i) => (
                <RevealWrapper key={product._id} delay={i*50}>
                    <ProductBox  {...product} />
                </RevealWrapper>
            ))}
        </StyledProductsGrid>
    );
}
