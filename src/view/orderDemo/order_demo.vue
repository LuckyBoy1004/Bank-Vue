<template>
    <div>
      <div class="gva-table-box items-center block">
        <div class="shadow-lg inline-flex items-center w-full m-2">
            <img
                class="w-20 m-4"
                :src="$GIN_VUE_ADMIN.appLogo"
                alt
            >
            <span data-v-51f94322="" class="primaryC" style="font-size: 32px;">请选择按照金额下单</span>
        </div>
        <div class="w-11/12 mx-auto mt-4">
            <div class="my-4 p-6">
                <div data-v-51f94322="" class="payTypeTitle">其他支付</div>
                <div class="mx-4 mt-6">
                    <el-button class="mx-4 mt-4">
                        豪支付代付(100 - 100000 ; 10 - 20000)
                    </el-button>
                    <el-button class="mx-4 mt-4">
                        tesr(10 - 1000 ; 10 - 1000 ; 10 - 1000)
                    </el-button>
                    <el-button class="mx-4 mt-4">
                        测试通道(10 - 1000 ; 10 - 1000)
                    </el-button>
                    <el-button class="mx-4 mt-4">
                        测试通道2(10 - 2000 ; 10 - 1000 ; 10 - 1000)
                    </el-button>
                    <el-button class="mx-4 mt-4">
                        fdsjfkdsjf(10 - 1000)
                    </el-button>
                    <el-button class="mx-4 mt-4">
                        豪支付代付(100 - 100000 ; 10 - 20000)
                    </el-button>
                </div>
            </div>
            <div class="border-t border-x-0 border-b-0 border-gray-800 border-solid p-6">
                <div data-v-51f94322="" class="payTypeTitle">其他支付</div>
                <div class="mx-4 mt-6">
                    <div class="inline-flex items-center m-2">
                        <p>
                            订单编号:
                        </p>
                        <p class="ml-8">
                            85738513EABFA1D7
                        </p>
                        <el-button
                            label="刷新订单号"
                            size="small"
                            class="ml-2"
                        >
                            刷新订单号
                        </el-button>
                    </div><br/>
                    <div class="inline-flex items-center m-2">
                        <p>
                            商品名称:
                        </p>
                        <p class="ml-8">
                            充值
                        </p>
                    </div><br/>
                    <div class="inline-flex items-center m-2">
                        <p class="w-full">
                            支付金额(元):
                        </p>
                        <el-input size="small">

                        </el-input>
                    </div><br/>
                    <el-button type="success" class="mt-10 m-2">
                        聚鼎四方系统演示
                    </el-button>
                </div>
            </div>
        </div>
      </div>
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
      margin-inline: 10px;
    }
    .primaryC {
        color: #409eff;
    }
    .payTypeTitle {
        font-size: 20px;
        font-weight: 600;
    }
  </style>
  