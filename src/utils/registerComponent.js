import { HomeFilled, Avatar, List, GoodsFilled } from '@element-plus/icons-vue'

const ElIcons = [HomeFilled, Avatar, List, GoodsFilled]

export const registerComponent = (app) => {
    for (const icon of ElIcons) {
        app.component(icon.name, icon)

    }
}

