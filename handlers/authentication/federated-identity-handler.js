import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import {
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk';
import Auth from '@aws-amplify/auth';

export const googleSignFedarated = (signInCb) => {
    GoogleSignin.hasPlayServices()
        .then(() => {
            GoogleSignin.signIn().then((userInfo) => {
                console.log('userInfo', userInfo);
                Auth.federatedSignIn(
                    'google',
                    {
                        token: userInfo.idToken,
                        expires_at: 60 * 1000 + new Date().getTime() // the expiration timestamp
                    },
                    userInfo.user
                )
                    .then((cred) => {
                        // If success, you will get the AWS credentials
                        console.log('cred', cred);
                        return Auth.currentAuthenticatedUser();
                    })
                    .then((user) => {
                        // If success, the user object you passed in Auth.federatedSignIn
                        console.log('user after federated login', user);
                        GoogleSignin.signOut();
                        signInCb(user);
                    })
                    .catch((e) => {
                        console.log('federated login error', e);
                        // GoogleSignin.signOut();
                    });
            }).catch((error) => {
                console.log('This called');
                console.log(error);
            });
        })
        .catch((error) => {
            console.log('userInfo error', error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('SIGN_IN_CANCELLED', error.code);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('IN_PROGRESS', error.code);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('PLAY_SERVICES_NOT_AVAILABLE', error.code);
            } else {
                // some other error happened
                console.log('other error', error.code);
            }
        });
};

export const facebookSignFedarated = (token, signInCb) => {
    console.log(token);
    const PROFILE_REQUEST_PARAMS = {
        fields: {
            string: 'id, name,  first_name, last_name',
        },
    };
    const profileRequest = new GraphRequest(
        '/me',
        { token, parameters: PROFILE_REQUEST_PARAMS },
        (error, result) => {
            if (error) {
                console.log('login info has error: ' + error);
            } else {
                console.log('result:', result);

                const user = {
                    name: result.name
                };

                Auth.federatedSignIn(
                    // CognitoHostedUIIdentityProvider.Facebook,
                    'facebook',
                    {
                        token: token,
                        expires_at: 60 * 1000 + new Date().getTime() // the expiration timestamp
                    },
                    user
                )
                    .then((cred) => {
                        console.log('cred', cred);
                        return Auth.currentAuthenticatedUser();
                    })
                    .then((user) => {
                        console.log('user after federated login', user);
                        LoginManager.logOut();
                        signInCb(user);
                    })
                    .catch((e) => {
                        console.log('federated login error', e);
                    });
            }
        },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
};