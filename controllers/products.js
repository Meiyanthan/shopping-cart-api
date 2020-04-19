const Product = require("../models/product");
const mongoose = require("mongoose");

exports.get_all_products = (req, res, next)=>{
    Product.find()
    .select("name price _id productDesc productSeller")
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productDesc: doc.productDesc,
                    sellerEmail: doc.productSeller.email
                };
            })
        };
        
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
};    


exports.get_a_product = (req, res, next)=>{
    const _id = req.params.productId;

    Product.findById(_id)
    .select("name price _id productDesc productSeller.email")
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                product:doc
            }); 
        }else{
            res.status(404).json({message: "Data not found"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
};

exports.post_new_product = (req, res, next)=>{

    const productSeller = {
        id: req.userData.userId,
        email: req.userData.email
    };

    const product = new Product({
       _id:  new mongoose.Types.ObjectId(),
       name: req.query.name,
       price: req.query.price,
       productDesc: req.query.productDesc,
       productSeller: productSeller
    }); 

    Product.find({name: req.query.name})
    .exec()
    .then(productData=>{

        if(productData.length >=1){
                Product.updateOne({_id:productData[0]._id}, {$set:req.query})
                .exec().
                then(result=>{
                    console.log(result)
                    res.status(201).json({
                        message:"Success - Product Changes"
                    });
                }).catch(err=>{
                   res.status(500).json({error:err}); 
                });
        }else if(productData.length == 0){
                product.save().then(result=>{
                    res.status(201).json({
                        message: 'Success - Product saved',
                        currentProduct: {
                            name:result.name,
                            price:result.price,
                            _id: result._id
                        }
                    }); 
                }).catch(err=>{
                   console.log(err);
                   res.status(500).json({
                       error: err
                   });
                });
        }
    })
};

