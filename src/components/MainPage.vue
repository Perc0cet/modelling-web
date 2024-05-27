<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="showSidebar" color="grey-lighten-3">
      <!-- Список элементов в боковой панели -->
      <v-list>
        <!-- Заголовок списка -->
        <v-list-item>
          <v-list-item-title class="mt-4" fonts="Poppins">Текущие БП</v-list-item-title>
        </v-list-item>
        <!-- Область прокрутки для списка текущих БП -->
        <v-scroll-y>
          <v-card class="mp" max-width="150" max-height="300" align-self="flex-end">
            <!-- Список текущих бизнес-процессов -->
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="item.id"
                :class="{ 'selected-item': index === selectedItemIndex }"
                @click="selectItem(index)"
              >
                <v-tooltip top>
                  <template v-slot:activator="{ props }">
                    <v-list-item-content v-bind="props" v-on="props">
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                  <span>{{ item.name }}</span>
                </v-tooltip>
              </v-list-item>
            </v-list>
          </v-card>
        </v-scroll-y>
        <!-- Кнопка для загрузки нового файла -->
        <v-list-item class="mt-auto">
          <v-btn @click="openFilePicker" class="fixedBottom" size="small" variant="tonal" append-icon="mdi-file-upload">
            Загрузить файл
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="0" color="grey-lighten-3">
      <v-app-bar-nav-icon @click="funShowSidebar" />
      <v-spacer></v-spacer>
      <v-toolbar-title fonts="Poppins">Workflow</v-toolbar-title>
      <v-btn rounded="xl" size="small" class="my-button1" variant="tonal">
        Юзернейм
      </v-btn>
      <v-btn icon stacked class="my-button2">
        <v-icon>mdi-logout</v-icon>
        Выход
      </v-btn>
    </v-app-bar>

    <v-app-bar app v-show="showAppBar" elevation="0" color="grey-lighten-3" class="app-bar-border">
      <v-btn text size="small" class="my-button4" @click="dialog = true" :disabled="isDisabled1">Настройка запуска БП</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title v-if="selectedItem">{{ selectedItem.name }}</v-toolbar-title>
      <v-btn text size="small" class="my-button3" :disabled="isDisabled1">Список экземпляров</v-btn>
      <v-btn text size="small" class="my-button3" @click="selectButtonToChange">Изменить</v-btn>
      <v-btn text size="small" class="my-button5" @click="deleteScheme()"><span>Удалить схему</span></v-btn>
    </v-app-bar>

    <v-dialog v-model="dialog" persistent width="500">
      <!-- Карточка с заголовком диалогового окна -->
      <v-card>
        <v-card-title>
          <!-- Заголовок диалогового окна -->
          <titleSettings class="text-h5">Настройка запуска БП</titleSettings>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Выпадающий список для выбора периода запуска бизнес-процесса -->
              <v-select
                :items="['отсутствует', '1 час', '2 часа', '8 часов', '12 часов']"
                label="Запускать каждые*"
                required
              ></v-select>
            </v-row>
          </v-container>
          <!-- Подсказка для обязательного поля -->
          <small>*Это обязательное поле</small>
        </v-card-text>
        <v-card-actions>
          <!-- Кнопка для начала выполнения бизнес-процесса -->
          <v-btn
            size="small"
            variant="text"
            @click="dialog = false"
            class="my-button4"
          >
            Начать выполнение БП
          </v-btn>
          <v-spacer></v-spacer>
          <!-- Кнопка для отмены выполнения бизнес-процесса -->
          <v-btn
            size="small"
            variant="text"
            @click="dialog = false"
            class="my-button3"
          >
            Отмена
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-main>
      <v-container v-if="selectedItem && selectedItem.name === 'Создание исполняемого процесса'">
        <workflow :zoom-level="maxZoomLevel" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
@import '../styles/MainStyles.css';
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import serviceAPIModels from '../service/ServiceApimodels';
import Workflow from './Workflow.vue';
import Sidebar from './Sidebar.vue'

export default defineComponent({
  components: {
    Workflow, 
  },
  data() {
    return {
      maxZoomLevel: 50.0,
      showSidebar: false,
      showAppBar: false,
      selectedItemIndex: null,
      dialog: false,
      isDisabled1: false,
      isDisabled2: false,
      items: [
        { name: 'file1', id: 1, props: { color: 'primary' } },
        { name: 'file2', id: 2, props: { color: 'primary' } },
        { name: 'file3', id: 3, props: { color: 'primary' } },
        { name: 'file4', id: 4, props: { color: 'primary' } },
        { name: 'file5', id: 5, props: { color: 'primary' } },
        { name: 'file6', id: 6, props: { color: 'primary' } },
        { name: 'file7', id: 7, props: { color: 'primary' } },
        { name: 'file8', id: 8, props: { color: 'primary' } },
      ],
    };
  },
  computed: {
    // Компьютед для получения выбранного элемента
    selectedItem() {
      if (this.selectedItemIndex !== null) {
      return this.items[this.selectedItemIndex] || null;
      }
    },
  },
  methods: {
    // Функция для отображения/скрытия боковой панели
    funShowSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    // Функция для открытия диалога выбора файла
    openFilePicker() {
      const input = document.createElement('input');
      input.type = 'file';
      input.onchange = (e: any) => {
        const file = e.target.files[0];

        // Отправляем файл на бэкенд
        serviceAPIModels.load(
          file,
          (response) => {
            console.log('Сохранено успешно:', response);
            const { id, name } = response.data;
            const newItem = { name, id, props: { color: 'primary' } };
            this.items.push(newItem);
          },
          (error) => {
            console.error('Ошибка сохранения:', error);
          }
        );
      };
      // Принудительно вызываем событие клика на скрытом input для открытия диалога выбора файла
      input.click();
    },

    // Функция для выбора элемента списка
    selectItem(index) {
      // Если элемент уже выбран, снимите выделение и скрывайте appbar
      if (this.selectedItemIndex === index) {
        this.selectedItemIndex = null;
        this.showAppBar = false;
      } else {
        // Иначе выберите элемент и отобразите appbar
        this.selectedItemIndex = index;
        this.showAppBar = true;
      }
    },
    // Функция для переключения состояния кнопок
    selectButtonToChange() {
      // Инвертируем состояния кнопок
      this.isDisabled1 = !this.isDisabled1;
      this.isDisabled2 = !this.isDisabled2;
    },
    // Функция для удаления выбранной схемы
    deleteScheme() {
      
      // Проверяем, выбран ли элемент для удаления
      if (this.selectedItemIndex !== null) {
        const selectedItemId = this.items[this.selectedItemIndex].id;
        // Удаляем выбранный элемент из списка
        this.items.splice(this.selectedItemIndex, 1);
        // Сбрасываем индекс выбранного элемента
        this.selectedItemIndex = null;
        // Скрываем appbar после удаления элемента
        this.showAppBar = false;
      
        serviceAPIModels.delete(
          selectedItemId,
          (response) => {
              console.log('Удалено успешно:', response);
          },
          (error) => {
              console.error('Ошибка удаления:', error);
          }
        );
      }
    }
  }
});
</script>
