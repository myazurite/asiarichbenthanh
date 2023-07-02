import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Category} from "@/models/Category";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Link from "next/link";

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

const CategoryItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
`;

export default function ProductsPage({products, categories}) {
    return (
        <>
            <Header />
            <Center>
                <Title>Sản phẩm</Title>
                <div style={{ display: 'flex', width: '100%' }}>
                    <CategoriesList>
                        {categories.map(category => (
                            <Link key={category._id} href={`/category/${category._id}`} passHref>
                                <CategoryItem>{category.name}</CategoryItem>
                            </Link>
                        ))}
                    </CategoriesList>
                    <ProductsGrid products={products} />
                </div>
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();
    const products = await Product.find({}, null, {sort:{'_id':-1}});
    const categories = await Category.find({}); // Fetch categories

    return {
        props:{
            products: JSON.parse(JSON.stringify(products)),
            categories: JSON.parse(JSON.stringify(categories)), // Pass categories to component
        }
    };
}
