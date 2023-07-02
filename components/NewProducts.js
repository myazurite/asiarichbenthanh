import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Link from 'next/link';

const Title = styled.h2`
  font-size: 1.5rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

const CategoriesList = styled.div`
  display: none;
  height: fit-content;
  flex-direction: column;
  margin-right: 15px;
  position: sticky;
  top: 0;
  a {
    color: #222;
    text-decoration: none;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    width: 1250px;
  }
`;
const CategoryItem = styled(Link)`
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
`;

export default function NewProducts({products, categories}) {
    return (
        <Center>
            <Title>Sản phẩm mới</Title>
            <div style={{ display: 'flex' }}>
                <CategoriesList>
                    {categories.map(category => (
                        <CategoryItem key={category._id} href={`/category/${category._id}`}>{category.name}</CategoryItem>
                    ))}
                </CategoriesList>
                <ProductsGrid products={products} />
            </div>
        </Center>
    );
}
