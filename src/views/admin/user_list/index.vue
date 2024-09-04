<template>
  <div
    v-if="!isTableHidden" 
    class="userListContainer">
    <div class="tableHeadaddShadow">
      <div class="tableHeadContainer">
        <el-form :inline="true">
          <el-form-item label="邮箱账号">
            <el-input clearable type="email" v-model="searchInput.email" placeholder="email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="emailSearch">查询</el-button>
          </el-form-item>
        </el-form>
    </div>
    
      
    </div>

    <div class="tableBody">
      <div class="toolbar">
        <el-button type="primary" :icon="CirclePlus" @click="addUser">新增用户</el-button>
        <el-button type="danger" :icon="Delete" @click="batchDeletion">批量删除</el-button>
      </div>

      <div class="table">
        <el-table 
          :data="tableData.slice((Pagination.currentPage-1)*Pagination.pageSize, Pagination.pageSize*Pagination.currentPage)" 
          style="width: 100%" 
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          >

          <el-table-column type="selection" width="55" />
          <el-table-column prop="userId" label="用户ID" />
          <el-table-column prop="email" label="账号"  />
          <el-table-column prop="name" label="昵称"  />
          <el-table-column prop="sex" label="性别" :formatter="formatSex" />
          <el-table-column prop="balance" label="余额" />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button @click="handleEdit(scope.row)" type="primary" size="small">修改</el-button>
                <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          
        </el-table>
      </div>

      <div class="bottom">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Pagination.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="Pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="Pagination.total">
        </el-pagination>

      </div>

      
    </div>



  </div>

    
  <div class="userDetails">
    <router-view/>
  </div>
  
</template>

<script setup>
import {Search,CirclePlus,Delete} from '@element-plus/icons-vue'


const router=useRouter();

const searchInput = ref({
    email: '',
  });

const formatSex = (row, column, cellValue) => {
  switch (cellValue) {
    case '1':
      return '男'
    case '2':
      return '女'
    default:
      return '未知'
  }
}



const Dataset = [
  {
    userId:'1',
    email: '13664@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    userId:'2',
    email: '187@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    userId:'3',
    email: '144464@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    userId:'4',
    email: '123144@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    userId:'5',
    email: '1332164@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    userId:'6',
    email: '122221335@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    userId:'7',
    email: '111111@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  
]
const tableData = ref(Dataset)

const Pagination= ref({
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
    total: tableData.value.length, // 总条数
    layout: 'total, sizes, prev, pager, next, jumper', // 分页布局
})

const handleSizeChange = (val) => {
  Pagination.value.pageSize=val
  
}

                   
const  handleCurrentChange = (val) => {
  Pagination.value.currentPage=val
  
}

const route = useRoute()
const isTableHidden = computed(() => {
  return route.path.includes('/admin/user_list/') && route.params.id
})

const handleEdit = (row) => {
  router.push({ 
    path: '/admin/user_list/${row.id}', 
    query: { ...row }  // 将数据作为查询参数传递
  })
}
const handleDelete = (row) => {
  console.log('删除:', row)
  // 删除逻辑
}
const batchDeletion= ()=>{
  console.log('删除:')
}
const emailSearch=()=>{
  console.log('查找:')
  
  tableData.value = Dataset.filter(
    (item) => item.email.indexOf(searchInput.value.email) >= 0
  );
  handleCurrentChange(1) // 切换到第一页
  Pagination.value.total = tableData.value.length // 重新设置总数量

}
const addUser=()=>{
  
  console.log('新增用户')
}


</script>

<style scoped>

.tableHeadaddShadow{
  margin-bottom: 20px;
}

.tableHeadContainer{
  background-color: white;
  padding: 20px 0px 0px 20px;
}

.tableBody{
  background-color: white;
  padding: 20px;
}

.tableBody .toolbar,
.tableBody .table {
  margin-bottom: 20px;
}

.tableBody .bottom{
  display: flex;
  justify-content: end;
}

.userListContainer{
  padding: 20px;
}

.userDetails{
  padding: 20px;
}



</style>