<template>
  <div>
    <div class="container my-2 form-requirement">
      <i-form :model="requirement" ref="requirement" :rules="ruleValidate">
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
            <app-postBehaviour
              :postBehaviour="requirement.postBehaviour"
              @onPostBehaviourChange="requirement.postBehaviour = $event"
            ></app-postBehaviour>
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
            <form-item
              :label="$t('requirex_requirement_quantity_frecuency')"
              prop="quantityFrecuency"
            >
              <i-input
                v-model="requirement.quantityFrecuency"
                :placeholder="$t('requirex_requirement_quantity_frecuency')"
              />
            </form-item>
          </div>
        </div>
      </i-form>

      <div class="container text-right my-2">
        <Button class="mx-1 cb-dark" @click="handleSubmit('requirement')">{{$t('requirex_edit')}}</Button>
        <Button type="error" @click="onAdaptationCancel('requirement')">{{$t('requirex_cancel')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import requireType from "./../components/requirex/components/RequireType";
import imperative from "./../components/requirex/components/Imperative";
import relaxing from "./../components/requirex/components/Relax";
import postBehaviour from "./../components/requirex/components/PostBehaviour";
import timeList from "./../components/requirex/components/TimeList";

export default {
  components: {
    "app-requireType": requireType,
    "app-imperative": imperative,
    "app-relaxing": relaxing,
    "app-postBehaviour": postBehaviour,
    "app-time-list": timeList
  },
  data() {
    //Validar cuando relax sea few o many
    const validatePostBehaviour = (rule, value, callback) => {
      if (
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_many")) |
        (this.requirement.relaxing == this.$t("requirex_requirement_relax_few"))
      ) {
        if (value === "") {
          callback(new Error("Cannot be empty"));
        } else callback();
      } else callback();
    };

    //Validar Event cuando relax sea few, many, before, after, during, until
    const validateEvent = (rule, value, callback) => {
      if (
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_many")) |
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_few")) |
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_before")) |
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_after")) |
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_during")) |
        (this.requirement.relaxing ==
          this.$t("requirex_requirement_relax_until"))
      ) {
        if (value === "") {
          callback(new Error("The event Cannot be empty"));
        } else callback();
      } else callback();
    };

    //Validar cuando relax sea within
    const validateWithin = (rule, value, callback) => {
      if (
        this.requirement.relaxing ==
        this.$t("requirex_requirement_relax_within")
      ) {
        if ((value === "") | (value <= "0")) {
          callback(new Error("Cannot be empty"));
        } else callback();
      } else callback();
    };

    //Validar cuando relax sea least
    const validateLeast = (rule, value, callback) => {
      if (
        this.requirement.relaxing == this.$t("requirex_requirement_relax_least")
      ) {
        if (value === "") {
          callback(new Error("Cannot be empty"));
        } else callback();
      } else callback();
    };

    //Validar cuando relax sea close
    const validateClose = (rule, value, callback) => {
      if (
        this.requirement.relaxing == this.$t("requirex_requirement_relax_close")
      ) {
        if (value === "") {
          callback(new Error("Cannot be empty"));
        } else callback();
      } else callback();
    };

    return {
      requirement: {},
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
            message: "Please select a option",
            trigger: "change"
          }
        ],
        postBehaviour: [
          {
            required: true,
            validator: validatePostBehaviour,
            trigger: "blur"
          }
        ],
        event: [
          {
            required: true,
            validator: validateEvent,
            trigger: "blur"
          }
        ],
        timeInterval: [
          {
            required: true,
            validator: validateWithin,
            trigger: "change"
          }
        ],
        units: [
          {
            required: true,
            validator: validateWithin,
            trigger: "blur"
          }
        ],
        quantity: [
          { required: true, validator: validateLeast, trigger: "blur" }
        ],
        frecuency: [
          { required: true, validator: validateLeast, trigger: "blur" }
        ],
        quantityFrecuency: [
          { required: true, validator: validateClose, trigger: "blur" }
        ]
      },
      lastTimeAdaptation: "",
      userInt: false,
      autoAct: false,
      extInt: false
    };
  },
  methods: {
    onAdaptationCancel(value, name) {
      this.$refs[name].resetFields();
      this.$router.push("/requireX");
    },
    handleSubmit(name) {
      //Validar el formulario
      this.$refs[name].validate(valid => {
        if (valid) {
          this.requirement.msg = "";

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
              this.requirement.timeInterval +
              " " +
              this.requirement.quantity +
              " " +
              this.$t("requirex_requirement_times") +
              " " +
              this.requirement.frecuency +
              " ";
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
          this.updateRequirement();

          //Contar Requerimientos

          this.lastTimeAdaptation = new Date().toISOString().slice(0, 10);

          //this.loading = true;
          this.$router.push("/requireX");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    updateRequirement() {
      let uri = `http://localhost:4000/adaptations/update/${this.$route.params.id}`;
      this.axios.post(uri, this.requirement).then(() => {
        this.$router.replace("/requireX");
      });
    }
  },
  created() {
    let uri = `http://localhost:4000/adaptations/${this.$route.params.id}`;
    this.axios.get(uri).then(response => {
      this.requirement = response.data;
      console.log(this.requirement);
    });
  }
};
</script>