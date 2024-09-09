export const useSiteStore = defineStore({
    id:"Site",
    state:() => ({
        role: 0, // 0 普通用户， 1 后台管理员
    }),
    getters:{
      isAdmin(){
        return this.role == 1 ? true : false
      } 
    },
    actions: {
        setRole(role){
            this.role = role
        },
        setAdmin(){
          this.role = 1
        },
        setUser(){
          this.role = 0
        }
    }
})