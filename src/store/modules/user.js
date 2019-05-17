export default {
    state: {
        perms: [],  // 用户权限标识集合
        currentUser: {}
    },
    getters: {
   
    },
    mutations: {
        setPerms(state, perms){  // 用户权限标识集合
            state.perms = perms;
        },
        setCurrentUser(state, user){
            state.currentUser = user;
        }
    },
    actions: {
    }
}
