import { password, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
    // access:
    // ui:
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        lists: relationship({
            ref: 'List.user',
            many: true,
            ui: {
                createView: {
                    fieldMode: 'hidden',
                },
                itemView: {
                    fieldMode: 'read',
                },
            },
        }),
        // TODO: add roles and orders
    },
});
