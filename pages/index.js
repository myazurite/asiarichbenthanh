import React from 'react'
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {Category} from "@/models/Category";
import {Setting} from "@/models/Setting";

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
    const featuredProductSetting = await Setting.findOne({name:'featuredProductId'});
    const featuredProductId = featuredProductSetting.value;
    const product = await Product.findById(featuredProductId);
    const categories = await Category.find({});

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
            categories: JSON.parse(JSON.stringify(categories)),
        }
    }
}
