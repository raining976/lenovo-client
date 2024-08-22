// @/store/modules/user.js

export const useUserStore = defineStore({
    id: "User",
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++;
        },
    },
});