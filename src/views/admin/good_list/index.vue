<template>
    <div class="productTableContainer">
      <div class="tableHeadaddShadow">
        <div class="tableHeadContainer">
          <el-form :inline="true">
            <el-form-item label="商品ID">
              <el-input clearable v-model="searchInput.productId" placeholder="请输入商品ID"></el-input>
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
            :data="filteredProductData.slice((Pagination.currentPage - 1) * Pagination.pageSize, Pagination.pageSize * Pagination.currentPage)"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="productId" label="商品ID" />
            <el-table-column prop="productName" label="商品名称" />
            <el-table-column prop="description" label="简介" />
            <el-table-column prop="unitPrice" label="单价" />
            <el-table-column prop="stockQuantity" label="库存数量" />
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
  import { ref, computed } from 'vue';
  import { Search, CirclePlus, Delete } from '@element-plus/icons-vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const searchInput = ref({ productId: '' });
  
  const Dataset = [
    {
      productId: 'P12345',
      productName: '商品A',
      description: '这是商品A的简介。',
      unitPrice: '￥100.00',
      stockQuantity: 50,
    },
    {
      productId: 'P67890',
      productName: '商品B',
      description: '这是商品B的简介。',
      unitPrice: '￥150.00',
      stockQuantity: 30,
    },
    {
      productId: 'P11223',
      productName: '商品C',
      description: '这是商品C的简介。',
      unitPrice: '￥200.00',
      stockQuantity: 20,
    },
    {
      productId: 'P44556',
      productName: '商品D',
      description: '这是商品D的简介。',
      unitPrice: '￥300.00',
      stockQuantity: 10,
    },
    {
      productId: 'P77889',
      productName: '商品E',
      description: '这是商品E的简介。',
      unitPrice: '￥400.00',
      stockQuantity: 5,
    },
  ];
  
  const productData = ref(Dataset);
  
  const Pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: productData.value.length,
  });
  
  const filteredProductData = computed(() => {
    return productData.value.filter(item => item.productId.includes(searchInput.value.productId));
  });
  
  const handleSizeChange = (val) => {
    Pagination.value.pageSize = val;
  };
  
  const handleCurrentChange = (val) => {
    Pagination.value.currentPage = val;
  };
  
  const handleEdit = (row) => {
    router.push(`/admin/goodsInfo/${row.productId}`)
  }

  const handleDelete = (row) => {
    const index = productData.value.findIndex(item => item.productId === row.productId);
    if (index !== -1) {
      productData.value.splice(index, 1);
      console.log('已删除商品:', row);
    } else {
      console.log('未找到要删除的商品:', row);
    }
  };
  
  const batchDeletion = () => {
    console.log('批量删除:');
  };
  
  const productSearch = () => {
    console.log('查找商品:');
    handleCurrentChange(1);
    Pagination.value.total = filteredProductData.value.length;
  };
  
  const addProduct = () => {
    console.log('新增商品');
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
  
