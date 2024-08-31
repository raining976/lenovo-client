<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column prop="accounts" label="账号"  />
    <el-table-column prop="name" label="昵称"  />
    <el-table-column prop="sex" label="性别"  />
    <el-table-column prop="balance" label="余额" />
    <el-table-column label="操作">

      <template #default="scope">
        <el-button @click="handleEdit(scope.row)" type="primary" size="small">修改</el-button>
        <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
const router=useRouter();
const tableData = [
  {
    accounts: '1575664@qq.com',
    name: 'Tom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    accounts: '1575664@qq.com',
    name: 'com',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    accounts: '1575664@qq.com',
    name: 'bom',
    sex: '1',
    balance: '￥1000.00'
  },
  {
    accounts: '1575664@qq.com',
    name: 'aom',
    sex: '1',
    balance: '￥1000.00'
  },
]

const handleEdit = (row: any) => {
  router.push({ 
    path: '/admin/user_list/${row.id}', 
    query: { ...row }  // 将数据作为查询参数传递
  })
}
const handleDelete = (row: any) => {
  console.log('删除:', row)
  // 删除逻辑
}
</script>
