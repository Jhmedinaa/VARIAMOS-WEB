<template>
  <div>
    <form-item :label="$t('requirex_requirement_type_label')">
      <i-select
        v-model="reqType"
        :placeholder="$t('requirex_select')"
        @on-change="onRequireTypeChange"
      >
        <i-option
          :value="$t('requirex_requirement_type_value_1')"
        >{{ $t('requirex_requirement_type1')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_type_value_2')"
        >{{ $t('requirex_requirement_type2')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_type_value_3')"
        >{{ $t('requirex_requirement_type3')}}</i-option>
      </i-select>
      
    <p>{{ reqType }}</p>
    </form-item>

  </div>
</template>

<script>
export default {
  props: {
    reqType: {
      type: [String],
      required: true
    }
  },
  data() {
      return{
          require: ''
      }
  },
  methods: {
    onRequireTypeChange(event) {
      this.require = event;
      this.$emit("onRequireTypeChange", this.require);
    }
  },
};
</script>
