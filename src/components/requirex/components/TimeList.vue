<template>
  <div>
    <form-item :label="$t('requirex_requirement_units')" class="text-centers"  prop="units">
      <i-select :value="units" :placeholder="$t('requirex_select')"  @on-change="onUnitChange">
        <i-option
          :value="$t('requirex_requirement_units_milliseconds')"
        >{{ $t('requirex_requirement_units_milliseconds')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_seconds')"
        >{{ $t('requirex_requirement_units_seconds')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_minutes')"
        >{{ $t('requirex_requirement_units_minutes')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_hours')"
        >{{ $t('requirex_requirement_units_hours')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_days')"
        >{{ $t('requirex_requirement_units_days')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_weeks')"
        >{{ $t('requirex_requirement_units_weeks')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_months')"
        >{{ $t('requirex_requirement_units_months')}}</i-option>
        <i-option
          :value="$t('requirex_requirement_units_years')"
        >{{ $t('requirex_requirement_units_years')}}</i-option>
      </i-select>
    </form-item>
  </div>
</template>

<script>
export default {
  props: {
    units: {
      type: [String],
      required: true
    }
  },data() {
    return {
      uni: ""
    };
  },
  methods: {
    onUnitChange(event) {
      this.uni = event;
      this.$emit("onUnitChange", this.uni);
    }
  }
};
</script>
