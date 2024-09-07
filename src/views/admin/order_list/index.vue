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
            @selection-change="handleSelectionChange"
            :data="orderData" 
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
  import { Search, CirclePlus, Delete } from '@element-plus/icons-vue';
  
  const router = useRouter();

  const { proxy } = getCurrentInstance()
  const searchInput = ref({ orderNumber: '' });
  
  const Dataset = [  //假数据，测试使用
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
    },
    {
      creationTime: '2024-09-06 10:20:30',
      orderNumber: '5566779900',
      productName: '商品F',
      unitPrice: '￥250.00',
      quantity: 2,
      recipient: '李四',
      totalAmount: '￥500.00',
      status: '已发货',
      paymentStatus: '已付款'
    },
    {
      creationTime: '2024-09-07 15:45:10',
      orderNumber: '5566780011',
      productName: '商品G',
      unitPrice: '￥150.00',
      quantity: 3,
      recipient: '王五',
      totalAmount: '￥450.00',
      status: '待发货',
      paymentStatus: '待付款'
    },
    {
      creationTime: '2024-09-08 09:00:00',
      orderNumber: '5566781122',
      productName: '商品H',
      unitPrice: '￥600.00',
      quantity: 1,
      recipient: '赵六',
      totalAmount: '￥600.00',
      status: '已完成',
      paymentStatus: '已付款'
    },
    {
      creationTime: '2024-09-09 12:30:45',
      orderNumber: '5566782233',
      productName: '商品I',
      unitPrice: '￥300.00',
      quantity: 4,
      recipient: '钱七',
      totalAmount: '￥1200.00',
      status: '待发货',
      paymentStatus: '待付款'
    },
    {
      creationTime: '2024-09-10 14:25:20',
      orderNumber: '5566783344',
      productName: '商品J',
      unitPrice: '￥120.00',
      quantity: 5,
      recipient: '孙八',
      totalAmount: '￥600.00',
      status: '已发货',
      paymentStatus: '已付款'
    },
    {
      creationTime: '2024-09-11 08:35:50',
      orderNumber: '5566784455',
      productName: '商品K',
      unitPrice: '￥220.00',
      quantity: 2,
      recipient: '刘九',
      totalAmount: '￥440.00',
      status: '待发货',
      paymentStatus: '待付款'
    },
    {
      creationTime: '2024-09-12 16:50:10',
      orderNumber: '5566785566',
      productName: '商品L',
      unitPrice: '￥180.00',
      quantity: 1,
      recipient: '陈十',
      totalAmount: '￥180.00',
      status: '已发货',
      paymentStatus: '已付款'
    },
    {
      creationTime: '2024-09-13 11:15:00',
      orderNumber: '5566786677',
      productName: '商品M',
      unitPrice: '￥500.00',
      quantity: 3,
      recipient: '周十一',
      totalAmount: '￥1500.00',
      status: '已完成',
      paymentStatus: '已付款'
    },
    {
      creationTime: '2024-09-14 13:00:25',
      orderNumber: '5566787788',
      productName: '商品N',
      unitPrice: '￥350.00',
      quantity: 2,
      recipient: '吴十二',
      totalAmount: '￥700.00',
      status: '待发货',
      paymentStatus: '待付款'
    },
    {
      creationTime: '2024-09-15 17:40:30',
      orderNumber: '5566788899',
      productName: '商品O',
      unitPrice: '￥280.00',
      quantity: 4,
      recipient: '郑十三',
      totalAmount: '￥1120.00',
      status: '已发货',
      paymentStatus: '已付款'
    }

    // Add more orders here
  ];

  const getDataLength=()=>{  //向后端请求获取数据的总数
    return Dataset.length;
  }
  
  
  const Pagination= ref({  //分页器
    currentPage: 1, // 当前页
    pageSize: 10, // 每页显示条数
    total: getDataLength(), // 总条数
  })
  
  const getData=(currentpage,pagesize) => { //向后端请求数据
    try {
      // 发送 GET 请求
  //      const response = await axios.get(endpoint);
      // 返回响应数据
  //      return response.data;
      console.log("getdata");
      return Dataset.slice((currentpage - 1) * pagesize, currentpage * pagesize)
    } catch (error) {
      // 捕获和处理错误
      console.error('请求数据失败:', error);
      throw error; // 重新抛出错误以便调用者处理
    }
  }
  const orderData = ref(getData(Pagination.value.currentPage,Pagination.value.pageSize));

  
  
  const handleSizeChange = (val) => { //页数改变时
    Pagination.value.pageSize=val;
    Pagination.value.currentPage=1;
    orderData.value=getData(1,val);
  }
                   
  const handleCurrentChange = (val) => { //当前页数改变时
    Pagination.value.currentPage=val
    orderData.value=getData(val,Pagination.value.pageSize);
  }
  
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
  
  
  const orderSearch = () => {  //向后端查找并渲染
    console.log('查找订单:');
  };
  
  const addOrder = () => {
    console.log('新增订单');
    const newOrder={
      creationTime: '2024-09-05 13:15:00',
      orderNumber: '5566778899',
      productName: '商品E',
      unitPrice: '￥400.00',
      quantity: 1,
      recipient: '孙七',
      totalAmount: '￥400.00',
      status: '待发货',
      paymentStatus: '待付款'
    };
    router.push(`/admin/orderInfo/${newOrder.orderNumber}`)
  };

  //选择+批量删除
  const selectedRows=ref([])

  const handleSelectionChange=(val)=>{
    selectedRows.value=val;
  }

  const delSingleOrder = async (id) =>{
    const form = {
      id,
    }
    const res =  await proxy.$api.adminDelSingleOrder(form)
    if(res.code == 0){
      // updateCurrentList
    }
    
  }


  const batchDeletion= async()=>{
    if (selectedRows.value.length === 0) {
      alert('请先选择要删除的项');
      return;
    }

    // 获取要删除的项
    const idsToDelete = selectedRows.value.map(row => row.orderNumber);
    console.log(idsToDelete)

    try {
      // 发起删除请求
    //  await axios.post('/api/delete-items', { ids: idsToDelete });
      console.log('删除成功');

      // 从表格数据中移除已删除的项
  //     tableData.value = tableData.value.filter(
  //       item => !idsToDelete.includes(item.id)
  //     );
  // //    tableData.value = getData(1,Pagination.value.pageSize);
  //     //改变分页器总数
  //     Pagination.value.total -= idsToDelete.length
  //     // 清空选中的行
  //     selectedRows.value = [];
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
  
