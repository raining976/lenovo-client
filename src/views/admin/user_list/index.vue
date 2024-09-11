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
        <el-button type="primary" :icon="CirclePlus" @click="isAddNewUserDialogVisible = true">新增用户</el-button>
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
          <el-table-column prop="id" label="用户ID" />
          <el-table-column prop="email" label="邮箱账号" />
          <el-table-column prop="nickname" label="昵称" />
          <el-table-column prop="gender" label="性别" :formatter="formatSex" />
          <el-table-column prop="balance" label="余额(￥)" />
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

    <div class="addnewDialog">
      <el-dialog v-model="isAddNewUserDialogVisible" title="新用户" width="500px" :before-close="dialogClose">
        <el-form :model="newUser">
          <el-form-item label="邮箱账号" label-width="100px">
            <el-input clearable v-model="newUser.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" label-width="100px">
            <el-input clearable v-model="newUser.password" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogClose">取消</el-button>
            <el-button type="primary" @click="saveNewUser">保存</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

  </div>


</template>

<script setup>
  import { Search, CirclePlus, Delete } from '@element-plus/icons-vue'
  import { onMounted } from 'vue';
  
  const { proxy } = getCurrentInstance()

  const router = useRouter();

  const isAddNewUserDialogVisible = ref(false);

  const searchInput = ref({
    email: '',
  });

  const newUser = ref({
    email:'',
    password:'123456789'
  })

  const dialogClose = () => {
    newUser.value.email=''
    // newUser.value.password=''
    isAddNewUserDialogVisible.value=false
  }

  const saveNewUser = () =>{
    if(newUser.value.email===''||newUser.value.password===''){
      alert('邮箱或密码不能为空！');
      return;
    }
    else if(newUser.value.password.length<=6){
      alert('密码需超过六位数！');
      return;
    }
    proxy.$api.adminAddNewUser(newUser.value).then(res=>{
      if(res.code===0){
        newUser.value.email=''
        // newUser.value.password=''
        isAddNewUserDialogVisible.value=false;
        getData();
      }
    })
  }

  const formatSex = (row, column, cellValue) => {
    switch (cellValue) {
      case 1:
        return '男'
      case 2:
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

  const Pagination= ref({  //分页器
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
    total: 10, // 总条数
  })
  onMounted(()=>{
    getData()
  })
  const tableData = ref([])
  const getData= () => { //向后端请求数据
    const request = {email:searchInput.value.email,page:Pagination.value.currentPage,limit:Pagination.value.pageSize}
    console.log(request)
    proxy.$api.adminGetUserList(request).then(res=>{
      if(res.code===0){
        tableData.value=res.data.records
        Pagination.value.total=res.data.total 
        console.log("data=",tableData.value)
        tableData.value.forEach(item => {
          // 计算 balance/100
          item.balance = (item.balance / 100).toFixed(2);
        });
      }
    })
  }
  

  const emailSearch = () => {
    getData();
  }


  const handleSizeChange = (val) => { //页数改变时
    Pagination.value.pageSize=val;
    Pagination.value.currentPage=1;
    getData();
  }
                   
  const handleCurrentChange = (val) => { //当前页数改变时
    Pagination.value.currentPage=val
    getData();
  }

  const handleEdit = (row) => {
    router.push(`/admin/userInfo/${row.id}`)
  }

  const handleDelete = async (row) => { //向后端发起请求
    console.log('删除:', row);
    ElMessageBox.confirm(
      '确认删除？',
      '警告！',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'danger',
      }
    )
      .then(() => {
        console.log('删除:', row);
        const deleUser={userId:row.id};
        proxy.$api.adminDeleteUser(deleUser).then(res=>{
          if(res.code===0){
            getData();
          }
        })
        ElMessage({
          type: 'success',
          message: '删除成功！',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除。',
        })
      })


   
  };



  //选择+批量删除
  const selectedRows=ref([])

  const handleSelectionChange=(val)=>{
    selectedRows.value=val;
  }

  const batchDeletion = async () => {
    if (selectedRows.value.length === 0) {
      alert('请先选择要删除的项');
      return;
    }

    // 获取要删除的项邮箱
    const idsToDelete = selectedRows.value.map(row => row.id);

    try {
      await ElMessageBox.confirm(
        '确认删除？',
        '警告！',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'danger',
        }
      );

      // 创建删除操作的 Promise 数组
      const deletePromises = idsToDelete.map(id => {
        const deleUser = { userId: id };
        return proxy.$api.adminDeleteUser(deleUser);
      });

      // 等待所有删除操作完成
      await Promise.all(deletePromises);

      // 获取数据
      await getData();

      // 显示成功消息
      ElMessage({
        type: 'success',
        message: '删除成功！',
      });
    } catch (error) {
      if (error !== 'cancel') {
        // 处理删除失败的情况
        ElMessage({
          type: 'error',
          message: '删除失败。',
        });
      } else {
        // 处理取消删除的情况
        ElMessage({
          type: 'info',
          message: '取消删除。',
        });
      }
    }
  };


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