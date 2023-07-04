import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import Center from "@/components/Center";
import {Category} from "@/models/Category";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import axios from "axios";
import Spinner from "@/components/Spinner";
import Link from "next/link";

const CategoryList = styled.div`
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

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    font-size: 1.5em;
  }

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const FiltersWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  background-color: #ddd;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;

  select {
    background-color: transparent;
    border: 0;
    font-size: inherit;
    color: #444;
  }
`;

export default function CategoryPage({
                                         category,
                                         subCategories,
                                         products: originalProducts,
                                         categories,
                                     }) {
    const defaultSorting = "_id-desc";
    const defaultFilterValues = category.properties.map((p) => ({
        name: p.name,
        value: "all",
    }));
    const [products, setProducts] = useState(originalProducts);
    const [filtersValues, setFiltersValues] = useState(defaultFilterValues);
    const [sort, setSort] = useState(defaultSorting);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [filtersChanged, setFiltersChanged] = useState(false);
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            setLoadingProducts(true);
            const catIds = [category._id, ...(subCategories?.map((c) => c._id) || [])];
            const params = new URLSearchParams();
            params.set("categories", catIds.join(","));
            params.set("sort", sort);
            filtersValues.forEach((f) => {
                if (f.value !== "all") {
                    params.set(f.name, f.value);
                }
            });
            const url = `/api/products?` + params.toString();
            const response = await axios.get(url);
            setProducts(response.data);
            setLoadingProducts(false);
        };

        fetchData();
    }, [id, category, subCategories, sort, filtersValues]);

    function handleFilterChange(filterName, filterValue) {
        setFiltersValues((prev) => {
            return prev.map((p) => ({
                name: p.name,
                value: p.name === filterName ? filterValue : p.value,
            }));
        });
        setFiltersChanged(true);
    }

    return (
        <>
            <Header/>
            <Center>
                <CategoryHeader>
                    <h1>{category.name}</h1>
                    <FiltersWrapper>
                        {category.properties.map((prop) => (
                            <Filter key={prop.name}>
                                <span>{prop.name}:</span>
                                <select
                                    onChange={(ev) =>
                                        handleFilterChange(prop.name, ev.target.value)
                                    }
                                    value={filtersValues.find((f) => f.name === prop.name).value}
                                >
                                    <option value="all">Tất cả</option>
                                    {prop.values.map((val) => (
                                        <option key={val} value={val}>
                                            {val}
                                        </option>
                                    ))}
                                </select>
                            </Filter>
                        ))}
                        <Filter>
                            <select
                                value={sort}
                                onChange={(ev) => {
                                    setSort(ev.target.value);
                                    setFiltersChanged(true);
                                }}
                            >
                                <option value="price-asc">Giá, tăng dần</option>
                                <option value="price-desc">Giá, giảm dần</option>
                                <option value="_id-desc">Mới đến cũ</option>
                                <option value="_id-asc">Cũ đến mới</option>
                            </select>
                        </Filter>
                    </FiltersWrapper>
                </CategoryHeader>
                <div style={{display: "flex", width: "100%"}}>
                    <CategoryList>
                        {categories.map((category) => (
                            <CategoryItem
                                key={category._id}
                                href={`/category/${category._id}`}
                            >
                                {category.name}
                            </CategoryItem>
                        ))}
                    </CategoryList>
                    {loadingProducts && <Spinner fullWidth/>}
                    {!loadingProducts && (
                        <div>
                            {products.length > 0 && <ProductsGrid products={products}/>}
                            {products.length === 0 && <div>Sorry, no products found</div>}
                        </div>
                    )}
                </div>
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    const categoryId = context.query.id;
    const category = await Category.findById(categoryId);
    const subCategories = await Category.find({parent: category._id});
    const categoryIds = [category._id, ...subCategories.map((c) => c._id)];
    const products = await Product.find({$or: [{category: {$in: categoryIds}}]});
    const categories = await Category.find();

    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            subCategories: JSON.parse(JSON.stringify(subCategories)),
            products: JSON.parse(JSON.stringify(products)),
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}
