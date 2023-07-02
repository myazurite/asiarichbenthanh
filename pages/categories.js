import React from 'react'
import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import {Category} from "@/models/Category";
import {Product} from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
import Link from "next/link";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  a {
    font-size: 1rem;
    color: #555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 100px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  @media screen and (min-width: 768px) {
    height: 150px;
  }
`;

export default function CategoriesPage({mainCategories, categoriesProducts}) {
    return (
        <>
            <Header/>
            <Center>
                <Title>
                    {mainCategories.map(cat => (
                        <CategoryWrapper className="" key={cat.id}>
                            <CategoryTitle>
                                <h2>{cat.name}</h2>
                                <div>
                                    <Link href={'/category/' + cat._id}>
                                        Xem thêm
                                    </Link>
                                </div>
                            </CategoryTitle>
                            <CategoryGrid>
                                {categoriesProducts[cat._id].map(p => (
                                    <div key={p._id}>
                                        <ProductBox {...p}/>
                                    </div>
                                ))}
                                <ShowAllSquare href={'/category/' + cat._id}>
                                    Xem thêm &rarr;
                                </ShowAllSquare>
                            </CategoryGrid>
                        </CategoryWrapper>
                    ))}
                </Title>
            </Center>
        </>

    )
}

export async function getServerSideProps() {
    const categories = await Category.find();
    const mainCategories = categories.filter(c => !c.parent);
    const categoriesProducts = {};

    for (const mainCat of mainCategories) {
        const mainCatId = mainCat._id.toString();
        const childCatId = categories
            .filter(c => c?.parent?.toString() === mainCatId)
            .map(c => c._id.toString());
        const categoriesIds = [mainCatId, ...childCatId];
        const products = await Product.find(
            {category: categoriesIds},
            null, {limit: 4, sort: {'_id': -1}}
        );
        categoriesProducts[mainCat._id] = products;
    }

    return {
        props: {
            mainCategories: JSON.parse(
                JSON.stringify(mainCategories)
            ),
            categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts))
        },
    }
}

