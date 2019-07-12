<template>
  <div>
    <form-item :label="$t('requirex_requirement_post_behaviour')" prop="postBehaviour">
      <i-select
        :value="postBehaviour"
        :placeholder="$t('requirex_select')"
        @on-change="onPostBehaviourChange"
      >
        <i-option :value="$t('requirex_requirement_after')">{{ $t('requirex_requirement_after')}}</i-option>
        <i-option :value="$t('requirex_requirement_before')">{{ $t('requirex_requirement_before')}}</i-option>
        <i-option :value="$t('requirex_requirement_during')">{{ $t('requirex_requirement_during')}}</i-option>
      </i-select>
    </form-item>
  </div>
</template>
<script>
export default {
  prop: {
    postBehaviour: {
      type: [String],
      required: true
    }
  },
  data() {
    return {
      post: ""
    };
  },
  methods: {
    onPostBehaviourChange(event) {
      this.post = event;
      this.$emit("onPostBehaviourChange", this.post);
    }
  }
};
</script>
