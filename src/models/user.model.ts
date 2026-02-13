import mongoose, { Schema } from "mongoose";

interface UserInterface {
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  address?: {
    city?: string | null;
    zipcode?: string | null;
    geo?: { lat?: string | null; lng?: string | null };
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Phone must be exactly 10 digits"],
    },

    company: {
      type: String,
      trim: true,
      minLength: [2, "Company name must be at least 2 characters"],
      maxLength: [100, "Company name cannot exceed 100 characters"],
      default: null,
    },

    address: {
      city: { type: String, trim: true, default: null },
      zipcode: { type: String, trim: true, default: null },
      geo: {
        lat: { type: String, trim: true, default: null },
        lng: { type: String, trim: true, default: null },
      },
    },
  },

  { timestamps: true },
);

export const User = mongoose.model<UserInterface>("User", userSchema);
