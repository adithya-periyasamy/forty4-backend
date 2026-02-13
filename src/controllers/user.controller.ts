import type { Request, Response } from "express";
import type { UserType } from "../lib/types.js";
import { User } from "../models/user.model.js";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, company, address } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Fill all the required fields" });
    }

    const exist = await User.exists({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user: UserType = await User.create({
      name,
      email,
      phone,
      company,
      address,
    });

    return res.status(201).json({
      message: "user created successfully",
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().lean();

    return res.status(200).json({
      message: "users data fetched successfully",
      count: users.length,
      users,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "user data fetched successfully", user });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    return res.status(500).json({
      message: "Unexpected error",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "user data updated successfully", user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res
      .status(200)
      .json({ message: "user data deleted successfully", user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export { createUser, deleteUser, getUserById, getUsers, updateUser };
