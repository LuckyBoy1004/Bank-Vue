<template>
    <div
      class="info-box-static p-8 flex items-top rounded w-full flex-1 shadow-md mb-3 mr-3"
      :class="href&&'cursor-pointer'"
    >
        <div>
            <div class="mb-3">
                <span class="text-xl">
                    {{ title }}
                </span>
            </div>
            <div>
                <span class="text-3xl font-bold">
                    {{ info }}
                </span>
            </div>
        </div>
        <el-icon class="text-xl ml-auto">
            <warning-filled />
        </el-icon>
    </div>
  </template>
  <script setup>
  import { WarningFilled } from '@element-plus/icons-vue'
  const prop = defineProps({
    title: {
      type: String,
      default: ''
    },
    info: {
      type: String,
      default: ''
    }
  })
  </script>

  <style>
    .info-box-static {
        background-color: #ffeefc;
        min-width: 280px;
    }
  </style>
  