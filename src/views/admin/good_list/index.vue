<template>
    <div class="productTableContainer">
      <div class="tableHeadaddShadow">
        <div class="tableHeadContainer">
          <el-form :inline="true">
            <el-form-item label="商品名称">
              <el-input clearable v-model="searchInput.productName" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :icon="Search" @click="productSearch">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
  
      <div class="tableBody">
        <div class="toolbar">
          <el-button type="primary" :icon="CirclePlus" @click="addProduct">新增商品</el-button>
          <el-button type="danger" :icon="Delete" @click="batchDeletion">批量删除</el-button>
        </div>
  
        <div class="table">
          <el-table
            @selection-change="handleSelectionChange"
            :data="productData"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="productId" label="商品ID" />
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="brief" label="简介" />
            <el-table-column prop="price" label="单价(￥)" />
            <el-table-column prop="categoryId" label="类别" :formatter="formatCategory"/>
            <el-table-column label="管理">
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
            :total="Pagination.total"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>

  import { Search, CirclePlus, Delete } from '@element-plus/icons-vue';
  import { onMounted } from 'vue';
  
  const { proxy } = getCurrentInstance()
  
  const router = useRouter();
  
  const searchInput = ref({ productName: '' });
  
  const formatCategory = (row, column, cellValue) => {
    switch (cellValue) {
      case 3:
        return 'Lenovo电脑'
      case 4:
        return 'Lenovo台式机'
      case 5:
        return '手机&配件'
      case 6:
        return '平板电脑'
      case 7:
        return '选件'
      case 8:
        return '服务/配件'
      case 9:
        return '智能'
      case 10:
        return '显示器'
      case 11:
        return 'IP周边'
      default:
        return '未知'
    }
  }
  
  const Pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  
  onMounted(()=>{
    getData()
  })
  const productData = ref([])
  const getData= () => { //向后端请求数据
    const request = {
      productName: searchInput.value.productName,
      page: Pagination.value.currentPage,
      limit: Pagination.value.pageSize
    }
    proxy.$api.adminGetProductList(request).then(res=>{
      if(res.code===0){
        productData.value=res.data.records
        Pagination.value.total=res.data.total 
        productData.value.forEach(item => {
          // 计算 price/100
          item.price = (item.price / 100).toFixed(2);
        });
      }
    })
  }
  
  const handleSizeChange = (val) => { //页数改变时
    productData.value=[]
    Pagination.value.pageSize=val;
    Pagination.value.currentPage=1;
    getData();
  }
                   
  const handleCurrentChange = (val) => { //当前页数改变时
    productData.value=[]
    Pagination.value.currentPage=val
    getData();
  }
  
  const handleEdit = (row) => {
    const id="E"+row.id
    router.push(`/admin/goodsInfo/${id}`)
  }

  const handleDelete = async (row) => { //向后端发起删除请求
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
        const request={productId:row.productId};
        proxy.$api.adminDeleteProduct(request).then(res=>{
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
      ElMessage({
        type: 'warning',
        message: '请先选择需要删除的内容！',
      })
      return;
    }

    // 获取要删除的项id
    const idsToDelete = selectedRows.value.map(row => row.productId);
    console.log("dele:",idsToDelete)

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
      const deletePromises = idsToDelete.map(productId => {
        const request = { productId: productId };
        return proxy.$api.adminDeleteProduct(request);
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
  
  const productSearch = () => {
    getData();
  };
  
  const addProduct = () => {
    const id="N"
    router.push(`/admin/goodsInfo/${id}`)
  };
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
  
  .productTableContainer {
    padding: 20px;
  }
  
  .productDetails {
    padding: 20px;
  }
</style>
  
