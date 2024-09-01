export const useAdminSettingStore = defineStore({
    id:"AdminSetting",
    state: ()=>({
        isFold: false,
    }),
    actions: {
        setIsFold(val){
            this.isFold = val
        },
        switchFold(){
            this.isFold = !this.isFold
        }
    },
    persist: {
        key: "adminSetting",
        storage: localStorage,
    },
})
