export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = (error) => ({
    type: "LOGIN_FAILURE",
    payload: error
});

export const LogoutSuccess = (user) => ({
    type: "LOGOUT_SUCCESS",
    payload: user,
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
});

export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
});

export const UpdateProfilePicture = (profilePicture) => ({
    type: "UPDATE_PROFILE_PICTURE",
    payload: profilePicture,
});