<template>
    <div class="task-node" :style="nodeStyle">
      <span class="label-text">{{ label }}</span>
    </div>
    <Handle id="e2-3" type="source" :position="Position.Bottom"/>
    <Handle id="e2-3" type="target" :position="Position.Left"/>
    <Handle id="e4-1" type="source" :position="Position.Right"/>
    <Handle id="e4-1" type="target" :position="Position.Right"/>
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
    width: '250px',
    height: '130px',
    border: '3px solid blue',
    display: 'flex',
    borderRadius: '5%',
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
  .task-node {
    font-size: 22px; /* Размер текста */
  }
  </style>
  