const { z } = require('zod');

const expenseSchema = z.object({
    user_id: z.string().uuid(),

    amount: z.number()
        .positive('Amount must be greater than 0'),

    category_id: z.number().int().optional(),

    title: z.string()
        .min(1, 'minimum one character required')
        .max(255, 'maximum 255 characters allowed'),

    metadata: z.record(z.any()).optional()
});

module.exports = { expenseSchema };