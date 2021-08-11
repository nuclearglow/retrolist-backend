import { KeystoneContext } from '@keystone-next/types';
import { sendWelcomeEmail } from '../lib/mail';

interface UserToVerify {
    id: string;
    email: string;
    verificationToken: string;
}

// custom add to cart mutation
export const verifyUser = async (
    root: any,
    { verificationToken }: { verificationToken: string },
    context: KeystoneContext
): Promise<string> => {
    // get the user by email
    const [unverifiedUser] = (await context.lists.User.findMany({
        where: {
            verificationToken,
            verified: false,
        },
        resolveFields: 'id,email,verificationToken',
    })) as UserToVerify[];
    // if user not found, return an error
    if (!unverifiedUser) {
        throw new Error('Verification failed.');
    }

    if (unverifiedUser.verificationToken === verificationToken) {
        // send welcome email
        await sendWelcomeEmail(unverifiedUser.email);
        // update: set verified, delete verification token
        const verifiedUser: UserToVerify = await context.lists.User.updateOne({
            id: unverifiedUser.id,
            data: {
                verificationToken: '',
                verified: true,
            },
        });
        console.log(`Account Email ${verifiedUser.email} has been verified!`);
        return 'Verified';
    }
    throw new Error('Verification failed.');
};
