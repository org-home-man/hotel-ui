const TOKEN_KEY = "sessionId";
const USER_KEY = "user";

export const setToken = token => {
    sessionStorage.setItem(TOKEN_KEY, token);
};

export const setUser = userName =>{
    sessionStorage.setItem(USER_KEY,userName);
}

export const getToken = () => {
    return sessionStorage.getItem(TOKEN_KEY);
};

export const getUser = () =>{
    return sessionStorage.getItem(USER_KEY);
}
export const clearToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
};

