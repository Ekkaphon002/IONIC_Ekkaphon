<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary" class="flex items-center">
             <!-- ปุ่ม Back -->
              <ion-buttons slot="start" v-if="showBack">
                <ion-back-button default-href="/" />
              </ion-buttons>

              <!-- Title -->
            <ion-title class="text-center flex-1">{{ title }}</ion-title>

              <!-- Slot สำหรับปุ่ม header ด้านขวา -->
            <slot name="header-end"></slot>
            </ion-toolbar>
        </ion-header>

        <ion-content class="p-4">
            <div class="flex flex-col items-center justify-center text-center min-h-[80vh]">
                <slot></slot> <!-- เนื้อหาหลัก -->
            </div>
        </ion-content>

        <ion-footer class="ion-padding">
            <slot name="actions"></slot>
        </ion-footer>
    </ion-page>
</template>
<script>
import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonContent,IonFooter,
} from "@ionic/vue";

export default {
    name: "BaseLayout",
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton,
IonContent,IonFooter },
    props: {
        title: { type: String, required: true },
        showBack: { type: Boolean, default: false }
    }
};
</script>