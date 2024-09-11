<template>
    <div class="productDetailContainer">
      <el-form :model="detail" label-width="100px" class="product-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商品ID">
              <el-input v-model="detail.productId" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品名称">
              <el-input v-model="detail.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="简介">
              <el-input v-model="detail.description" type="textarea" :rows="4"></el-input>
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
            <el-form-item label="库存数量">
              <el-input v-model="detail.stockQuantity" type="number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-form-item>
          <el-button type="primary" @click="saveDetails">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  
  const detail = ref({
    productId: '',
    productName: '',
    description: '',
    unitPrice: '',
    stockQuantity: ''
  });
  
  const props = defineProps({
    id:String,
  })

  onMounted(()=>{
    console.log('goods id:',props.id)
    // 发起请求 根据该id 获取用户详细信息
    // 拿到信息后存到dtail对象
  })
  
  const saveDetails = () => {

  console.log('保存商品详情:', detail.value);
  const saveVal = detail.value;

  if(saveVal.productId === ''){
    alert('商品ID不能为空');
    return;
  }
  else if(saveVal.productName === ''){
    alert('商品名称不能为空');
    return;
  }
  else if(saveVal.description === ''){
    alert('商品描述不能为空');
    return;
  }
  else if(saveVal.unitPrice === ''){
    alert('单价不能为空');
    return;
  }
  else if(saveVal.stockQuantity === ''){
    alert('库存数量不能为空');
    return;
  }
    console.log('保存商品详情:', detail.value);
    router.replace('/admin/good_list'); // Return to the product list after saving
  };
 
</script>
  
<style scoped>
  .productDetailContainer {
    padding: 20px;
    background-color: #fff;
  }
  
  .product-form {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .el-form-item {
    margin-bottom: 20px;
  }
  
  .el-button {
    margin-right: 10px;
  }
</style>
  
