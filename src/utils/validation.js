import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().trim().min(2, 'სახელი უნდა შედგებოდეს მინიმუმ 2 სიმბოლოსგან'),
  email: z.email('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა'),
  password: z.string().min(6, 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო'),
});

export const loginSchema = z.object({
  email: z.email('გთხოვთ შეიყვანოთ სწორი ელ-ფოსტა'),
  password: z.string().min(1, 'პაროლი სავალდებულოა'),
});

// Supabase-ის ინგლისური შეცდომები -> ქართული
export function translateAuthError(message = '') {
  const m = message.toLowerCase();
  if (m.includes('invalid login credentials')) return 'ელ-ფოსტა ან პაროლი არასწორია.';
  if (m.includes('email not confirmed')) return 'ელ-ფოსტა დაუდასტურებელია. შეამოწმეთ თქვენი ფოსტა.';
  if (m.includes('rate limit')) return 'ძალიან ბევრი მცდელობა. სცადეთ მოგვიანებით.';
  if (m.includes('already registered') || m.includes('already been registered'))
    return 'ამ ელ-ფოსტით ანგარიში უკვე არსებობს.';
  if (m.includes('failed to fetch') || m.includes('network'))
    return 'კავშირი ვერ დამყარდა. შეამოწმეთ ინტერნეტი.';
  return 'მოხდა შეცდომა. სცადეთ თავიდან.';
}