import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import { requestVerificationEmail } from './resendVerificationToken';
import { verifyUser } from './verifyUser';

// make a fake graphql syntax, useful if a string is expected w/o syntax highlighting support
const graphql = String.raw;

// my custom mutations
export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: graphql`
        type Mutation {
            verifyUser(email: String, verificationToken: String): String
        }
        type Mutation {
            requestVerificationEmail(email: String): String
        }
    `,
    resolvers: {
        Mutation: {
            verifyUser,
            requestVerificationEmail,
        },
    },
});
