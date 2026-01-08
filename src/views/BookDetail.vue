<template>
  <BaseLayout title="รายละเอียดหนังสือ" :showBack="true">
    <ion-list v-if="book" class="book-detail">
      <ion-item lines="none">
        <img :src="book.cover_url" class="w-24 h-36 object-cover rounded shadow mx-auto" />
      </ion-item>

      <ion-item>
        <ion-label>
          <h2 class="font-bold text-lg">{{ book.title }}</h2>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <p class="text-gray-700">ผู้แต่ง: {{ book.author }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label>
          <p class="text-gray-900 font-semibold">ราคา: {{ book.price }}</p>
        </ion-label>
      </ion-item>

      <ion-item>
        <ion-label :class="book.available_copies > 0 ? 'text-green-600' : 'text-red-600'">
          สถานะ: {{ book.available_copies > 0 ? "ว่าง" : "ถูกยืมแล้ว" }}
        </ion-label>
      </ion-item>
    </ion-list>

    <template #actions>
      <div class="flex flex-col gap-3 w-full max-w-xs mx-auto p-4">
        <ion-button expand="block" color="success" :disabled="book?.available_copies === 0" @click="borrowBook">
          ยืมหนังสือ
        </ion-button>

        <ion-button expand="block" color="danger" @click="returnBook">
          คืนหนังสือ
        </ion-button>
      </div>
    </template>

    <ion-alert :is-open="alert.open" :header="alert.title" :message="alert.message" :buttons="['OK']"
      @didDismiss="alert.open = false" />
  </BaseLayout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import BaseLayout from "../components/BaseLayout.vue";
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAlert
} from '@ionic/vue'
export default {
  name: "BookDetail",
  components: {
    BaseLayout,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonAlert
  },

  data() {
    return {
      alert: {
        open: false,
        title: "",
        message: ""
      }
    };
  },
  computed: {
    ...mapGetters(["getBookById"]),
    book() {
      return this.getBookById(Number(this.$route.params.id));
    }
  },
  methods: {
    ...mapMutations(["BORROW_BOOK", "RETURN_BOOK"]),

    showAlert(title, message) {
      this.alert.title = title;
      this.alert.message = message;
      this.alert.open = true;
    },

    borrowBook() {
      document.activeElement?.blur();
      this.BORROW_BOOK(this.book.id);
      this.showAlert("สำเร็จ", "ยืมหนังสือเรียบร้อยแล้ว");
    },

    returnBook() {
      document.activeElement?.blur();
      this.RETURN_BOOK(this.book.id);
      this.showAlert("สำเร็จ", "คืนหนังสือเรียบร้อยแล้ว");
    }
  }
};
</script>