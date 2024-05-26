<template>
  <div class="circle-node" :style="nodeStyle">
    <span class="label-text">{{ label }}</span>
  </div>
  <Handle id="a" type="source" :position="Position.Right"/>
  <Handle id="b" type="target" :position="Position.Left"/>
</template>

<script lang="ts" setup>
import { defineProps, computed, CSSProperties } from 'vue';
import { Position, Handle } from '@vue-flow/core';
import { relative } from 'path';

// Определение типов пропсов
interface NodeProps {
  label: string;
  style: CSSProperties;
}

// Получение пропсов для кастомной ноды
const props = defineProps<NodeProps>();

// Определение стилей для кастомной ноды
const defaultStyle: CSSProperties = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  border: '3px solid green',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  textAlign: 'center',
  lineHeight: 'normal',
  fontWeight: 'bold',
};

// Объединяем переданные стили и стили по умолчанию
const nodeStyle = computed(() => ({
  ...defaultStyle,
  ...props.style
}));
</script>

<style scoped>
.circle-node {
  font-size: 20px; /* Размер текста */
  
}
.label-text {
  margin-top: 210px; /* Смещаем текст вниз */
}
</style>
