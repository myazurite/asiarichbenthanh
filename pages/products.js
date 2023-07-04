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
  height: fit-content;
  flex-direction: column;
  margin-right: 15px;
  padding: 10px 0;
  position: sticky;
  top: 55px;
  a {
    color: #222;
    text-decoration: none;
    font-size: 1rem;
    display: flex;
    width: 200px
  }
  a:hover{
    color: #005f41;
    transition: ease-in-out 0.1s;
  }
  @media screen and (max-width: 768px) {
    a {
      width: 100px;
      font-size: .85rem;
      padding: 0;
    }
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
            categories: JSON.parse(JSON.stringify(categories)),
        }
    };
}
