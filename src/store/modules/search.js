import { searchGoods } from '@/api'


export const useSearchStore = defineStore({
    id: 'Search',
    state: () => ({
        searchForm: {
            pattern: '',
            limit: 16, // 一页多少个
            currentPage: 1, // 第几页
            categoryId: null, // 分类id 一共七类
            sorter: 0, // 0 不排序 1 升序 2 是降序
            startPrice: null,
            endPrice: null,
        },
        totalItems: 0,
        searchRes: null,
        isEmpty: false,
    }),
    actions: {
        search() {
            this.searchRes = null
            searchGoods(this.searchForm).then(res => {
                if (res.code == 0) {
                    this.searchRes = res.data
                    this.isEmpty = !res.data.pageSum
                    this.totalItems = res.data.totalItems
                }
            })
        }
    }
})