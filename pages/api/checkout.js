import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(400).json({ message: 'should be a POST request' });
        return;
    }

    const {
        name,
        phone,
        address,
        cartProducts,
    } = req.body;

    await mongooseConnect();
    const uniqueIds = [...new Set(cartProducts)];
    const productsInfos = await Product.find({ _id: { $in: uniqueIds } }).lean();
    let line_items = [];
    let total_price = 0;

    for (const productId of uniqueIds) {
        const productInfo = productsInfos.find(p => p._id.toString() === productId);
        const quantity = cartProducts.filter(id => id === productId)?.length || 0;
        if (quantity > 0 && productInfo) {
            line_items.push({
                product: productInfo._id,
                name: productInfo.title,
                quantity,
                price_data: {
                    unit_amount: productInfo.price,
                },
            });
            total_price += productInfo.discount > 0 ? productInfo.discountedPrice * quantity : productInfo.price * quantity;
        }
    }
    const orderDoc = await Order.create({
        line_items,
        name,
        phone,
        address,
        total_price,
        paid: false,
    });

    const redirectUrl = `${process.env.NEXTAUTH_URL}/cart?success=1`;

    res.json({
        orderId: orderDoc._id.toString(),
        url: redirectUrl
    });
}
