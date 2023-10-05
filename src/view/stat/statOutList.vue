<template>
    <div>
      <div class="gva-table-box">
        <el-col class="total_info">
            <div class="flex flex-wrap">
                <TotalInfo
                  title="发起总额"
                  info="￥0.00"
                />
                <TotalInfo
                  title="成交金额"
                  info="￥0.00"
                />
                <TotalInfo
                  title="成功订单数"
                  info="0.00"
                />
            </div>
        </el-col>
        <div class="gva-btn-list">
          <el-col :gutter="10" :span="24">
            <el-row :gutter="10" :span="24">
              <el-form-item>
                <el-date-picker
                  class="header_input"
                  v-model="value1"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :size="size"
                />
              </el-form-item>
              <el-form-item label="商户筛选">
                <el-select
                  class="header_input"
                  placeholder="商户序号/商户名"
                />
              </el-form-item>
              <el-button
                type="primary"
              >查询</el-button>
              <el-button
                type="primary"
              >重置</el-button>
              <el-button
                type="success"
              >归总</el-button>
              <el-button
                type="success"
              >导出Excel</el-button>
            </el-row>
          </el-col>
          
        </div>
        <el-table
          :data="tableData"
          row-key="ID"
        >
          <el-table-column
            align="left"
            label="日期"
            min-width="100"
            prop="nickName"
          />
          <el-table-column
            align="left"
            label="商户昵称"
            min-width="100"
            prop="phone"
          />
          <el-table-column
            align="left"
            label="成交金额"
            min-width="150"
            prop="nickName"
          />
          <el-table-column
            align="left"
            label="成功订单数"
            min-width="150"
            prop="nickName"
          />
          <el-table-column
            align="left"
            label="手续费"
            min-width="150"
            prop="nickName"
          />
        </el-table>
        <div class="gva-pagination">
          <el-pagination
            :current-page="page"
            :page-size="pageSize"
            :page-sizes="[10, 30, 50, 100]"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
      </div>
      <el-dialog
        v-model="addUserDialog"
        title="用户"
        :show-close="false"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div style="height:60vh;overflow:auto;padding:0 12px;">
          <el-form
            ref="userForm"
            :rules="rules"
            :model="userInfo"
            label-width="120px"
          >
            <el-form-item
              v-if="dialogFlag === 'add'"
              label="用户名"
              prop="userName"
            >
              <el-input v-model="userInfo.userName" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item
              label="昵称"
              prop="nickName"
            >
              <el-input v-model="userInfo.nickName" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item
              label="tg联系方式"
              prop="phone"
            >
              <el-input v-model="userInfo.phone" placeholder="请输入tg联系方式" />
            </el-form-item>
            
            <el-form-item
              label="Skype联系方式"
              prop="phone"
            >
              <el-input v-model="userInfo.phone" placeholder="请输入Skype联系方式" />
            </el-form-item>
            
            <el-form-item
              label="其他联系方式"
              prop="phone"
            >
              <el-input v-model="userInfo.phone" placeholder="请输入其他联系方式" />
            </el-form-item>
            <el-form-item
              v-if="dialogFlag === 'add'"
              label="密码"
              prop="password"
            >
              <el-input v-model="userInfo.password" placeholder="请输入密码" />
            </el-form-item>         
            <el-form-item
              label="头像"
              label-width="120px"
            >
              <div
                style="display:inline-block"
                @click="openHeaderChange"
              >
                <img
                  v-if="userInfo.headerImg"
                  alt="头像"
                  class="header-img-box"
                  :src="(userInfo.headerImg && userInfo.headerImg.slice(0, 4) !== 'http')?path+userInfo.headerImg:userInfo.headerImg"
                >
                <div
                  v-else
                  class="header-img-box"
                >从媒体库选择</div>
              </div>
            </el-form-item>
  
          </el-form>
  
        </div>
  
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="closeAddUserDialog">取 消</el-button>
            <el-button
              type="primary"
              @click="enterAddUserDialog"
            >确 定</el-button>
          </div>
        </template>
      </el-dialog>
      <ChooseImg
        ref="chooseImg"
        :target="userInfo"
        :target-key="`headerImg`"
      />
    </div>
  </template>
  
  
  <script setup>
  
  import {
    getUserList,
    setUserAuthorities,
    register,
    deleteUser
  } from '@/api/user'
  
  import { getAuthorityList } from '@/api/authority'
  import CustomPic from '@/components/customPic/index.vue'
  import ChooseImg from '@/components/chooseImg/index.vue'
  import WarningBar from '@/components/warningBar/warningBar.vue'
  import { setUserInfo, resetPassword } from '@/api/user.js'
  
  import { nextTick, ref, watch } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import TotalInfo from '@/components/totalInfo/totalInfo.vue'
  
  defineOptions({
    name: 'User',
  })
  
  const path = ref(import.meta.env.VITE_BASE_API + '/')
  // 初始化相关
  const setAuthorityOptions = (AuthorityData, optionsData) => {
    AuthorityData &&
          AuthorityData.forEach(item => {
            if (item.children && item.children.length) {
              const option = {
                authorityId: item.authorityId,
                authorityName: item.authorityName,
                children: []
              }
              setAuthorityOptions(item.children, option.children)
              optionsData.push(option)
            } else {
              const option = {
                authorityId: item.authorityId,
                authorityName: item.authorityName
              }
              optionsData.push(option)
            }
          })
  }
  
  const page = ref(1)
  const total = ref(0)
  const pageSize = ref(10)
  const tableData = ref([])
  // 分页
  const handleSizeChange = (val) => {
    pageSize.value = val
    getTableData()
  }
  
  const handleCurrentChange = (val) => {
    page.value = val
    getTableData()
  }
  
  // 查询
  const getTableData = async() => {
    const table = await getUserList({ page: page.value, pageSize: pageSize.value })
    if (table.code === 0) {
      tableData.value = table.data.list
      total.value = table.data.total
      page.value = table.data.page
      pageSize.value = table.data.pageSize
    }
  }
  
  watch(() => tableData.value, () => {
    setAuthorityIds()
  })
  
  const initPage = async() => {
    getTableData()
    const res = await getAuthorityList({ page: 1, pageSize: 999 })
    setOptions(res.data.list)
  }
  
  initPage()
  
  const resetPasswordFunc = (row) => {
    ElMessageBox.confirm(
      '是否将此用户密码重置为123456?',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(async() => {
      const res = await resetPassword({
        ID: row.ID,
      })
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: res.msg,
        })
      } else {
        ElMessage({
          type: 'error',
          message: res.msg,
        })
      }
    })
  }
  const setAuthorityIds = () => {
    tableData.value && tableData.value.forEach((user) => {
      user.authorityIds = user.authorities && user.authorities.map(i => {
        return i.authorityId
      })
    })
  }
  
  const chooseImg = ref(null)
  const openHeaderChange = () => {
    chooseImg.value.open()
  }
  
  const authOptions = ref([])
  const setOptions = (authData) => {
    authOptions.value = []
    setAuthorityOptions(authData, authOptions.value)
  }
  
  const deleteUserFunc = async(row) => {
    const res = await deleteUser({ id: row.ID })
    if (res.code === 0) {
      ElMessage.success('删除成功')
      row.visible = false
      await getTableData()
    }
  }
  
  // 弹窗相关
  const userInfo = ref({
    username: '',
    password: '',
    nickName: '',
    headerImg: '',
    authorityId: '',
    authorityIds: [],
    enable: 1,
  })
  
  const rules = ref({
    userName: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 5, message: '最低5位字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入用户密码', trigger: 'blur' },
      { min: 6, message: '最低6位字符', trigger: 'blur' }
    ],
    nickName: [
      { required: true, message: '请输入用户昵称', trigger: 'blur' }
    ],
    phone: [
      { pattern: /^1([38][0-9]|4[014-9]|[59][0-35-9]|6[2567]|7[0-8])\d{8}$/, message: '请输入合法手机号', trigger: 'blur' },
    ],
    email: [
      { pattern: /^([0-9A-Za-z\-_.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g, message: '请输入正确的邮箱', trigger: 'blur' },
    ],
    authorityId: [
      { required: true, message: '请选择用户角色', trigger: 'blur' }
    ]
  })
  const userForm = ref(null)
  const enterAddUserDialog = async() => {
    userInfo.value.authorityId = userInfo.value.authorityIds[0]
    userForm.value.validate(async valid => {
      if (valid) {
        const req = {
          ...userInfo.value
        }
        if (dialogFlag.value === 'add') {
          const res = await register(req)
          if (res.code === 0) {
            ElMessage({ type: 'success', message: '创建成功' })
            await getTableData()
            closeAddUserDialog()
          }
        }
        if (dialogFlag.value === 'edit') {
          const res = await setUserInfo(req)
          if (res.code === 0) {
            ElMessage({ type: 'success', message: '编辑成功' })
            await getTableData()
            closeAddUserDialog()
          }
        }
      }
    })
  }
  
  const addUserDialog = ref(false)
  const closeAddUserDialog = () => {
    userForm.value.resetFields()
    userInfo.value.headerImg = ''
    userInfo.value.authorityIds = []
    addUserDialog.value = false
  }
  
  const dialogFlag = ref('add')
  
  const addUser = () => {
    dialogFlag.value = 'add'
    addUserDialog.value = true
  }
  
  const tempAuth = {}
  const changeAuthority = async(row, flag, removeAuth) => {
    if (flag) {
      if (!removeAuth) {
        tempAuth[row.ID] = [...row.authorityIds]
      }
      return
    }
    await nextTick()
    const res = await setUserAuthorities({
      ID: row.ID,
      authorityIds: row.authorityIds
    })
    if (res.code === 0) {
      ElMessage({ type: 'success', message: '角色设置成功' })
    } else {
      if (!removeAuth) {
        row.authorityIds = [...tempAuth[row.ID]]
        delete tempAuth[row.ID]
      } else {
        row.authorityIds = [removeAuth, ...row.authorityIds]
      }
    }
  }
  
  const openEdit = (row) => {
    dialogFlag.value = 'edit'
    userInfo.value = JSON.parse(JSON.stringify(row))
    addUserDialog.value = true
  }
  
  const switchEnable = async(row) => {
    userInfo.value = JSON.parse(JSON.stringify(row))
    await nextTick()
    const req = {
      ...userInfo.value
    }
    const res = await setUserInfo(req)
    if (res.code === 0) {
      ElMessage({ type: 'success', message: `${req.enable === 2 ? '禁用' : '启用'}成功` })
      await getTableData()
      userInfo.value.headerImg = ''
      userInfo.value.authorityIds = []
    }
  }
  
  </script>
  
  <style lang="scss">
    .header-img-box {
      @apply w-52 h-52 border border-solid border-gray-300 rounded-xl flex justify-center items-center cursor-pointer;
    }
    .header_input {
      margin-right: 20px;
    }
    .total_info {
      margin-bottom: 40px;
    }
  </style>
  