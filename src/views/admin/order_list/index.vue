<template>
    <div
      class="orderTableContainer">
      <div class="tableHeadaddShadow">
        <div class="tableHeadContainer">
          <el-form :inline="true">
            <el-form-item label="订单号">
              <el-input clearable v-model="searchInput.orderNumber" placeholder="请输入订单号"></el-input>
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
          <el-table 
            :data="filteredOrderData.slice((Pagination.currentPage-1)*Pagination.pageSize, Pagination.pageSize*Pagination.currentPage)" 
            stripe 
            style="width: 100%" 
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="creationTime" label="创建时间" />
            <el-table-column prop="orderNumber" label="订单号" />
            <el-table-column prop="productName" label="商品名称" />
            <el-table-column prop="unitPrice" label="单价" />
            <el-table-column prop="quantity" label="数量" />
            <el-table-column prop="recipient" label="收货人" />
            <el-table-column prop="totalAmount" label="总金额" />
            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag type="warning" v-if="scope.row.status === '待发货'">待发货</el-tag>
                <el-tag type="success" v-if="scope.row.status === '待收货'">待收货</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button v-if="scope.row.paymentStatus === '待付款'" type="primary" size="small">待付款</el-button>
                <el-button v-else type="success" size="small">已付款</el-button>
              </template>
            </el-table-column>
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
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  
  const searchInput = ref({ orderNumber: '' });
  
  const Dataset = [
    // Add your initial order data here
    {
      creationTime: '2024-09-01 10:00:00',
      orderNumber: '123456789',
      productName: '商品A',
      unitPrice: '￥100.00',
      quantity: 2,
      recipient: '张三',
      totalAmount: '￥200.00',
      status: '待发货',
      paymentStatus: '待付款'
    },
    {
      creationTime: '2024-09-02 14:30:00',
      orderNumber: '987654321',
      productName: '商品B',
      unitPrice: '￥150.00',
      quantity: 1,
      recipient: '李四',
      totalAmount: '￥150.00',
      status: '待收货',
      paymentStatus: '已付款'
    },
    {
  creationTime: '2024-09-03 09:45:00',
  orderNumber: '1122334455',
  productName: '商品C',
  unitPrice: '￥200.00',
  quantity: 3,
  recipient: '王五',
  totalAmount: '￥600.00',
  status: '待发货',
  paymentStatus: '待付款'
},
{
  creationTime: '2024-09-04 11:20:00',
  orderNumber: '9988776655',
  productName: '商品D',
  unitPrice: '￥300.00',
  quantity: 2,
  recipient: '赵六',
  totalAmount: '￥600.00',
  status: '待收货',
  paymentStatus: '已付款'
},
{
  creationTime: '2024-09-05 13:15:00',
  orderNumber: '5566778899',
  productName: '商品E',
  unitPrice: '￥400.00',
  quantity: 1,
  recipient: '孙七',
  totalAmount: '￥400.00',
  status: '待发货',
  paymentStatus: '待付款'
}

    // Add more orders here
  ];
  
  const orderData = ref(Dataset);
  
  const Pagination = ref({
    currentPage: 1,
    pageSize: 10,
    total: orderData.value.length,
  });
  
  const filteredOrderData = computed(() => {
    return orderData.value.filter(
      item => item.orderNumber.includes(searchInput.value.orderNumber)
    );
  });
  
  const handleSizeChange = (val) => {
    Pagination.value.pageSize = val;
  };
  
  const handleCurrentChange = (val) => {
    Pagination.value.currentPage = val;
  };
  
  const handleEdit = (row) => {
    router.push(`/admin/orderInfo/${row.orderNumber}`)
  }
 
  const handleDelete = (row) => {
    const index = orderData.value.findIndex(item => item.orderNumber === row.orderNumber);
    if (index !== -1) {
      orderData.value.splice(index, 1);
      console.log('已删除订单:', row);
    } else {
      console.log('未找到要删除的订单:', row);
    }
  };
  
  const batchDeletion = () => {
    console.log('批量删除:');
  };
  
  const orderSearch = () => {
    console.log('查找订单:');
    handleCurrentChange(1);
    Pagination.value.total = filteredOrderData.value.length;
  };
  
  const addOrder = () => {
    console.log('新增订单');
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
  
  .orderTableContainer {
    padding: 20px;
  }
  
  .orderDetails {
    padding: 20px;
  }
  </style>
  
