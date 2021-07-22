import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const List = list({
    fields: {
        name: text({
            isRequired: true,
        }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        user: relationship({
            ref: 'User.list',
        }),
        items: relationship({
            ref: 'Item.list',
            many: true,
            ui: {
                createView: {
                    fieldMode: 'edit',
                },
                itemView: {
                    fieldMode: 'edit',
                },
            },
        }),
    },
});
