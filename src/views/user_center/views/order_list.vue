<template>
  <div class="ordersContainer" >
    <el-table :data="orderList" stripe style="width: 100%;height: calc(100% - 93px);">
      <el-table-column label="订单id" prop="id" width="80px"></el-table-column>
      <el-table-column label="订单状态" prop="status" width="80px">
        <template #default="scope">
          <el-tag :type="orderStatus[scope.row.status-1].type">{{ orderStatus[scope.row.status-1].label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="商品详情" width="380">
        <template #default="scope">
          <div class="goodContainer">
            <li class="good" v-for="(good, index) in scope.row.items" :key="index">
              <div class="imgBox">
                <img :src="good.picUrl" alt="">
              </div>
              <div class="contentBox">
                <div class="name">{{ good.name }}</div>
                <div class="brief">{{ good.brief }}</div>
              </div>
              <div class="countBox">x{{ good.count }}</div>
            </li>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" prop="createdTime" width="200">
        <template #default="scope">
          {{ handlerDate(scope.row.createdTime) }}
        </template>
      </el-table-column>
      <el-table-column label="支付金额" prop="payment">
        <template #default="scope">
          ¥ {{(scope.row.payment / 100).toFixed(2) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
           <el-button color="#626aef" plain @click="toOrderInfo(scope.row.id)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pageContainer">
      <el-pagination background layout="prev, pager, next" :page-size="pageSize" :current-page="currentPage"
        :total="total" @current-change="curPageChange" />
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "@/store"
import router from "@/router"
const { proxy } = getCurrentInstance();
const userStore = useUserStore()
const pageSize = ref(6)
const currentPage = ref(1)
const pages = ref(1)
const total = ref(0)
const orderList = ref([])

const orderStatus = ref([
  {
    type:'primary',
    label:"待支付"
  },
  {
    type:'warning',
    label:'待发货',
  },
  {
    type:'success',
    label:'待收货'
  },
  {
    type:'info',
    label:'已完成'
  }
])


onMounted(() => {
  updateOrders()
})

const handlerDate = (isoDate) => {
  const offsetDate = new Date(isoDate);

  // 格式化日期
  const formattedDate = offsetDate.getFullYear() + '-' +
    ('0' + (offsetDate.getMonth() + 1)).slice(-2) + '-' +
    ('0' + offsetDate.getDate()).slice(-2) + ' ' +
    ('0' + offsetDate.getHours()).slice(-2) + ':' +
    ('0' + offsetDate.getMinutes()).slice(-2) + ':' +
    ('0' + offsetDate.getSeconds()).slice(-2);
  return formattedDate;
}

const updateOrders = () => {
  const form = {
    userId: userStore.userInfo.id,
    limit: pageSize.value || 16,
    page: currentPage.value || 1
  }

  proxy.$api.getOrders(form).then(res => {
    console.log('res.data', res.data)
    if (res.code == 0) {
      total.value = parseInt(res.data.total)
      orderList.value = res.data.records
      pages.value = parseInt(res.data.pages)
    }
  })
}

const curPageChange = (v) => {
  currentPage.value = v
  updateOrders()
}


const toOrderInfo=(id)=>{
  console.log('id',id)
  router.push(`/order_info/${id}`)

}

</script>
<style scoped lang="scss">
.ordersContainer{
  height: 100%;
}
.goodContainer {
  .good {
    display: flex;
    align-items: center;
    .countBox{
      font-size: 12px;
    }
  }

  .imgBox {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 60px;
      height: 60px;
    }
  }


  .contentBox {
    padding: 10px;

    .name {
      width: 250px;
      color: #000;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .brief {
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      font-size: 10px;
      color: #999;
    }
  }

}

.pageContainer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>