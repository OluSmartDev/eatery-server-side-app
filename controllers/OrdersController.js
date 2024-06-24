const MenuModel = require("../models/MenuModel");
const orderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const StatusCodes = require("../utils/statusCodes");

exports.createOrder = async (req, res, next) => {

    try {
        const {email, dish_name, quantity,} = req.body;

        const userExist = await UserModel.findOne({email: email});
        const menuExist = await MenuModel.findOne({dish_name: dish_name}); 
        const orderExist = await orderModel.findOne({email: email, dish_name: dish_name, order_completed: false}); 
        
        if (!userExist) {
            console.log("No User account exists for this email. Please enter a correct email or signup to register an account");
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "No User account exists for this email. Please enter a correct email or signup to register an account"
            });
        }

        if (!menuExist) {
            console.log("Dish name does not exist. Check your spelling");
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "Dish name does not exist. Check your spelling"
            });
        }

        if (orderExist) {
            console.log(`You have an uncompleted Order for '${dish_name}'. Update the quantity in your existing Order instead of duplicating the order.`);
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: `You have an uncompleted Order for '${dish_name}'. Update the quantity in your existing Order instead of duplicating the order.`
            });
        }

        const saveOrder = await orderModel.create({
            email: email,
            dish_id: menuExist._id,
            dish_name:  dish_name,
            quantity: quantity            
        });
        
        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "Order created successfully",
            data: saveOrder
        });
    } catch (error) {
        console.log("SaveOrder Error: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
    next();
}

exports.processOrder = async (req, res, next) => {
    try {

        const { _id } = req.params; 

        const orderExist = await orderModel.findOne({_id: _id, order_completed: false}); 

        // TO DO: Add logic to calculate total amount of order

        // const orderedItem = await MenuModel.findOne({dish_name: orderExist.dish_name});

        // const { dish_name, description, price } = orderedItem;  
 
        if (!orderExist) {
            return res.status(StatusCodes.NOT_FOUND).json({
            status: false,
            msg: "Order ID does not exist"
            });
        }
  
      // Update order status
      orderExist.order_completed = true;
  
      const processedOrder = await orderExist.save();
      
      console.log("Ordered item processed successfully");
      return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Ordered item processed successfully",
        data: processedOrder
      });
    } catch (error) {
      console.log("ProceeOrder Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
      });
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
      // Find all order items
        const orders = await orderModel.find();
        
        console.log("All Orders retrieved successfully");
        return res.status(StatusCodes.OK).json({
            status: true,
            msg: "All Orders retrieved successfully",
            data: orders
        });
    } catch (error) {
      console.log("GetAllOrders Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
    });
    }
}

exports.getOrderItem = async (req, res, next) => {
    try {
    const { _id } = req.params; 

        const orderExist = await orderModel.findById(_id);
 
      if (!orderExist) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: false,
          msg: "Order item not found"
        });
      };
      
      console.log("Order item retrieved successfully");
      return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Order item retrieved successfully",
        data: orderExist
      });

    } catch (error) {
      console.log("GetOrderItem Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
      });
    }
}

exports.deleteOrderItem = async (req, res, next) => {
    try {
        const { _id } = req.params; 

        const orderExist = await orderModel.findByIdAndDelete(_id);
   
      if (!orderExist) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: false,
          msg: "Order item not found"
        });
      }
  
      console.log("Order item deleted successfully");
      return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Order item deleted successfully"
      });
    } catch (error) {
      console.log("DeleteOrderItem Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
      });
    }
}