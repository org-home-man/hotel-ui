const agreeZh = "agreementZh";
const agreeEn = "agreementEn";


export const setAgreeZh = agreementZh => {
    sessionStorage.setItem(agreeZh, agreementZh);
};

export const setAgreeEn = agreementEn =>{
    sessionStorage.setItem(agreeEn,agreementEn);
}

export const getAgreeZh = () => {
    return sessionStorage.getItem(agreeZh);
};

export const getAgreeEn = () =>{
    return sessionStorage.getItem(agreeEn);
}

export const clearAgree = () => {
    sessionStorage.removeItem(agreeZh);
    sessionStorage.removeItem(agreeEn);
};
