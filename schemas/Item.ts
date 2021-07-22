import { integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Item = list({
    fields: {
        name: text({
            isRequired: true,
        }),
        quantity: integer({
            defaultValue: 1,
            isRequired: true,
        }),
        list: relationship({
            ref: 'List.items',
            many: false,
        }),
    },
    ui: {
        listView: {
            initialColumns: ['name', 'quantity', 'list'],
        },
    },
});
