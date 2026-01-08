<template>
  <div style="text-align: center;">
    <h2>{{$store.getters.getCount}}</h2>
    <ion-button @click="add">Add</ion-button>
    <ion-button @click="del">Del</ion-button>
  </div>
</template>
<script>
export default {
  name: 'TestA',
  methods: {
    add() {
      this.$store.dispatch('addAction');
    },
    del() {
      this.$store.dispatch('delAction');
    }
  },
  // mounted() {
  //   setInterval(() => {
  //     this.$store.dispatch('addAction');
  //   }, 100);
  // }
};
</script>