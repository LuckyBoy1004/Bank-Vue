<template>
  <div>
    <el-row
      :gutter="15"
      class="py-1"
    >
      <el-col :span="8">
        <el-card
          v-if="state.disk"
          class="card_item"
        >
          <template #header>
            <div>今日交易金额</div>
          </template>
          <div>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-row :gutter="10">
                  <el-col :span="2">收：</el-col>
                  <el-col :span="2">￥0</el-col>
                  <el-col :span="4">共0笔</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="2">付：</el-col>
                  <el-col :span="2">￥0</el-col>
                  <el-col :span="4">共0笔</el-col>
                </el-row>
                <el-row :gutter="5">
                  <el-col :span="24">
                    <echarts-line />
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="12">昨日:(收)￥0/(付)￥0</el-col>
                  <el-col :span="12">七日:(收)￥0/(付)￥300</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="15">
          <el-col :span="12">
            <el-card
              v-if="state.disk"
              class="card_item_small"
            >
              <template #header>
                <div>交易总金额</div>
              </template>
              <div>
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-row :gutter="24">
                      <el-col :span="4">收：</el-col>
                      <el-col :span="4">￥3338.26</el-col>
                    </el-row>
                    <el-row :gutter="24">
                      <el-col :span="4">付：</el-col>
                      <el-col :span="4">￥10100</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card
              v-if="state.disk"
              class="card_item_small"
            >
              <template #header>
                <div>交易总金额</div>
              </template>
              <div>
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-row :gutter="24">
                      <el-col :span="4">收：</el-col>
                      <el-col :span="4">￥3338.26</el-col>
                    </el-row>
                    <el-row :gutter="24">
                      <el-col :span="4">付：</el-col>
                      <el-col :span="4">￥10100</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="12">
            <el-card
              v-if="state.disk"
              class="card_item_small"
            >
              <template #header>
                <div>交易总金额</div>
              </template>
              <div>
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-row :gutter="24">
                      <el-col :span="4">收：</el-col>
                      <el-col :span="4">￥3338.26</el-col>
                    </el-row>
                    <el-row :gutter="24">
                      <el-col :span="4">付：</el-col>
                      <el-col :span="4">￥10100</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card
              v-if="state.disk"
              class="card_item_small"
            >
              <template #header>
                <div>交易总金额</div>
              </template>
              <div>
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-row :gutter="24">
                      <el-col :span="4">收：</el-col>
                      <el-col :span="4">￥3338.26</el-col>
                    </el-row>
                    <el-row :gutter="24">
                      <el-col :span="4">付：</el-col>
                      <el-col :span="4">￥10100</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="8">
        <el-card
          v-if="state.disk"
          class="card_item"
        >
          
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="15"
      class="py-1"
    >
      <el-col :span="12">
        <el-card
          v-if="state.cpu"
          class="card_item"
          :body-style="{ height: '180px', 'overflow-y': 'scroll' }"
        >
          <template #header>
            <div>交易统计</div>
          </template>
          <div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card
          v-if="state.ram"
          class="card_item"
        >
          <template #header>
            <div>支付方式</div>
          </template>
          <div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getSystemState } from '@/api/system'
import { onUnmounted, ref } from 'vue'
import EchartsLine from '@/view/home/dashboardCharts/echartsLine.vue'

defineOptions({
  name: 'Home',
})

const timer = ref(null)
const state = ref({})
const colors = ref([
  { color: '#5cb87a', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#f56c6c', percentage: 80 }
])

const reload = async() => {
  const { data } = await getSystemState()
  state.value = data.server
}

reload()
timer.value = setInterval(() => {
  reload()
}, 1000 * 10)

onUnmounted(() => {
  clearInterval(timer.value)
  timer.value = null
})

</script>

<style>

.card_item {
  @apply h-80 text-xl;
}
.card_item_small {
  @apply h-40 text-xl;
}
</style>
