<template>
  <BaseLayout title="รายการหนังสือ">
    <!-- ปุ่มเพิ่ม -->
    <div class="flex justify-center mb-4">
      <ion-button size="small" @click="showModal = true">
        + เพิ่มหนังสือ
      </ion-button>
    </div>

    <ion-searchbar v-model="q" placeholder="ค้นหา..." />

    <ion-list>
      <BookCard v-for="b in filtered" :key="b.id" :book="b" @select="open">
        <template #extra>
          <ion-badge :color="b.available_copies > 0 ? 'success' : 'danger'">
            {{ b.available_copies > 0 ? "ว่าง" : "ถูกยืม" }}
          </ion-badge>
        </template>
      </BookCard>
    </ion-list>

    <!-- Modal -->
    <ion-modal :is-open="showModal" @didDismiss="closeModal">
      <ion-header>
        <ion-toolbar>
          <ion-title>เพิ่มหนังสือ</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="closeModal">ปิด</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content class="ion-padding">
        <ion-input v-model="form.title" label="ชื่อหนังสือ" />
        <ion-input v-model="form.author" label="ผู้แต่ง" />
        <ion-input v-model.number="form.price" label="ราคา" type="number" />
        <ion-input
          v-model.number="form.available_copies"
          label="จำนวน"
          type="number"
        />

        <div class="flex justify-center my-4" v-if="form.cover_url">
          <ion-img
            :src="form.cover_url"
            class="w-28 h-40 rounded shadow"
          />
        </div>

        <div class="flex justify-center mb-4">
          <ion-button size="small" color="secondary" @click="selectImage">
            Upload Cover Image
          </ion-button>
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          hidden
          @change="onImageChange"
        />

        <ion-button expand="block" class="mt-4" @click="saveBook">
          บันทึก
        </ion-button>
      </ion-content>
    </ion-modal>
  </BaseLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  IonButton,
  IonSearchbar,
  IonBadge,
  IonList,
  IonModal,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonImg
} from "@ionic/vue";

import BaseLayout from "../components/BaseLayout.vue";
import BookCard from "../views/BookCard.vue";

const store = useStore();
const router = useRouter();

const q = ref("");
const showModal = ref(false);
const fileInput = ref(null);

const form = ref({
  title: "",
  author: "",
  price: 0,
  available_copies: 1,
  cover_url: ""
});

const books = computed(() => store.getters.allBooks);

const filtered = computed(() => {
  const t = q.value.toLowerCase();
  return books.value.filter(b =>
    b.title.toLowerCase().includes(t) ||
    b.author.toLowerCase().includes(t)
  );
});

function selectImage() {
  fileInput.value.click();
}

function onImageChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    form.value.cover_url = reader.result;
  };
  reader.readAsDataURL(file);
}

function open(id) {
  router.push({ name: "BookDetail", params: { id } });
}

function closeModal() {
  showModal.value = false;
}

function saveBook() {
  if (!form.value.title || !form.value.author) return;

  store.commit("ADD_BOOK", {
    id: Date.now(),
    cover_url: form.value.cover_url || "https://via.placeholder.com/150",
    title: form.value.title,
    author: form.value.author,
    price: form.value.price,
    available_copies: form.value.available_copies
  });

  form.value = {
    title: "",
    author: "",
    price: 0,
    available_copies: 1,
    cover_url: ""
  };

  closeModal();
}
</script>
