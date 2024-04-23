import z from 'zod';

export const bodyAdminSchema = z.object({
    password: z.string(),
    title: z.string().nullish(),
    subtitle: z.string().nullish(),
    exibitionNameFrom: z.string().nullish(),
    from: z.string().email().nullish(),
    to: z.string().email(),
    subject: z.string().min(4),
    message: z.string().min(4),
});