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
}