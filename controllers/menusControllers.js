const menuModel = require("../models/MenuModel");
const StatusCodes = require("../utils/statusCodes");

exports.addMenu = async (req, res, next) => {

    try {
        const {dish_name, description, price} = req.body;

        const menuExist = await menuModel.findOne({dish_name: dish_name});

        if (menuExist) {
            console.log("dish's name already exists");
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                msg: "Dish's name already exists"
            });
        }

        const saveMenu = await menuModel.create({
            dish_name: dish_name,
            description: description,
            price: price
        });
        
        return res.status(StatusCodes.CREATED).json({
            status: true,
            msg: "menu created successfully",
            data: saveMenu
        });
    } catch (error) {
        console.log("SaveMenu Error: ", error);

        return res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            msg: "Invalid Request"
        });
    }
}

exports.getAllMenu = async (req, res, next) => {
    try {
      // Find all menu items
        const menus = await menuModel.find();
        
        console.log("Menus retrieved successfully");
        return res.status(StatusCodes.OK).json({
            status: true,
            msg: "Menus retrieved successfully",
            data: menus
        });
    } catch (error) {
      console.log("GetMenus Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
    });
    }
  }

  exports.getMenuItem = async (req, res, next) => {
    try {
    const { _id } = req.params; 

        const menuExist = await menuModel.findById(_id);
 
      if (!menuExist) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: false,
          msg: "Menu item not found"
        });
      };
      
      console.log("Menu item retrieved successfully");
      return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Menu item retrieved successfully",
        data: menuExist
      });

    } catch (error) {
      console.log("GetMenuItem Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
      });
    }
  }

  exports.updateMenuItem = async (req, res, next) => {
    try {

        const { _id } = req.params; 

        const menuExist = await menuModel.findById(_id);

        const { dish_name, description, price } = req.body;  
 
        if (!menuExist) {
            return res.status(StatusCodes.NOT_FOUND).json({
            status: false,
            msg: "Menu item not found"
            });
        }
  
      // Update properties only if the value is updated
      menuExist.dish_name = dish_name || menuExist.dish_name;
      menuExist.description = description || menuExist.description;
      menuExist.price = price || menuExist.price;
  
      const updatedMenu = await menuExist.save();
      
      console.log("Menu item updated successfully");
      return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Menu item updated successfully",
        data: updatedMenu
      });
    } catch (error) {
      console.log("UpdateMenuItem Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
      });
    }
  }
  
  exports.deleteMenuItem = async (req, res, next) => {
    try {
        const { _id } = req.params; 

        const menuExist = await menuModel.findByIdAndDelete(_id);
  
    //   const menuExist = await menuModel.findOneAndDelete({dish_name: dish_name});
  
      if (!menuExist) {
        return res.status(StatusCodes.NOT_FOUND).json({
          status: false,
          msg: "Menu item not found"
        });
      }
  
      console.log("Menu item deleted successfully");
      return res.status(StatusCodes.OK).json({
        status: true,
        msg: "Menu item deleted successfully"
      });
    } catch (error) {
      console.log("DeleteMenuItem Error: ", error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        msg: "Invalid Request"
      });
    }
  }
  