<template>
    <div class="outer-circle" :style="outerCircleStyle">
      <div class="inner-circle" :style="innerCircleStyle">
        <span class="label-text">{{ label }}</span>
      </div>
      <Handle id="a" type="source" :position="Position.Right"/>
      <Handle id="b" type="target" :position="Position.Left"/>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, computed, CSSProperties } from 'vue';
  import { Position, Handle } from '@vue-flow/core';
  
  // Определение типов пропсов
  interface NodeProps {
    label: string;
    style: CSSProperties;
  }
  
  // Получение пропсов для кастомной ноды
  const props = defineProps<NodeProps>();
  
  // Определение стилей для внешнего круга
  const outerCircleStyle: CSSProperties = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: '3px solid orange',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: 'relative',
    textAlign: 'center',
    lineHeight: 'normal',
  };
  
  // Определение стилей для внутреннего круга
  const innerCircleStyle: CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '3px solid orange',
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
    ...outerCircleStyle,
    ...props.style
  }));
  </script>
  
  <style scoped>
  .outer-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  
  .inner-circle {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .label-text {
    font-size: 20px; /* Размер текста */
    margin-top: 200px;
  }
  </style>
  