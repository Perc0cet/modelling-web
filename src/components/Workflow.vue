<template>
  <div class="workflow-container">
    <vue-flow
      :nodes="nodes"
      :edges="edges"
      :fit-view="true"
      class="vue-flow-container"
      ref="vueFlowRef"
      :node-types="nodeTypes"
    />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { VueFlow, MarkerType, Position, Node, Edge, NodeTypesObject, Handle } from '@vue-flow/core';
import '@vue-flow/core/dist/style.css';
import CircleNodeStart from './CircleNodeStart.vue';
import CircleNodeEnd from './CircleNodeEnd.vue';
import GatewayNode from './GatewayNode.vue';
import CircleNodeEvent from './CircleNodeEvent.vue';
import TaskNode from './TaskNode.vue'
import { processNodeStyle } from '../styles/nodeStyles';

// Определение узлов
const nodes = ref<Node[]>([
  {
    id: '1a',
    position: { x: -225, y: -75 },
    type: 'gateway',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '1b',
    position: { x: 105, y: 425 },
    type: 'gateway',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '1c',
    position: { x: 1080, y: -75 },
    type: 'gateway',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '1d',
    position: { x: 1900, y: 190 },
    type: 'gateway',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '2',
    label: 'Создание карточки процесса',
    position: { x: -550, y: -90 },
    targetPosition: Position.Left,
    sourcePosition: Position.Bottom,
    style: processNodeStyle,
  },
  {
    id: '3',
    label: 'Сохранение карточки процесса в системе',
    position: { x: -550, y: 175 },
    targetPosition: Position.Top,
    sourcePosition: Position.Right,
    style: processNodeStyle,
  }, 
  {
    id: '4',
    label: 'Необходимость создания исполняемого процесса возникла',
    position: { x: -725, y: -75 },
    type: 'circleStart',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '5',
    label: 'Создание исполняемого процесса завершено',
    position: { x: 2650, y: -65 },
    type: 'circleEnd',
    targetPosition: Position.Bottom,
  },
  {
    id: '6',
    label: 'Требуется загрузка файла bpmn',
    position: { x: -55, y: -75 },
    type: 'circleEvent',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '7',
    label: 'Проблемы в файле обнаружены',
    position: { x: 440, y: 425 },
    type: 'circleEvent',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '8',
    label: 'Проблемы в файле не обнаружены',
    position: { x: 440, y: 645},
    type: 'circleEvent',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '9',
    label: 'Необходимость редактирования кода операций возникла',
    position: { x: 1360, y: -75 },
    type: 'circleEvent',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '10',
    label: 'Проблемы в коде обнаружены',
    position: { x: 2100, y: 190 },
    type: 'circleEvent',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '11',
    label: 'Проблемы в коде не обнаружены',
    position: { x: 2100, y: 400 },
    type: 'circleEvent',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: '12',
    label: 'Загрузка bpmn файла',
    position: { x: 105, y: -90 },
    targetPosition: Position.Left,
    sourcePosition: Position.Bottom,
    style: processNodeStyle,
  },
  {
    id: '13',
    label: 'Проверка bpmn файла',
    position: { x: 105, y: 190 },
    targetPosition: Position.Top,
    sourcePosition: Position.Bottom,
    style: processNodeStyle,
  },
  {
    id: '14',
    label: 'Сохранение задач в СУБД',
    position: { x: 650, y: 630 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: processNodeStyle,
  },
  {
    id: '15',
    label: 'Корректировка файла bpmn',
    position: { x: 650, y: -75 },
    targetPosition: Position.Bottom,
    sourcePosition: Position.Top,
    style: processNodeStyle,
  },
  {
    id: '16',
    label: 'Отображение списка проблем в файле',
    position: { x: 650, y: 190 },
    targetPosition: Position.Bottom,
    sourcePosition: Position.Top,
    style: processNodeStyle,
  },
  {
    id: '17',
    label: 'Отображение схемы процесса',
    position: { x: 1010, y: 190 },
    targetPosition: Position.Left,
    sourcePosition: Position.Top,
    style: processNodeStyle,
  },
  {
    id: '18',
    label: 'Заполнение кода для операций',
    position: { x: 1550, y: -90 },
    targetPosition: Position.Left,
    sourcePosition: Position.Bottom,
    style: processNodeStyle,
  },
  {
    id: '19',
    label: 'Проверка кода операций',
    position: { x: 1550, y: 175 },
    targetPosition: Position.Top,
    sourcePosition: Position.Right,
    style: processNodeStyle,
  },
  {
    id: '20',
    label: 'Отображение списка проблем в коде',
    position: { x: 2280, y: 175 },
    targetPosition: Position.Left,
    sourcePosition: Position.Top,
    style: processNodeStyle,
  },
  {
    id: '21',
    label: 'Сохранение кода операций в СУБД',
    position: { x: 2280, y: 385 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    style: processNodeStyle,
  },
  {
    id: '22',
    label: 'Информирование о корректном завершении проверок',
    position: { x: 2600, y: 190 },
    targetPosition: Position.Left,
    sourcePosition: Position.Top,
    style: processNodeStyle,
  },
]);

// Определение ребер
const edges = ref<Edge[]>([
  { id: 'e1-2', source: '4', target: '2', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-3', source: '2', target: '3', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '3', target: '1a', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '1a', target: '6', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-33', source: '6', target: '12', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '12', target: '13', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '13', target: '1b', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-33', source: '1b', target: '7', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '1b', target: '8', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '7', target: '16', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-33', source: '8', target: '14', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '16', target: '15', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '15', target: '1a', targetHandle: 'target-top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-3', source: '14', target: '17', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '17', target: '1c', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '1c', target: '9', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-3', source: '9', target: '18', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '18', target: '19', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '19',  target: '1d', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-3', source: '1d', target: '10', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '1d', target: '11', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '10', target: '20', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-3', source: '20', target: '1c', targetHandle: 'target-top', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e4-1', source: '11', target: '21', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e1-2', source: '21', target: '22', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } },
  { id: 'e2-3', source: '22', target: '5', type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20 }, style: { strokeWidth: 2, stroke: 'black' } }
]);

// Определение типов нод
const nodeTypes: NodeTypesObject = {
  circleStart: CircleNodeStart as NodeTypesObject,
  circleEnd: CircleNodeEnd as NodeTypesObject,
  circleEvent: CircleNodeEvent as NodeTypesObject,
  gateway: GatewayNode as NodeTypesObject,
  task: TaskNode as NodeTypesObject
};

const vueFlowRef = ref<InstanceType<typeof VueFlow> | null>(null);

onMounted(() => {
  if (vueFlowRef.value) {

    vueFlowRef.value.zoomTo(0); // Пример масштаба
  }
});
</script>

<style scoped>
.workflow-container {
  width: 100%;
  height: 100vh;
}

.vue-flow-container {
  width: 100%;
  height: 100%;
}
</style>
