const awsmobile = {
    aws_project_region: 'ap-southeast-1',
    aws_cognito_identity_pool_id: 'ap-southeast-1:c333d89b-4971-4591-81bd-5e91697f1ebd',
    aws_cognito_region: 'ap-southeast-1',
    aws_user_pools_id: 'ap-southeast-1_1QurQTGkT',
    aws_user_pools_web_client_id: '3baepv6lc60kfidjepgkf80h59',
    mandatorySignIn: false,
    oauth: {
        domain: 'cloud-native-dev.auth.ap-southeast-1.amazoncognito.com',
        scope: ['email', 'profile', 'openid'],
        redirectSignIn: 'myapp://StartSlide',
        redirectSignOut: 'myapp://StartSlide',
        responseType: 'token' // or 'code', note that REFRESH token will only be generated when the responseType is code
    },
};


export default awsmobile;