import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import Link from 'next/link';

const Title = styled.h2`
  font-size: 1.5rem;
  margin:30px 0 20px;
  font-weight: bold;
`;

const CategoriesList = styled.div`
  height: fit-content;
  flex-direction: column;
  margin-right: 15px;
  position: sticky;
  top: 55px;
  display: flex;
  font-size: 1rem;
  a {
    color: #222;
    text-decoration: none;
    width: 200px;
  }
  a:hover{
    color: #005f41;
    transition: ease-in-out 0.1s;
  }
  @media screen and (max-width: 768px) {
    a {
      width: 120px;
      font-size: .9rem;
    }
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
            <Title>SẢN PHẨM MỚI</Title>
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
