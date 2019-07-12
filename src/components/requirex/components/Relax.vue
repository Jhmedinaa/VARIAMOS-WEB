<template>
  <div>
    <form-item :label="$t('requirex_requirement_relax_label')" prop="relaxing">
      <i-Select :value="relaxing" :placeholder="$t('requirex_select')" @on-change="onRelaxinChange">
        <i-option
          :value="$t('requirex_requirement_relax_many')"
        >{{ $t('requirex_requirement_relax_many')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_few')"
        >{{ $t('requirex_requirement_relax_few')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_before')"
        >{{ $t('requirex_requirement_relax_before')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_after')"
        >{{ $t('requirex_requirement_relax_after')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_during')"
        >{{ $t('requirex_requirement_relax_during')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_until')"
        >{{ $t('requirex_requirement_relax_until')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_within')"
        >{{ $t('requirex_requirement_relax_within')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_least')"
        >{{ $t('requirex_requirement_relax_least')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_eventually')"
        >{{ $t('requirex_requirement_relax_eventually')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_relax_close')"
        >{{ $t('requirex_requirement_relax_close')}}</i-option>
      </i-Select>
    </form-item>
  </div>
</template>

<script>
export default {
  props: {
    relaxing: {
      type: [String],
      required: true
    }
  },
  data() {
    return {
      relax: ""
    };
  },
  methods: {
    onRelaxinChange(event) {
      this.relax = event;
      this.$emit("onRelaxinChange", this.relax);
    }
  }
};
</script>

