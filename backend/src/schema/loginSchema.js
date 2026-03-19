const {z}=require('zod');
const loginSchema=z.object(
    {
        email: z.string()
    .email({ message: "Please provide a valid email address" })
    .transform(val => val.toLowerCase().trim()),

    password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password must be at most 30 characters" })
    .regex(/[A-Z]/, { message: "Must include at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must include at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must include at least one number" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Must include at least one special character"
    })
    .refine(val => !/\s/.test(val), {
      message: "Password must not contain spaces"
    })
    }
);
module.exports={loginSchema};