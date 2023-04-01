<template>
    <v-app id="inspire">
  <v-toolbar color="grey-lighten-3" >
    <v-spacer></v-spacer>
    <v-toolbar-title fonts = "Poppins">
        Workflow
    </v-toolbar-title>
    
    <v-divider vertical></v-divider>

    <v-btn
      stacked
      variant="text"
      @click = "openOtherComponent()">
    
      <!-- <svg-icon type="mdi" :path="mdiAccount"></svg-icon> -->

      Вход
    </v-btn>
    
  </v-toolbar>

<div class="my-block">
    <p class="my-text"><maintext>Координируйте выполнение бизнес-процессов с легкостью: познакомьтесь с Workflow</maintext>
      <br>
      <br>
      <br>
      <br>
       <strong>Workflow</strong> — система, координирующая выполнение операций, составляющих бизнес-процессы.
       Рабочие задания получают и обрабатывают сотрудники предприятия (исполнители) с помощью средств информационной системы в рамках настроенных правил выполнения процесса (моделей бизнес-процессов). Бизнес-процесс разбит на серию функций (задач), которые необходимо выполнить в совокупности для реализации цели процесса. Организации имеют множество бизнес-процессов, которые могут быть автоматизированы в рамках системы workflow</p>
  </div>


  <div class="outer-div"><div class="inner-div"> {{ new Date().getFullYear() }} — <strong>Vuetify</strong></div></div>

</v-app>
</template>

<style>
  .my-block {
    width: 1900px; 
    height: 600px; 
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 200px; 
  }
  .my-text {
    line-height: 1.2; /* задаем высоту строки в 1.2 * размер шрифта */
    text-align: center;
    word-wrap: break-word; /* разрешаем перенос слов */
    white-space: pre-wrap; /* сохраняем пробелы и переносы строк */
    font-family: Lato; /* задаем шрифт текста */
    font-size: 18px; /* задаем размер текста в 18 пикселей */
    font-style: italic; /* делаем текст курсивным */
    
  }
  strong {
    font-weight: bold; /* делаем жирную часть текста жирной */
  }
  maintext{
    font-family: Poppins;
    font-weight: bold;
    font-size: 28px;
  }
  .outer-div
  {
     position: absolute;
     bottom: 10px;
     width: 100%;
  }
  .inner-div
  {
     margin: 0 auto;
     width: 150px;
     height: 100px;
  }
</style>

<script  lang="ts">
  import {mdiAccount} from '@mdi/js';
  import { start } from 'repl';
  // import SvgIcon from '@jamescoyle/vue-icon';
  import { defineComponent } from 'vue';
  import { useRoute } from 'vue-router';
  import router from '@/router';
  

  export default defineComponent({
  setup() {
    const route = useRoute();

    const openOtherComponent = () => {
      router.push({ name: 'MainPage' });
      // window.open('https://vuetifyjs.com/en/', '_blank');     При нажатии на кнопку сайт открывает
    };

    return {
      openOtherComponent,
    };
  },
});


</script>

