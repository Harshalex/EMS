import User from "../models/User.js";
import { error, success } from "../utils/responseWrapper.js";
import bcrypt from "bcrypt"

const  createEmployee = async (req,res) => {
    try {
        const { name, email, password, department, status } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const employee = new User({
    name,
    email,
    password: hashedPassword,
    department,
    status,
    createdBy: req.user._id
  });

  await employee.save();
//   res.status(201).json({ message: 'Employee created successfully' });
return res.send(success(200,{employee,message:"Employee created Successfully"}))
    } catch (err) {
        console.log(err);
        return res.send(error(500,"Something went wrong"));
    }
}

const  getAllEmployee = async (req,res) => {
    try {
        const employees = await User.find().select('-password');
        return res.send(success(200,employees));
    } catch (err) {
        console.log(err);
        return res.send(error(500,"Error in getting Employees"))
    }
}

const updateEmployee = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, password, department, status } = req.body;
  
      const updateData = {};
  
      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (department) updateData.department = department;
      if (status) updateData.status = status;
      if (password) updateData.password = await bcrypt.hash(password, 10);
  
      const updatedEmployee = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      if (!updatedEmployee) {
        return res.send(error(404, "Employee not found"));
      }
  
      return res.send(success(200, { updatedEmployee, message: "Employee updated successfully" }));
    } catch (err) {
      console.error(err);
      return res.send(error(500, "Something went wrong"));
    }
  };
  
  
const  deleteEmployee = async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        // res.json({ message: 'Employee deleted' });
        return res.send(success(200,"Employee deleted successfully"))
    } catch (err) {
        console.log(err);
       return res.send(error(500,"Something went wrong"));
    }
}

const getEmployeeById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const employee = await User.findById(id).select("-password");
  
      if (!employee) {
        return res.send(error(404, "Employee not found"));
      }
  
      return res.send(success(200, { employee }));
    } catch (err) {
      console.error(err);
      return res.send(error(500, "Something went wrong"));
    }
  };
  
export {getAllEmployee,createEmployee,deleteEmployee,updateEmployee,getEmployeeById}