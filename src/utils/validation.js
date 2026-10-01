import { z } from "zod";

import { z } from 'zod';

// რეგისტრაციის სქემა
export const registerSchema = z.object({
  fullName: z.string().min(2, { message: "სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან" }),
  email: z.string().email({ message: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა" }),
  phone: z.string().min(9, { message: "ტელეფონის ნომერი არასწორია" }).optional().or(z.literal('')),
  password: z.string().min(8, { message: "პაროლი უნდა იყოს მინიმუმ 8 სიმბოლოიანი" }),
  role: z.enum(['patient', 'doctor', 'admin'], { message: "აირჩიეთ სწორი როლი" }),
});

// ავტორიზაციის (Login) სქემა
export const loginSchema = z.object({
  email: z.string().email({ message: "გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა" }),
  password: z.string().min(1, { message: "პაროლი სავალდებულოა" }),
});