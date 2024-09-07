<template>
  <div class="userListContainer">
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
          @selection-change="handleSelectionChange"
          :data="tableData"
          style="width: 100%" 
          :header-cell-style="{ 'text-align': 'center' }" 
          :cell-style="{ 'text-align': 'center' }">

          <el-table-column type="selection" width="55" />
          <el-table-column prop="userID" label="用户ID" />
          <el-table-column prop="email" label="邮箱账号" />
          <el-table-column prop="name" label="昵称" />
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
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="Pagination.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="Pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="Pagination.total">
        </el-pagination>

      </div>
    </div>
  </div>


</template>

<script setup>
  import { Search, CirclePlus, Delete } from '@element-plus/icons-vue'
  
  const { proxy } = getCurrentInstance()

  const router = useRouter();

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



  const Dataset = [  //假数据
    {
      userID: 'lenovo1',
      email: '13664@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },
    {
      userID: 'lenovo2',
      email: '187@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },
    {
      userID: 'lenovo3',
      email: '144464@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },
    {
      userID: 'lenovo4',
      email: '123144@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },
    {
      userID: 'lenovo5',
      email: '1332164@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },
    {
      userID: 'lenovo6',
      email: '122221335@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },
    {
      userID: 'lenovo7',
      email: '111111@qq.com',
      name: 'Tom',
      sex: '1',
      balance: '￥1000.00'
    },

  ]

  const getDataLength=()=>{  //向后端请求获取数据的总数
    return Dataset.length;
  }

  const Pagination= ref({  //分页器
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
    total: getDataLength(), // 总条数
  })

  const getData=(currentpage,pagesize) => { //向后端请求数据
    try {
      // 发送 GET 请求
  //      const response = await axios.get(endpoint);
      // 返回响应数据
  //      return response.data;
      console.log("getdata");
      return Dataset.slice((currentpage - 1) * pagesize, currentpage * pagesize)
    } catch (error) {
      // 捕获和处理错误
      console.error('请求数据失败:', error);
      throw error; // 重新抛出错误以便调用者处理
    }
  }
  const tableData = ref(getData(Pagination.value.currentPage,Pagination.value.pageSize))

  const emailSearch = () => {
    console.log('查找:',searchInput.value.email)
  }


  const handleSizeChange = (val) => { //页数改变时
    Pagination.value.pageSize=val;
    Pagination.value.currentPage=1;
    tableData.value=getData(1,val);
  }
                   
  const handleCurrentChange = (val) => { //当前页数改变时
    Pagination.value.currentPage=val
    tableData.value=getData(val,Pagination.value.pageSize);
  }

  const handleEdit = (row) => {
    router.replace(`/admin/userInfo/${row.userID}`)
  }

  const handleDelete = async (row) => { //向后端发起请求
    console.log('删除:', row);
    Pagination.value.total--;
    try {
      // 发送 DELETE 请求到后端
      //await axios.delete(`/api/items/${row.id}`);
      // 从数组中删除项
      const index = tableData.value.findIndex(item => item.id === row.id);
      if (index !== -1) {
        tableData.value.splice(index, 1);
      }
    } catch (error) {
      console.error('删除失败:', error);
    }
  };
  const addUser=()=>{
    console.log('新增用户')
    const newID = getDataLength()+1;
    const newuser={
      userID: 'lenovo' + newID,
      email: '',
      name: '',
      sex: '1',
      balance: '￥1000.00'
    };
    router.push(`/admin/userInfo/${newuser.userID}`)
  }

  //选择+批量删除
  const selectedRows=ref([])

  const handleSelectionChange=(val)=>{
    selectedRows.value=val;
  }

  const batchDeletion= async()=>{
    if (selectedRows.value.length === 0) {
      alert('请先选择要删除的项');
      return;
    }

    // 获取要删除的项邮箱
    const idsToDelete = selectedRows.value.map(row => row.userID);
    console.log(idsToDelete)

    try {
      // 发起删除请求
    //  await axios.post('/api/delete-items', { ids: idsToDelete });
      console.log('删除成功');

      // 从表格数据中移除已删除的项
  //     tableData.value = tableData.value.filter(
  //       item => !idsToDelete.includes(item.id)
  //     );
  // //    tableData.value = getData(1,Pagination.value.pageSize);
  //     //改变分页器总数
  //     Pagination.value.total -= idsToDelete.length
  //     // 清空选中的行
  //     selectedRows.value = [];
    } catch (error) {
      console.error('删除失败:', error);
    }
  }


</script>

<style scoped>
.tableHeadaddShadow {
  margin-bottom: 20px;
}

.tableHeadContainer {
  background-color: white;
  padding: 20px 0px 0px 20px;
}

.tableBody {
  background-color: white;
  padding: 20px;
}

.tableBody .toolbar,
.tableBody .table {
  margin-bottom: 20px;
}

.tableBody .bottom {
  display: flex;
  justify-content: end;
}

.userListContainer {
  padding: 20px;
}

.userDetails {
  padding: 20px;
}
</style>