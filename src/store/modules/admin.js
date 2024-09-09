export const useAdminStore = defineStore({
    id: 'Admin',
    state: () => ({
        token: ''
    }),
    actions:{
        isAdminLoggedIn(){
            return this.token == '' ? false : true;
        }
    },
    // 数据持久化
    persist: {
        key: "admin",
        storage: localStorage,
    },
})