import mongoose, {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
    name: {type:String,required:true},
    description: String,
    parent: {type:mongoose.Types.ObjectId, ref:'Category'},
    properties: [{type:Object}],
    order: { type: Number },
});

export const Category = models?.Category || model('Category', CategorySchema);