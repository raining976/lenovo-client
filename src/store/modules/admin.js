export const useAdminStore = defineStore({
    id: admin,
    state: () => ({
        token: ''
    }),
    // 数据持久化
    persist: {
        key: "admin",
        storage: localStorage,
    },
})