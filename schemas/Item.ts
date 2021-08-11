import { checkbox, integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Item = list({
    fields: {
        title: text({
            isRequired: true,
        }),
        quantity: integer({
            defaultValue: 1,
            isRequired: true,
        }),
        done: checkbox({
            defaultValue: false,
        }),
        list: relationship({
            ref: 'List.items',
            many: false,
        }),
    },
    ui: {
        listView: {
            initialColumns: ['title', 'quantity', 'list'],
        },
    },
});
