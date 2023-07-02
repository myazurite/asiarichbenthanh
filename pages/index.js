import React from 'react'
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";

export default function HomePage({newProducts, product}) {
    return (
        <div>
            <Header/>
            <Featured product={product}/>
            <NewProducts products={newProducts} />
        </div>
    )
}

export async function getServerSideProps() {
    await mongooseConnect();
    const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 20});
    const featuredProductId = '64a1276b476fa38588efc03e';
    const product = await Product.findById(featuredProductId);

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
        }
    }
}