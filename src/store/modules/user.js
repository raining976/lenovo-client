// @/store/modules/user.js

export const useUserStore = defineStore({
    id: "User",
    state: () => ({
        token: '',
        userInfo: null,
    }),
    actions: {
        getToken() {
            return this.token
        },
        setToken(val) {
            this.token = val
        }
    },
    // 数据持久化
    persist: {
        key: "user",
        storage: localStorage,
    },
});