<template>
  <div>
    <Modal
      :value="dialog"
      :title="$t('requirex_adaptation_tittle')"
      :ok-text=" $t('requirex_generate')"
      @on-cancel="onAdaptationCancel(false, 'requirement')"
      :cancel-text="$t('requirex_cancel')"
      :loading="loading"
    >
      <i-form :model="requirement" ref="requirement" label-position="top">
        <app-requireType
          @onRequireTypeChange="requirement.reqType = $event"
          :reqType="requirement.reqType"
        ></app-requireType>

        <div class="row">
          <div class="col">
            <form-item :label="$t('requirex_requirement_system_name_label')" prop="systemName">
              <i-input
                v-model="requirement.systemName"
                :placeholder="$t('requirex_requirement_system_name_label')"
              />
            </form-item>
          </div>
          <div class="col">
            <form-item :label="$t('requirex_requirement_name_label')" prop="name">
              <i-input
                v-model="requirement.name"
                :placeholder="$t('requirex_requirement_name_label')"
              />
            </form-item>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <form-item :label="$t('requirex_requirement_condition_label')">
              <i-switch v-model="requirement.condition" size="large">
                <span slot="open">{{$t('requirex_requirement_yes')}}</span>
                <span slot="close">{{$t('requirex_requirement_no')}}</span>
              </i-switch>
            </form-item>
          </div>
          <div class="col">
            <form-item prop="desc" v-if="requirement.condition">
              <i-input
                v-model="requirement.conditionDescription"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                :placeholder="$t('requirex_requirement_condition_descrive_label')"
              ></i-input>
            </form-item>
          </div>
        </div>

        <app-imperative
          @onImperativeChange="requirement.imperative = $event"
          :imperative="requirement.imperative"
        ></app-imperative>
      </i-form>
    </Modal>
  </div>
</template>

<script>
import requireType from "./components/RequireType";
import imperative from "./components/Imperative";

export default {
  components: {
    "app-requireType": requireType,
    "app-imperative": imperative
  },
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      requirement: {
        reqType: "",
        name: "",
        condition: false,
        conditionDescription: "",
        imperative: "",
        systemName: "",
        systemActivity: "",
        user: "",
        processVerb: "",
        object: "",
        system: "",
        from: "",
        processVerb: "",
        systemCondition: false,
        systemConditionDescription: "",
        msg: "",
        isComplete: false
      },
      dial: false,
      loading: true,
      userInt: false,
      autoAct: false,
      extInt: false
    };
  },
  methods: {
    onAdaptationCancel(value, name) {
      this.dial = value;
      this.$refs[name].resetFields();
      this.$emit("onAdaptationCancel", this.dial);
    }
  }
};
</script>