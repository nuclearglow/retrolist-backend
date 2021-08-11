import { checkbox, password, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { sendEmailVerificationEmail } from '../lib/mail';
import { getVerificationToken } from '../lib/token';

export const User = list({
    // access:
    // ui:
    fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        verified: checkbox({ isRequired: true, defaultValue: false }),
        verificationToken: text({ isRequired: true }),
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
    hooks: {
        /* before user creation hook
         * create a verification token
         * send it by email
         * save it in the database
         */
        resolveInput: async ({ operation, resolvedData }) => {
            if (operation === 'create') {
                const verificationToken = getVerificationToken();

                await sendEmailVerificationEmail(
                    verificationToken,
                    resolvedData.email
                );

                resolvedData.verificationToken = verificationToken;
            }
            return resolvedData;
        },
    },
});
