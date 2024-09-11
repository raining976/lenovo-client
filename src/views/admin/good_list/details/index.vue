<template>
    <div class="productDetailContainer">
      <el-form :rules="rules" :model="detail" label-width="100px" class="product-form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="productId" label="商品ID">
              <el-input 
                v-model="detail.productId" 
                ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="商品名称">
              <el-input v-model="detail.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="brief" label="简介">
              <el-input v-model="detail.brief" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="price" label="单价(￥)">
              <el-input-number v-model="detail.price" :precision="2" :step="0.01" controls-position="right"/>
            </el-form-item>
          </el-col>
        </el-row>
  
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="categoryId" label="类别">
              <el-select v-model="detail.categoryId" placeholder="请选择类别">
                <el-option
                  v-for="option in categoryOptions"
                  :key="option.value"
                  :label="option.label"
                  :value="option.value">
                </el-option>
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
  
<script setup>
import { onMounted } from 'vue';

  
  const router = useRouter();  

  const isEdit =ref(true)

  const detail = ref(
    {
      id:'',
      productId: 'test',
      name: 'test',
      brief: '',
      price: 0,
      categoryId:5
    },
  );
  
  const { proxy } = getCurrentInstance()
  const categoryOptions = [
        { label: 'Lenovo电脑', value: 3 },
        { label: 'Lenovo台式机', value: 4 },
        { label: '手机&配件', value: 5 },
        { label: '平板电脑', value: 6 },
        { label: '选件', value: 7 },
        { label: '服务/配件', value: 8 },
        { label: '智能', value: 9 },
        { label: '显示器', value: 10 },
        { label: 'IP周边', value: 11 },
        { label: '未知', value: 0 }
      ]
  
  const rules = {
    productId:[
        { required: true, message: '商品ID不能为空！', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '商品名称不能为空！', trigger: 'blur' }
    ],
    price: [
        { required: true, message: '价格不能为空！', trigger: 'blur' }
    ],
      
  }
  
  const props = defineProps({
    id:String,
  })



  onMounted(()=>{
    if(props.id[0]==='E'){  //编辑
      isEdit.value=true;
      const request = {id:props.id.slice(1)}
      proxy.$api.adminGetProductList(request).then(res=>{
        if(res.code===0){
          detail.value=res.data.records[0]
          detail.value.price=Number((detail.value.price / 100).toFixed(2));
        }
      })
    }
    else{                   //新建
      isEdit.value=false;
    }
    console.log('isEdit:',isEdit.value)
    // 发起请求 根据该id 获取用户详细信息
    // 拿到信息后存到dtail对象
  })
  
  const saveDetails = () => {
    
    
    if(isEdit.value===false){  //新建
      const request={
        productId: detail.value.productId,
        name: detail.value.name,
        brief: detail.value.brief,
        price: detail.value.price,
        categoryId:detail.value.categoryId
      }
      if(
        request.productId===''||
        request.name===''||
        request.price===null
      ){
        return;
      }
      proxy.$api.adminAddNewProduct(request).then(res=>{
        if(res.code===0){
          router.replace('/admin/good_list');
        }
      })
    }
    else{  //修改
      const request={
        id: detail.value.id,
        productId: detail.value.productId,
        name: detail.value.name,
        brief: detail.value.brief,
        price: Math.floor(detail.value.price * 100).toString(),
        categoryId:detail.value.categoryId
      }
      console.log('保存商品详情:', request);
      if(
        request.productId===''||
        request.name===''||
        request.price===null
      ){
        return;
      }
      proxy.$api.adminUpdateProduct(request).then(res=>{
        if(res.code===0){
          router.replace('/admin/good_list');
        }
      })
    }
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
    margin-right: 0px;
  }
</style>
  
