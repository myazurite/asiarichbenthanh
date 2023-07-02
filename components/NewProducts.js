import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 1.5rem;
  margin:30px 0 20px;
  font-weight: normal;
`;
export default function NewProducts({products}) {
    return (
        <Center>
            <Title>Sản phẩm mới</Title>
            <ProductsGrid products={products} />
        </Center>
    );
}