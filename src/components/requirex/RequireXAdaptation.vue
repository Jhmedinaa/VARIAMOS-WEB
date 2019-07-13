<template>
  <div>
    <Modal
      :value="dialog"
      :title="$t('requirex_adaptation_tittle')"
      @on-ok="handleSubmit('requirement', requirement)"
      :ok-text=" $t('requirex_generate')"
      @on-cancel="onAdaptationCancel(false, 'requirement')"
      :cancel-text="$t('requirex_cancel')"
      :closable="false"
      :mask-closable="false"
      :scrollable="true"
      :loading="loading"
    >
      <i-form :model="requirement" ref="requirement" :rules="ruleValidate" label-position="top">
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

        <div class="row">
          <div class="col">
            <form-item :label="$t('requirex_requirement_process_verb_label')" prop="processVerb">
              <i-input
                v-model="requirement.processVerb"
                :placeholder="$t('requirex_requirement_process_verb_label')"
              />
            </form-item>
          </div>
          <div
            class="col"
            v-if="requirement.relaxing != $t('requirex_requirement_relax_many') && requirement.relaxing != $t('requirex_requirement_relax_few')"
          >
            <form-item :label="$t('requirex_requirement_object_label')" prop="object">
              <i-input
                v-model="requirement.object"
                :placeholder="$t('requirex_requirement_object_label')"
              />
            </form-item>
          </div>
        </div>

        <app-relaxing
          :relaxing="requirement.relaxing"
          @onRelaxinChange="requirement.relaxing = $event"
        ></app-relaxing>

        <div
          class="row"
          v-if="requirement.relaxing == $t('requirex_requirement_relax_many') | requirement.relaxing == $t('requirex_requirement_relax_few')"
        >
          <div class="col">
            <app-postBehavior
              :postBehaviour="requirement.postBehaviour"
              @onPostBehaviourChange="requirement.postBehaviour = $event"
            ></app-postBehavior>
          </div>
          <div class="col">
            <form-item :label="$t('requirex_requirement_object_label')" prop="object">
              <i-input
                v-model="requirement.object"
                :placeholder="$t('requirex_requirement_object_label')"
              />
            </form-item>
          </div>
        </div>

        <div
          class="row"
          v-if="requirement.relaxing == $t('requirex_requirement_relax_many') |
            requirement.relaxing == $t('requirex_requirement_relax_few') |  
            requirement.relaxing == $t('requirex_requirement_relax_before') |
            requirement.relaxing == $t('requirex_requirement_relax_after') |
            requirement.relaxing == $t('requirex_requirement_relax_during') |
            requirement.relaxing == $t('requirex_requirement_relax_until')"
        >
          <div class="col">
            <form-item :label="$t('requirex_requirement_event')" prop="event">
              <i-input v-model="requirement.event" :placeholder="$t('requirex_requirement_event')"></i-input>
            </form-item>
          </div>
        </div>

        <div class="row" v-if="requirement.relaxing == $t('requirex_requirement_relax_within')">
          <div class="col-3">
            <form-item :label="$t('requirex_requirement_time')" prop="event">
              <InputNumber :max="999999" :min="1" :step="1" v-model="requirement.timeInterval"></InputNumber>
            </form-item>
          </div>
          <div class="col-3">
            <app-time-list :units="requirement.units" @onUnitChange="requirement.units = $event"></app-time-list>
          </div>
        </div>

        <div class="row" v-if="requirement.relaxing == $t('requirex_requirement_relax_least')">
          <div class="col-3">
            <form-item :label="$t('requirex_requirement_time')" prop="event">
              <InputNumber :max="999999" :min="1" :step="1" v-model="requirement.timeInterval"></InputNumber>
            </form-item>
          </div>
          <div class="col-9">
            <form-item :label="$t('requirex_requirement_frecuency')" prop="frecuency">
              <i-input
                v-model="requirement.frecuency"
                :placeholder="$t('requirex_requirement_frecuency')"
              />
            </form-item>
          </div>
        </div>

        <div class="row" v-if="requirement.relaxing == $t('requirex_requirement_relax_close')">
          <div class="col">
            <form-item :label="$t('requirex_requirement_quantity_frecuency')" prop="frecuency">
              <i-input
                v-model="requirement.quantityFrecuency"
                :placeholder="$t('requirex_requirement_quantity_frecuency')"
              />
            </form-item>
          </div>
        </div>
      </i-form>
    </Modal>
  </div>
</template>

<script>
import requireType from "./components/RequireType";
import imperative from "./components/Imperative";
import relaxing from "./components/Relax";
import postBehavior from "./components/PostBehaviour";
import timeList from "./components/TimeList";

export default {
  components: {
    "app-requireType": requireType,
    "app-imperative": imperative,
    "app-relaxing": relaxing,
    "app-postBehavior": postBehavior,
    "app-time-list": timeList
  },
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    requirementProp: {
      reqType: String,
      name: String,
      condition: Boolean,
      conditionDescription: String,
      imperative: String,
      systemName: String,
      processVerb: String,
      object: String,
      system: String,
      relaxing: String,
      postBehaviour: String,
      event: String,
      timneInterval: Number,
      units: String,
      quantity: String,
      frecuency: String,
      complement: String,
      msg: String,
      isComplete: Boolean
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
        processVerb: "",
        object: "",
        system: "",
        processVerb: "",
        relaxing: "",
        postBehaviour: "",
        event: "",
        timeInterval: 0,
        units: "",
        quantity: "",
        frecuency: "",
        quantityFrecuency: "",
        msg: "",
        isComplete: false
      },
      ruleValidate: {
        reqType: [
          {
            required: true,
            message: "Please select the requirement type",
            trigger: "change"
          }
        ],
        systemName: [
          {
            required: true,
            message: "The system or subsystem name cannot be empty",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        imperative: [
          {
            required: true,
            message: "Please select the imperative",
            trigger: "change"
          }
        ],
        processVerb: [
          {
            required: true,
            message: "The Process Verb cannot be empty",
            trigger: "change"
          }
        ],
        object: [
          {
            required: true,
            message: "The Object  cannot be empty",
            trigger: "change"
          }
        ],
        relaxing: [
          {
            required: true,
            message: "TPlease select a option",
            trigger: "change"
          }
        ]
      },
      dial: false,
      loading: true,
      userInt: false,
      autoAct: false,
      extInt: false
    };
  },
  methods: {
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    onVisibleChange(estate) {
      alert(estate);
    },
    onAdaptationCancel(value, name) {
      this.dial = value;
      this.$refs[name].resetFields();
      this.$emit("onAdaptationCancel", this.dial);
    },
    handleSubmit(name, req) {
      //Validar el formulario
      this.$refs[name].validate(valid => {
        if (valid) {
          this.requirement.msg = "";
          //this.$Message.success("Success!");
          //Si hay una condición
          if (this.requirement.condition) {
            this.requirement.msg += this.requirement.conditionDescription + " ";
          }

          //Complemento y nombre
          this.requirement.msg +=
            this.$t("requirex_requirement_sel_adaptive_complement") +
            this.requirement.systemName +
            " " +
            this.requirement.imperative;
          //Process Verrb
          this.requirement.msg += " " + this.requirement.processVerb + " ";

          //Validate Relax
          if (
            (this.requirement.relaxing ==
              this.$t("requirex_requirement_relax_many")) |
            (this.requirement.relaxing ==
              this.$t("requirex_requirement_relax_few"))
          ) {
            this.requirement.msg +=
              this.requirement.relaxing +
              " " +
              this.requirement.object +
              " " +
              this.$t("requirex_requirement_as_posible") +
              " " +
              this.requirement.postBehaviour +
              " " +
              this.requirement.event;
          } else if (
            (this.requirement.relaxing ==
              this.$t("requirex_requirement_relax_before")) |
            (this.requirement.relaxing ==
              this.$t("requirex_requirement_relax_after")) |
            (this.requirement.relaxing ==
              this.$t("requirex_requirement_relax_during")) |
            (this.requirement.relaxing ==
              this.$t("requirex_requirement_relax_until"))
          ) {
            this.requirement.msg +=
              this.requirement.object +
              " " +
              this.requirement.relaxing +
              " " +
              this.requirement.event;
          } else if (
            this.requirement.relaxing ==
            this.$t("requirex_requirement_relax_within")
          ) {
            this.requirement.msg +=
              this.requirement.object +
              " " +
              this.requirement.relaxing +
              " " +
              this.requirement.timeInterval +
              " " +
              this.requirement.units +
              " ";
          } else if (
            this.requirement.relaxing ==
            this.$t("requirex_requirement_relax_least")
          ) {
            this.requirement.msg +=
              this.requirement.object +
              " " +
              this.requirement.relaxing +
              " " +
              this.requirement.quantity +
              " " +
              this.$t("requirex_requirement_times") +
              " " +
              this.requirement.frecuency +
              " " ;
          } else if (
            this.requirement.relaxing ==
            this.$t("requirex_requirement_relax_eventually")
          ) {
            this.requirement.msg +=
              this.requirement.object + " " + this.requirement.relaxing;
          } else {
            this.requirement.msg +=
              this.requirement.object +
              " " +
              this.requirement.relaxing +
              " " +
              this.requirement.quantityFrecuency;
          }

          //this.loading = true;
          this.dial = false;
          this.requirement.isComplete = true;
          this.$emit("onAdaptationCancel", this.dial);
          this.requirement = req;
          this.$emit("handleSubmit", this.requirement);
        } else {
          this.loading = false;
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>