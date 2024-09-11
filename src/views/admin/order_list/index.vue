<template>
  <div class="orderTableContainer">
    <div class="tableHeadaddShadow">
      <div class="tableHeadContainer">
        <el-form :inline="true">
          <el-form-item label="订单号">
            <el-input clearable v-model="searchInput.orderId" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item label="用户ID">
            <el-input clearable v-model="searchInput.userId" placeholder="请输入用户ID"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchInput.status" placeholder="全部状态" style="width: 100px">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="orderSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="tableBody">
      <div class="toolbar">
        <el-button type="primary" :icon="CirclePlus" @click="addOrder">新增订单</el-button>
        <el-button type="danger" :icon="Delete" @click="batchDeletion">批量删除</el-button>
      </div>

      <div class="table">
        <el-table @selection-change="handleSelectionChange" :data="orderData" style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="订单号" />
          <el-table-column prop="createdTime" label="创建时间" />
          <el-table-column prop="name" label="收货人" />
          <el-table-column prop="phone" label="电话" />
          <el-table-column prop="dz" label="收货地址" />
          <el-table-column prop="payment" label="总金额" />
          <el-table-column prop="status" label="状态">
            <template #default="scope">
              <el-tag type="success" v-if="scope.row.status === 1">待付款</el-tag>
              <el-tag type="warning" v-if="scope.row.status === 2">待发货</el-tag>
              <el-tag type="success" v-if="scope.row.status === 3">待收货</el-tag>
              <el-tag type="success" v-if="scope.row.status === 4">已完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="管理">
            <template #default="scope">
              <el-button @click="handleEdit(scope.row)" type="primary" size="small">详情</el-button>
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
      <el-dialog v-model="isAddOrderVisible" title="新订单" width="500px" :before-close="dialogClose">
        <el-form :model="newOrder">
          <el-form-item label="用户Id" label-width="100px">
            <el-input clearable v-model="newOrder.userId" autocomplete="off" />
          </el-form-item>
          <el-form-item label="收货地址" label-width="100px">
            <el-input clearable v-model="newOrder.dz" autocomplete="off" />
          </el-form-item>
          <el-form-item label="收获人姓名" label-width="100px">
            <el-input clearable v-model="newOrder.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="收货人电话" label-width="100px">
            <el-input clearable v-model="newOrder.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="备注" label-width="100px">
            <el-input clearable v-model="newOrder.remarks" autocomplete="off" />
          </el-form-item>
          <el-form-item label="交易金额(￥)" label-width="100px">
            <el-input-number v-model="newOrder.payment" :precision="2" :step="0.01" controls-position="right"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogClose">取消</el-button>
            <el-button type="primary" @click="saveNewOrder">保存</el-button>
          </div>
        </template>
      </el-dialog>
    </div>

  </div>

</template>

<script setup>
import { Search, CirclePlus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';

const isAddOrderVisible = ref(false);
const router = useRouter();
const { proxy } = getCurrentInstance()
const searchInput = ref({ orderId: '', userId: '', status: '' });
const Pagination = ref({  //分页器
  currentPage: 1, // 当前页
  pageSize: 10, // 每页显示条数
  total: 10, // 总条数
});
const statusOptions = ref([
  { value: '', label: '全部' },
  { value: 1, label: '待付款' },
  { value: 2, label: '待发货' },
  { value: 3, label: '待收货' },
  { value: 4, label: '已完成' },
])
const newOrder = ref({
  "userId": 1,
  "dz": "山南省紫岛市",
  "name": "小q",
  "phone": "18775721165",
  "remarks": "Please deliver between 9-11 AM",
  "items": [],
  "payment": 20000
})
const dialogClose = () => {
  newOrder.value.email = '';
  isAddOrderVisible.value = false;
}
const saveNewOrder = () => {
  const quest = {
    userId: newOrder.value.userId,
    dz: newOrder.value.dz,
    name: newOrder.value.name,
    phone: newOrder.value.phone,
    remarks: newOrder.value.remarks,
    items: newOrder.value.items,
    payment: Math.floor(newOrder.value.payment * 100)
  }
  
  proxy.$api.adminAddOrder(quest).then(res => {
    if (res.code === 0) {
      isAddOrderVisible.value = false;
      ElMessage({
          type: 'success',
          message: '保存成功！',
      });
      getData();
    }
  })
}
const getData = () => { //向后端请求数据
  const request = {
    userId: searchInput.value.userId,
    orderId: searchInput.value.orderId,
    status: searchInput.value.status,
    page: Pagination.value.currentPage,
    limit: Pagination.value.pageSize
  }
  console.log("request", request)
  proxy.$api.adminSearchOrder(request).then(res => {
    orderData.value = res.data.records
    Pagination.value.total = res.data.total
    orderData.value.forEach(item => {
      item.payment = (item.payment / 100).toFixed(2);
    });
  }
  )
}
onMounted(() => {
  getData()
})
const orderData = ref([]);

const handleSizeChange = (val) => { //页数改变时
  Pagination.value.pageSize = val;
  Pagination.value.currentPage = 1;
  getData();
}

const handleCurrentChange = (val) => { //当前页数改变时
  Pagination.value.currentPage = val
  getData();
}

const handleEdit = (row) => {
  router.push(`/admin/orderInfo/${row.id}`)
}

const handleDelete = async (row) => {
  ElMessageBox.confirm(
    '确认删除？',
    '警告！',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'danger',
    }
  ).then(() => {
    proxy.$api.adminDeletOrder({ orderId: row.id }).then(res => {
      if (res.code == 0) {
        ElMessage({
          type: 'success',
          message: '删除成功！'
        });
        getData();
      }
    });
    
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除'
    })
  });
};


const orderSearch = () => {  //向后端查找并渲染
  getData();
};

const addOrder = () => {
  isAddOrderVisible.value = true
};

//选择+批量删除
const selectedRows = ref([])

const handleSelectionChange = (val) => {
  selectedRows.value = val;
}

const batchDeletion = async () => {
  if (selectedRows.value.length === 0) {
    ElMessage({
      type: 'warning',
      message: '请选择需要删除的订单'
    })
    return;
  }

  // 获取要删除的项
  const idsToDelete = selectedRows.value.map(row => row.id);
  console.log(idsToDelete)
  try {
    await ElMessageBox.confirm(
      '确认删除？',
      '警告！',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'danger'
      }
    );
    const deletePromiss = idsToDelete.map(id => {
      return proxy.$api.adminDeletOrder({ orderId: id })
    });
    await Promise.all(deletePromiss);
    ElMessage({
      type: 'success',
      message: '删除成功！'
    })
    getData();
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
  padding: 20px 0 0 20px;
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

.orderTableContainer {
  padding: 20px;
}

.orderDetails {
  padding: 20px;
}
</style>
