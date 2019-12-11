<template>
  <div id="reqType">

    <label for="reqType">{{$t('requirex_requirement_type_label')}}</label>
    <select id="reqTypeValue" class="form-control" v-model="reqType">
       <option
          :value="$t('requirex_requirement_type_value_1')"
        >{{ $t('requirex_requirement_type1')}}</option>
        <option
          :value="$t('requirex_requirement_type_value_2')"
        >{{ $t('requirex_requirement_type2')}}</option>
        <option
          :value="$t('requirex_requirement_type_value_3')"
        >{{ $t('requirex_requirement_type3')}}</option>
    </select>
   
  </div>
</template>

<script>
import $ from "jquery";
$(document).on(function(){

});

export default {
  props: {
    reqType: {
      type: [String],
      required: true
    }
  },
  data() {
    return {
      require: ""
    };
  },
  methods: {
    onRequireTypeChange(event) {
      this.require = event;
      this.$emit("onRequireTypeChange", this.require);
    }
  }
};
</script>
