<template>
  <div>
    <form-item :label="$t('requirex_requirement_imperative_label')" prop="imperative">
      <i-select
        :value="imperative"
        :placeholder="$t('requirex_select')"
        @on-change="onImperativeChange"
      >
        <i-option
          :value="$t('requirex_requirement_imperative_value_1')"
        >{{ $t('requirex_requirement_imperative1')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_imperative_value_2')"
        >{{ $t('requirex_requirement_imperative2')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_imperative_value_3')"
        >{{ $t('requirex_requirement_imperative3')}}</i-option>
      </i-select>
    </form-item>
  </div>
</template>

<script>
export default {
  props: {
    imperative: {
      type: [String],
      required: true,
    }
  },
  data() {
    return {
      imp: "" 
    };
  },
  methods: {
    onImperativeChange(event) {
      this.imp = event;
      this.$emit("onImperativeChange", this.imp);
    }
  }
};
</script>