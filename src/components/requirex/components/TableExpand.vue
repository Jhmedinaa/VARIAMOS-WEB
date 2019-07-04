<template>
  <div>
    <CellGroup>
      <Cell v-for="r in row.listRequirements" :key="r.name"  :title="r.name" :label="r.msg"/>
    </CellGroup>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  }
};
</script>