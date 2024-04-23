import z from 'zod';

export const bodyTesterSchema = z.object({
    password: z.string(),
    title: z.string().nullish(),
    subtitle: z.string().nullish(),
    exibitionNameFrom: z.string(),
    from: z.string().email(),
    to: z.string().email(),
    subject: z.string().min(4),
    message: z.string().min(4),
});