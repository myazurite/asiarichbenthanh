import React from 'react'
import Title from "@/components/Title";
import Center from "@/components/Center";
import {Category} from "@/models/Category";
import {Product} from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";
import Link from "next/link";
import {RevealWrapper} from "next-reveal";

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4 columns on PC
  gap: 20px;
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr; // 1 column on mobile
  }
`;

const CategoryTitle = styled.div`
  display: flex;
  margin: 10px 0;
  align-items: center;
  gap: 10px;

  h2 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  a {
    font-size: 1rem;
    color: #696969;
    display: inline-block;
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
    margin: 20px 0;
    h2 {
      font-size: 2rem;
    }
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;

`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 120px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: none;
  @media screen and (min-width: 768px) {
    height: 180px;
  }
`;

export default function CategoriesPage({mainCategories, categoriesProducts}) {
    return (
        <>
            <Center>
                <Title>
                    <span>Danh mục sản phẩm</span>
                    {mainCategories.map(cat => (
                        <CategoryWrapper className="" key={cat.id}>
                            <CategoryTitle>
                                <Link href={'/category/' + cat._id}>
                                    <h2>{cat.name} &rarr;</h2>
                                </Link>
                            </CategoryTitle>
                            <CategoryGrid>
                                {categoriesProducts[cat._id].map((p, i) => (
                                    <div key={p._id}>
                                        <RevealWrapper delay={i*20}>
                                            <ProductBox {...p}/>
                                        </RevealWrapper>
                                    </div>
                                ))}
                                <RevealWrapper delay={categoriesProducts[cat._id].length*50}>
                                    <ShowAllSquare href={'/category/' + cat._id}>
                                        Xem thêm &rarr;
                                    </ShowAllSquare>
                                </RevealWrapper>
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

