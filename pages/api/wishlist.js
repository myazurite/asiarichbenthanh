import {mongooseConnect} from "@/lib/mongoose";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {WishedProduct} from "@/models/WishedProduct";

export default async function handle(req, res) {
    await mongooseConnect();
    const session = await getServerSession(req, res, authOptions);
    const user = session ? session.user : null;

    if (!user) {
        res.status(403).json({error: "Not authenticated"});
        return;
    }

    if (req.method === 'POST') {
        const {product} = req.body;
        const wishedDoc = await WishedProduct.findOne({userEmail:user.email,product});
        if (wishedDoc) {
            await WishedProduct.findByIdAndDelete(wishedDoc._id);
            res.json({wishedDoc});
        } else {
            await WishedProduct.create({userEmail:user.email,product});
            res.json('created');
        }
    }

    if (req.method === 'GET') {
        res.json(
            await WishedProduct.find({userEmail:user.email}).populate('product')
        );
    }
}
