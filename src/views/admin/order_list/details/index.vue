<template>
  <div class="OrderDetailContainer">
    <el-form :model="detail" label-width="100px" class="order-form">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="创建时间">
            <el-input v-model="detail.createdTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="订单状态">
            <el-select v-model="detail.status">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="订单号">
            <el-input v-model="detail.id" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="收货人电话">
            <el-input v-model="detail.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户ID">
            <el-input v-model="detail.userId"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="收货人姓名">
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="支付金额">
            <el-input-number v-model="detail.payment" :precision="2" :step="0.01" controls-position="right"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-col :span="24">
        <el-form-item label="收货地址">
          <el-input v-model="detail.dz" type="textarea" :rows=2></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="商品详情">
          <el-table
            :data="detail.products"
            style="width: 100%"
            :header-cell-style="{'text-align': 'center'}"
            :cell-style="{'text-align': 'center'}"
          >
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="brief" label="简介" />
            <el-table-column prop="price" label="单价(￥)" />
            <el-table-column prop="count" label="数量" />
          </el-table>
        </el-form-item>
      </el-col>
      <el-form-item>
        <el-button type="primary" @click="saveDetails">保存</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const statusOptions = ref([
  { value: 0, label: '调试' },
  { value: 1, label: '待付款' },
  { value: 2, label: '待发货' },
  { value: 3, label: '待收货' },
  { value: 4, label: '已完成' },
])
const router = useRouter();

const props = defineProps({
  id: String,
})
const detail = ref({
  // "id": 26,
  // "userId": 36,
  // "payment": 114900,
  // "status": 2,
  // "expressName": null,
  // "expressNumber": null,
  // "createdTime": "2024-09-10T15:22:18.358+00:00",
  // "paymentTime": null,
  // "consignTime": null,
  // "endTime": null,
  // "name": "lxn",
  // "phone": "18982045613",
  // "dz": "山东省青岛市黄岛区中国海洋大学",
  // "products": [
  //   {
  //     "name": "联想平板小新Pad 2024 舒视版11英寸 学习办公平板电脑 鸽子灰",
  //     "brief": "Qualcomm Snapdragon 685/8核/Android系统/11英寸/8G/128G/WIFI版/鸽子灰",
  //     "count": 1,
  //     "picUrl": "https://p3.lefile.cn/product/adminweb/2024/05/13/VkXsAPt51JKw7VR6J9jc6NhMT-3339.jpg"
  //   }
  // ]
});

onMounted(() => {
  console.log('order id:', props.id)
  proxy.$api.adminSearchOrder({ orderId: props.id, page: 1, limit: 1 }).then(
    res => {
      detail.value = res.data.records[0];
      detail.value.products.forEach(item => {
          // 计算 balance/100
          item.price = (item.price / 100).toFixed(2);
        });
      detail.value.payment=Number((detail.value.payment / 100).toFixed(2));
    }
  )
  // 发起请求 根据该id 获取用户详细信息
  // 拿到信息后存到dtail对象
})

const saveDetails = () => {
  // Emit the details back to the table page or perform other save actions
  console.log('保存订单详情:', detail.value);
  const saveVal = detail.value;
  proxy.$api.adminModifyOrder({
    userId: saveVal.userId,
    id: saveVal.id,
    payment: Math.floor(saveVal.payment * 100),
    create_time: saveVal.createdTime,
    status: saveVal.status,
    name: saveVal.name,
    dz: saveVal.dz,
    phone: saveVal.phone
  })
  router.replace('/admin/order_list');
};
</script>

<style scoped>
  .OrderDetailContainer {
    padding: 20px;
    background-color: #fff;
  }

  .order-form {
    max-width: 800px;
    margin: 0 auto;
  }

  .el-form-item {
    width: 100%;
  }

  .el-form-item .el-button {
    margin-right: 10px;
  }

  .el-form-item .el-input-number{
    width:100%
  }
</style>
