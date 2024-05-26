<template>
    <div class="diamond-node" :style="nodeStyle">
      <div class="content">
        <div class="x-mark">
          X
        </div>
        <div class="gateway-label">
          gateway
        </div>
      </div>
    </div>
    <Handle id="a" type="source" :position="Position.Right" />
    <Handle id="b" type="target" :position="Position.Left"  :style="{ left: '-18px'}"/>
    <Handle id="target-top" type="target" :position="Position.Top" :style="{ top: '-18px' }"/>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed, CSSProperties } from 'vue';
  import { Position, Handle } from '@vue-flow/core';
  
  // Определение типов пропсов
  interface NodeProps {
    data: object;
    label: string;
    style: CSSProperties;
  }
  
  // Получение пропсов для кастомной ноды
  const props = defineProps<NodeProps>();
  
  // Определение стилей для ноды в виде ромба
  const defaultStyle: CSSProperties = {
    width: '100px',
    height: '100px',
    transform: 'rotate(45deg)',
    border: '5px solid black',
    textAlign: 'center',
    backgroundColor: '#fff', // Цвет фона ромба
  };
  
  // Объединяем переданные стили и стили по умолчанию
  const nodeStyle = computed(() => ({
    ...defaultStyle,
    ...props.style
  }));
  </script>
  
  <style scoped>
  .diamond-node {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative; /* Добавляем позиционирование */
  }
  
  .content {
    transform: rotate(-45deg); /* Возвращаем содержимое к горизонтальному положению */
  }
  
  .x-mark {
    margin-top: 30px;
    font-size: 100px; /* Размер "x" */
    margin-bottom: 0px; /* Отступ между "x" и надписью */
  }
  
  .gateway-label {
    font-size: 20px; /* Размер текста "gateway" */
    color: #333; /* Цвет текста */
  }
  </style>
  