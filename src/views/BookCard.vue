<template>
  <ion-item button detail="false" class="rounded-xl my-2 shadow-sm bg-white" @click="$emit('select', book.id)">
    <!-- Thumbnail ซ้าย -->
    <ion-thumbnail slot="start">
      <img :src="book.cover_url || 'assets/cover-placeholder.png'" />
    </ion-thumbnail>

    <!-- เนื้อหาหนังสือ -->
    <ion-label>
      <h2 class="font-semibold text-[15px] text-gray-800">
        {{ book.title }}
      </h2>

      <p class="text-gray-600 text-sm">
        {{ book.author }}
      </p>

      <small class="text-gray-500">
        คงเหลือ: {{ book.available_copies }}
      </small>
    </ion-label>

    <!-- slot สำหรับ badge / ปุ่ม -->
    <slot name="extra"></slot>

  </ion-item>
</template>

<script setup>
import {
  IonItem,
  IonLabel,
  IonThumbnail,
} from '@ionic/vue'

defineProps({
  book: Object
})

defineEmits(['select'])
</script>