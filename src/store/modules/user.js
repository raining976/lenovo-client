// @/store/modules/user.js

import { reactive } from "vue";
import router from "@/router";

export const useUserStore = defineStore({
    id: "User",
    state: () => ({
        token: null,
        userInfo: {
            avatar: "",
            balance: 1000000,
            createdTime: '',
            email: "",
            id: 1,
            nickname: "",
        },
    }),
    getters: {
        isLoggedIn() {
            return this.token == null ? false : true;
        }
    },
    actions: {
        getToken() {
            return this.token
        },
        setToken(val) {
            this.token = val
        },
        setUserInfo(data) {
           this.userInfo = reactive(data)
            console.log('this.userInfo', this.userInfo)
        },
        logout(){
            this.token = null
            router.replace('/')
        }
    },
    // 数据持久化
    persist: {
        key: "user",
        storage: localStorage,
    },
});