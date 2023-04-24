<template>
  <v-app id="inspire">

    <v-navigation-drawer 
      v-model="showSidebar" color="grey-lighten-3">
      <v-list>
      <v-list-item>
        <v-list-item-title class="mt-4" fonts = "Poppins">Текущие БП</v-list-item-title>
        <v-scroll-y>
          <v-card
          class="mp"
          max-width="150"
          max-height="300"
          align-self="flex-end"
          @click="selectItem(items)">
            <v-list
              class="mr-auto"
              :items="items"
              item-title="name"
              item-value="id">
            </v-list>
          </v-card>
      </v-scroll-y>
      </v-list-item>
      
      <v-list-item class="mt-auto">
        <v-btn @click="openFilePicker" class="fixedBottom" size="small" variant="tonal" append-icon="mdi-file-upload">Load new</v-btn>
        
      </v-list-item>
     </v-list>
    </v-navigation-drawer>


    <v-app-bar app elevation="0" color="grey-lighten-3">
      <v-app-bar-nav-icon @click="funShowSidebar" />
      <v-spacer></v-spacer>
      <v-toolbar-title fonts = "Poppins">Workflow</v-toolbar-title>
      
      

      <v-btn rounded="xl" size="small" class="my-button1" variant="tonal">
        Юзернейм
      </v-btn>
      
      <v-btn icon stacked class="my-button2">
        <v-icon>mdi-logout</v-icon>
        Выход
      </v-btn>
    </v-app-bar>

    

    <v-app-bar app v-show="showAppBar" elevation="0" color="grey-lighten-3">
      
      <v-btn text size="small" class="my-button4" @click="dialog = true" :disabled="isDisabled1">Настройка запуска БП</v-btn>
      <v-spacer></v-spacer>
      <v-btn text size="small" class="my-button3" :disabled="isDisabled1" >Список экземпляров</v-btn>
      <v-btn text size="small" class="my-button3" @click="selectButtonToChange">Изменить</v-btn>
      <v-btn text size="small" class="my-button5"><span>Удалить схему</span></v-btn>
      
      
    </v-app-bar>

    <v-dialog v-model="dialog" persistent width="500">
        <v-card>
          <v-card-title>
            <titleSettings class="text-h5">Настройка запуска БП</titleSettings>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-select
                  :items="['отсутствует', '1 час', '2 часа', '8 часов', '12 часов']"
                  label="Запускать каждые*"
                  required
                ></v-select>
              </v-row>
            </v-container>
            <small>*Это обязательное поле</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
              size="small"
              variant="text"
              @click="dialog = false"
              class="my-button4"
            >
             Начать выполнение БП
            </v-btn>
            <v-spacer></v-spacer>
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
  



  </v-app>
</template>

<style scoped>
  .my-button1 {
    text-transform: none;
    background-color: rgb(253, 253, 120);
    margin-right: 100px;
    font-family: Poppins;
  }
  .my-button2 {
    text-transform: none;
    font-family: Poppins;
  }
  .my-button3{
    text-transform: none;
    background-color: rgb(204, 204, 204);
    margin-right: 20px;
    font-family: Poppins;
  }
  .my-button4{
    text-transform: none;
    background-color: #00C853;
    font-family: Poppins;
  }
  .my-button5{
    text-transform: none;
    background-color: rgb(196, 5, 5);
    margin-left: 40px;
    font-family: Poppins;
  }
  .mp {
  margin-top: 40px; 
  overflow-y: scroll;
}
  .fixedBottom {
  position: fixed !important;
  bottom: 0 !important;
  margin-bottom: 50px;
}
/* .my-app-bar {
  background-color: green;
  color: rgb(168, 14, 14);
} */
/* .top-line {
  height: 2px;
  width: 100%;
  background-color: grey; 
}
.navbar-nav > li > a 
{
    padding: 0;
    margin: 0;
    background: red;
    vertical-align: bottom;
} */
span{
  color: #ffffff;
}
titleSettings{
  color: #000000;
}
</style>

<script lang="ts">
import {ref} from 'vue'
import { defineComponent } from 'vue';


// const items =  [
//           { id: 1,
//             name: 'Option 1',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 2,
//             name: 'Option 2',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 3,
//             name: 'Option 3',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 4,
//             name: 'Option 4',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 5,
//             name: 'Option 5',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 6,
//             name: 'Option 6',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 7,
//             name: 'Option 7',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 8,
//             name: 'Option 8',
//             props: {
//             color: 'primary',
//             }, 
//           },
//           { id: 9,
//             name: 'Option 9',
//             props: {
//             color: 'primary',
//             }, 
//           },
//         ];

// function showFileDialog(): void {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.onchange = (e: any) => {
//         const file = e.target.files[0];
//         const name = file.name;
//         const id = items[items.length - 1].id + 1;
//         const newItem = { name, id, props: {
//             color: 'primary',
//             }};
//         items.push(newItem);
//     };
//     input.click();
//   }

//  const appBar2 = ref(false)
//  const showSidebar = ref(false);

// function funShowSidebar(){
//   showSidebar.value = !showSidebar.value
// }
// function appBarShow(){
//   appBar2.value = !appBar2.value
// }


export default defineComponent({
  data() {
    return {
      showSidebar: false,
      showAppBar: false,
      selectedItem: null,
      dialog: false,
      isDisabled1: false,
      isDisabled2: false,
      items: [
        { name: 'file1', id: 1, props: {color: 'primary'}},
        { name: 'file2', id: 2, props: {color: 'primary'}},
        { name: 'file3', id: 3, props: {color: 'primary'}},
        { name: 'file4', id: 4, props: {color: 'primary'}},
        { name: 'file5', id: 5, props: {color: 'primary'}},
        { name: 'file6', id: 6, props: {color: 'primary'}},
        { name: 'file7', id: 7, props: {color: 'primary'}},
        { name: 'file8', id: 8, props: {color: 'primary'}},
      ],
    };
  },
  methods: {
    funShowSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    openFilePicker() {
      const input = document.createElement('input');
      input.type = 'file';

      input.onchange = (e: any) => {
        const file = e.target.files[0];
        const name = file.name.split('.').slice(0, -1).join('.');
        const id = this.items[this.items.length - 1].id + 1;
        const newItem = { name, id, props: {color: 'primary'} };
        this.items.push(newItem);
      };

      input.click();
    },
    selectItem(items) {
      this.selectedItem = items;
      this.showAppBar = !this.showAppBar;
    },
    selectButtonToChange(){
      this.isDisabled1 = true;
      this.isDisabled2 = true;
    }
  },
});
</script>
