// @/store/modules/user.js

export const useUserStore = defineStore({
    id: "User",
    state: () => ({
        count: 11,
    }),
    actions: {
        increment() {
            this.count++;
        },
    },
});