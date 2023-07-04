import React from 'react'
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Category} from "@/models/Category"; // import Category model

export default function HomePage({newProducts, product, categories}) {
    return (
        <div>
            <Featured product={product}/>
            <NewProducts products={newProducts} categories={categories} />
        </div>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 20});
    const featuredProductId = '64a1276b476fa38588efc03e';
    const product = await Product.findById(featuredProductId);
    const categories = await Category.find({}); // fetch categories

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
            categories: JSON.parse(JSON.stringify(categories)), // pass categories to component
        }
    }
}
