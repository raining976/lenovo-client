import { HomeFilled, Avatar, List, GoodsFilled, Timer, Wallet, ShoppingCartFull, CircleCheck } from '@element-plus/icons-vue'

const ElIcons = [HomeFilled, Avatar, List, GoodsFilled, Timer, Wallet, ShoppingCartFull, CircleCheck]

export const registerComponent = (app) => {
    for (const icon of ElIcons) {
        app.component(icon.name, icon)

    }
}

