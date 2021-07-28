import { relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const List = list({
    fields: {
        title: text({
            isRequired: true,
        }),
        subtitle: text({
            isRequired: true,
        }),
        user: relationship({
            ref: 'User.lists',
            many: false,
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
