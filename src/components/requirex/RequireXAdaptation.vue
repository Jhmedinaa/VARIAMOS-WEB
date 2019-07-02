<template>
  <div>
    <h1>{{requirement.reqType}}</h1>
    <i-form :model="requirement" ref="requirement" :label-width="120" >
      <app-requireType @onRequireTypeChange="onRequireTypeChange" :reqType="requirement.reqType" ></app-requireType>
    </i-form>
  </div>
</template>

<script>
import requireType from "./components/RequireType";

export default {
  components: {
    "app-requireType": requireType
  },
  data() {
    return {
      requirement: {
        reqType: ""
      },
    };
  },
  methods: {
      onRequireTypeChange(type){
          this.requirement.reqType = type;
      }
  }
};
</script>

<style scoped>
</style>
