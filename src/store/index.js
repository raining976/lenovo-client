// @/store/index.js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersistedstate)


export default store

export * from "./modules/user"
export * from "./modules/site"
export * from "./modules/adminSetting"

export * from "./modules/search"