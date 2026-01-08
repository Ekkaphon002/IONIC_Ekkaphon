<template>
  <div style="text-align: center;">
    <h2>{{$store.getters.getCount}}</h2>
    <TestA/>
  </div>
</template>
<script>
import TestA from './TestA.vue';
export default {
  name: 'TestB',
  components: {
    TestA
  }

};
</script>

