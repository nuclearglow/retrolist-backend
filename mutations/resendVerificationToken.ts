import { KeystoneContext } from '@keystone-next/types';
import { sendEmailVerificationEmail } from '../lib/mail';
import { getVerificationToken } from '../lib/token';

interface UserToVerify {
    id: string;
    email: string;
    verificationToken: string;
    verified: boolean;
}

// custom add to cart mutation
export const requestVerificationEmail = async (
    root: any,
    { email }: { email: string },
    context: KeystoneContext
): Promise<string> => {
    // get the user by email
    const [userToVerify] = (await context.lists.User.findMany({
        where: {
            email,
        },
        resolveFields: 'id,email,verified',
    })) as UserToVerify[];

    // only trigger if user exists and is not already verified
    if (userToVerify && !userToVerify.verified) {
        // a new verification token
        const verificationToken = getVerificationToken();
        // update: set unverified, set new verification code
        const verifiedUser: UserToVerify = await context.lists.User.updateOne({
            id: userToVerify.id,
            data: {
                verificationToken,
                verified: false,
            },
        });
        // re-send verification
        await sendEmailVerificationEmail(verificationToken, userToVerify.email);

        console.log(
            `Account Verification for ${verifiedUser.email} triggered!`
        );
    }
    return 'Accepted';
};
