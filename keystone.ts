import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
    statelessSessions,
    withItemData
} from '@keystone-next/keystone/session';
import { KeystoneConfig, KeystoneContext } from '@keystone-next/types';
import 'dotenv/config';
import { sendPasswordResetEmail } from './lib/mail';
import { extendGraphqlSchema } from './mutations/index';
import { Item } from './schemas/Item';
import { List } from './schemas/List';
import { User } from './schemas/User';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        // TODO: add more roles here
    },
    passwordResetLink: {
        async sendToken(args) {
            // send the email
            await sendPasswordResetEmail(args.token, args.identity);
        },
        tokensValidForMins: 60,
    },
});

const keystoneConfig: KeystoneConfig = {
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
        port: 3000,
    },
    db: {
        adapter: 'mongoose',
        url: process.env.DATABASE_URL,
        onConnect: async (context: KeystoneContext) => {
            console.log('connected to database');
        },
    },
    lists: createSchema({
        User,
        List,
        Item,
    }),
    // custom schema code here
    extendGraphqlSchema,
    // keystone ui settings
    ui: {
        isAccessAllowed: ({ session }) => !!session?.data,
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: 'id',
    }),
};

export default withAuth(config(keystoneConfig));
