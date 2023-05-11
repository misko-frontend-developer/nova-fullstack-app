import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide first name!"],
    unique: false,
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name!"],
    unique: false,
  },
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
    validate: {
      validator: async function (v: string): Promise<boolean> {
        const valid = emailRegex.test(v);
        if (!valid) {
          throw new Error("Email is not valid!");
        }
        const user = await this.constructor.findOne({ email: v });
        if (user) {
          throw new Error("Email already exists");
        }
        return true;
      },
      message: (props) => `${props.value}`,
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
});

const UserModel = mongoose.model<IUser>("Users", UserSchema);

export default UserModel;
