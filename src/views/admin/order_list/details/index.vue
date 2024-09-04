<template>
    <div>
      <el-form :model="detail" label-width="100px" class="order-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="创建时间">
              <el-input v-model="detail.creationTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单号">
              <el-input v-model="detail.orderNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商品名称">
              <el-input v-model="detail.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价">
              <el-input v-model="detail.unitPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="数量">
              <el-input v-model="detail.quantity"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人">
              <el-input v-model="detail.recipient"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="总金额">
              <el-input v-model="detail.totalAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="detail.status">
                <el-option label="待发货" value="待发货"></el-option>
                <el-option label="待收货" value="待收货"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="操作">
              <el-select v-model="detail.paymentStatus">
                <el-option label="待付款" value="待付款"></el-option>
                <el-option label="已付款" value="已付款"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-form-item>
          <el-button type="primary" @click="saveDetails">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const props = defineProps(['creationTime', 'orderNumber', 'productName', 'unitPrice', 'quantity', 'recipient', 'totalAmount', 'status', 'paymentStatus']);
  const emit = defineEmits(['updateOrder']);
  
  const router = useRouter();
  const route = useRoute();
  
  const detail = ref({ ...route.query }); // Initialize data from route query
  
  const saveDetails = () => {
    emit('updateOrder', detail.value); // Emit event to pass data back to the table page
    router.push('/admin/order_list'); // Return to the order list after saving
  };
  </script>
  
  <style scoped>
  .order-form {
    max-width: 800px;
    margin: 0 auto;
  }
  .el-form-item {
    width: 100%;
  }
  </style>
  