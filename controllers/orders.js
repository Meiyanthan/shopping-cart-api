const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");



exports.get_your_orders = (req, res, next)=>{
    Order.find({buyer: req.userData.userId})
    .select("productId quantity _id buyer created")
    .populate("productId", "_id name")
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            orders: docs.map(doc=>{
                return{
                    _id: doc._id,
                    productId: doc.productId,
                    quantity: doc.quantity,
                    buyer: doc.buyer
                }; 
            })
        };
    
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
};

exports.get_a_order = (req, res, next)=>{
    const id = req.params.orderId;

    Order.find({_id: id, buyer:req.userData.userId})
    .select("productId quantity _id created")
    .populate("productId")
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                order: doc
            }); 
        }else{
            res.status(404).json({message: "Order not found"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.post_new_order = (req, res, next)=>{
    
    Product.findById(req.query.productId)
    .exec()
    .then(product=>{
        if(!product){
            return res.status(404).json({
                message: "Product not found"
                
            });
        }    
            
        const order = new Order({
            _id:  new mongoose.Types.ObjectId(),
            productId: req.query.productId,
            quantity: req.query.quantity,
            buyer: req.userData.userId
        });
        return order.save();
    }).then(result=>{
        res.status(201).json({
            message:"Order created",
            currentOrder:{
                _id: result._id,
                productId: result.productId,
                quantity: result.quantity
            }
        });
    }).catch(err=>{
        res.status(500).json({error: err});
    });
};

exports.delete_order = (req, res, next)=>{
    const id = req.params.orderId;
    Product.remove({_id: id, buyer:req.userData.userId})
    .exec()
    .then(result=>{
    
        res.status(200).json({
            message:"Order deleted"
        });
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
     
};

exports.update_order = (req, res, next) =>{
    const id = req.params.orderId;
    const updateddetails = {
        quantity: req.query.quantity > 0 ? req.query.quantity : 1,
        created : Date.now()
    }
    Order.updateOne({_id:id}, {$set:updateddetails})
    .exec().
    then(result=>{
        res.status(200).json({
            message:"Success - Order updated"
        });
    }).catch(err=>{
       res.status(500).json({error:err}); 
    });
}

exports.get_ordered_product_based_on_customer = (req, res, next)=>{

   Order.aggregate([
    {
      $group :
        {
          _id : "$buyer",
          productIds: { $push: "$productId"}
        }
    },
    {
        $lookup:
        {
           from: "products",
           localField: "productIds",
           foreignField: "_id",
           as: "product_list"
        }
    }
    ])
    .exec()
    .then(docs=>{
        const response = {
            result_count: docs.length,
            Buyers: docs.map(doc=>{
                return{
                    buyer_id: doc._id,
                    Products: doc.product_list.map(prod =>{
                        return{
                            name : prod.name ,
                            price: prod.price,
                            productDesc: prod.productDesc
                        }
                    })
                }; 
            })
        };
    
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });

};

exports.get_ordered_product_based_date = (req, res, next)=>{

    Order.aggregate([
    {
      $group :
        {
          _id : {$dateToString: { format: "%Y-%m-%d", date: "$created" } },
          count: { $sum: 1 }
        }
    }
    ])
    .exec()
    .then(docs=>{
        const response = {
            result_count: docs.length,
            orders_based_on_date: docs.map(doc=>{
                return{
                    ordered_on: doc._id,
                    product_count: doc.count
                }; 
            })
        };
    
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
};

exports.get_customer_based_orders = (req, res, next)=>{

    Order.aggregate([
    {
      $group :
        {
          _id : "$buyer", 
          count: { $sum: 1 }
        }
    }
    ])
    .exec()
    .then(docs=>{
        const response = {
            buyer_count: docs.length,
            buyer_based_orders: docs.map(doc=>{
                return{
                    buyer_id: doc._id,
                    purchased_count: doc.count
                }; 
            })
        };
    
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
};

exports.get_all_details = (req, res, next)=>{

    User.aggregate([
    {
      $group :
        {
          _id : "$email",
          ids: { $push: "$_id"}
        }
    },
    {
      $lookup :
        {
           from: "orders",
           localField: "ids",
           foreignField: "buyer",
           as: "order_list"
        }
    }
    ])
    .exec()
    .then(docs=>{
        const response = {
            result_count: docs.length,
            Buyers: docs.map(doc=>{
                return{
                    buyer_id: doc._id,
                    order_info: doc.order_list.map((ord,key) =>{
                        return{
                            _id : ord._id,
                            productId: ord.productId,
                            quantity : ord.quantity,
                            created : ord.created
                        }
                    })
                }; 
            })
        };
        res.status(200).json({response});
    })
    .catch(err=>{
          res.status(500).json({error:err});
    });
   
    

};