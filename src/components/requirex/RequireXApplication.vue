<template>
  <div>
    <modal
      :value="dialog"
      :title="$t('requirex_application_tittle')"
      @on-ok="handleSubmit('requirement')"
      :ok-text=" $t('requirex_generate')"
      @on-cancel="onApplicationCancel(false)"
      :cancel-text="$t('requirex_cancel')"   
      :closable="false"
      :mask-closable="false"  
      :scrollable="true"
      :loading="loading"
    >
      <h1>{{requirement.reqType}}</h1>
      <i-form :model="requirement" ref="requirement" :label-width="120" :rules="ruleValidate">
       
        <app-requireType @onRequireTypeChange="onRequireTypeChange" :reqType="requirement.reqType"></app-requireType>

        <form-item :label="$t('requirex_requirement_name_label')" prop="name">
          <i-input v-model="requirement.name" :placeholder="$t('requirex_requirement_name_label')"/>
        </form-item>

        <form-item :label="$t('requirex_requirement_condition_label')">
          <i-switch v-model="requirement.condition" size="large">
            <span slot="open">{{$t('requirex_requirement_yes')}}</span>
            <span slot="close">{{$t('requirex_requirement_no')}}</span>
          </i-switch>
        </form-item>

        <form-item
          :label="$t('requirex_requirement_description')"
          prop="desc"
          v-if="requirement.condition"
        >
          <i-input
            v-model="requirement.conditionDescription"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            :placeholder="$t('requirex_requirement_condition_descrive_label')"
          ></i-input>
        </form-item>

        <app-imperative
          @onImperativeChange="onImperativeChange"
          :imperative="requirement.imperative"
        ></app-imperative>

        <form-item :label="$t('requirex_requirement_system_name_label')" prop="systemName">
          <i-input
            v-model="requirement.systemName"
            :placeholder="$t('requirex_requirement_system_name_label')"
          />
        </form-item>

        <form-item :label="$t('requirex_requirement_system_activity_label')" prop="systemActivity">
          <i-select
            v-model="requirement.systemActivity"
            :placeholder="$t('requirex_select')"
            :remote-method="onSystemActivityChange"
          >
            <i-option
              :value="$t('requirex_requirement_system_activity_value_1')"
            >{{ $t('requirex_requirement_system_activity1')}}</i-option>
            <i-option
              :value="$t('requirex_requirement_system_activity_value_2')"
            >{{ $t('requirex_requirement_system_activity2')}}</i-option>
            <i-option
              :value="$t('requirex_requirement_system_activity_value_3')"
            >{{ $t('requirex_requirement_system_activity3')}}</i-option>
          </i-select>
        </form-item>

        <div class="sub-form" v-if="isSystemActivity">
          <form-item :label="$t('requirex_requirement_user_label')" v-if="userInt">
            <i-input
              v-model="requirement.user"
              :placeholder="$t('requirex_requirement_user_label')"
            />
          </form-item>
          <form-item :label="$t('requirex_requirement_system_label')" v-if="extInt">
            <i-input
              v-model="requirement.system"
              :placeholder="$t('requirex_requirement_system_label')"
            />
          </form-item>

          <form-item :label="$t('requirex_requirement_from_label')" v-if="extInt">
            <i-select
              v-model="requirement.from"
              :placeholder="$t('requirex_select')"
              :remote-method="onSystemActivityChange"
            >
              <i-option
                :value="$t('requirex_requirement_from_value_1')"
              >{{ $t('requirex_requirement_from1')}}</i-option>
              <i-option
                :value="$t('requirex_requirement_system_from_value_2')"
              >{{ $t('requirex_requirement_from2')}}</i-option>
            </i-select>
          </form-item>

          <form-item :label="$t('requirex_requirement_process_verb_label')">
            <i-input
              v-model="requirement.processVerb"
              :placeholder="$t('requirex_requirement_process_verb_label')"
            />
          </form-item>
          <form-item :label="$t('requirex_requirement_object_label')">
            <i-input
              v-model="requirement.object"
              :placeholder="$t('requirex_requirement_object_label')"
            />
          </form-item>

          <form-item :label="$t('requirex_requirement_system_condition_label')">
            <i-switch v-model="requirement.systemCondition" size="large">
              <span slot="open">{{$t('requirex_requirement_yes')}}</span>
              <span slot="close">{{$t('requirex_requirement_no')}}</span>
            </i-switch>
          </form-item>

          <form-item
            :label="$t('requirex_requirement_description')"
            prop="desc"
            v-if="requirement.systemCondition"
          >
            <i-input
              v-model="requirement.systemConditionDescription"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              :placeholder="$t('requirex_requirement_system_condition_descrive_label')"
            ></i-input>
          </form-item>
        </div>

      </i-form>
    </modal>
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
        systemConditionDescription: ""
      },
      ruleValidate: {
        reqType: [
          {
            required: true,
            message: "Please select the requirement type",
            trigger: "change"
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
        systemName: [
          {
            required: true,
            message: "The system or subsystem name cannot be empty",
            trigger: "blur"
          }
        ],
        systemActivity: [
          {
            required: true,
            message: "Please select the system activity",
            trigger: "change"
          }
        ]
      },
      isSystemActivity: false,
      dial: false,
      loading : true
    };
  },
  methods: {
    onRequireTypeChange(type) {
      this.requirement.reqType = type;
    },
    onImperativeChange(imperative) {
      this.requirement.imperative = imperative;
    },
    //Realizar filtro de opciones al cambiar de actividades
    onSystemActivityChange() {
      this.isSystemActivity = true;
      //Capturar tipo de actividades del sistema
      var systemActivity = this.requirement.systemActivity;

      //Aplicar condiciones
      if (systemActivity == "userInt") {
        this.userInt = true;
        this.autoAct = false;
        this.extInt = false;
      } else if (systemActivity == "autoAct") {
        this.userInt = false;
        this.autoAct = true;
        this.extInt = false;
      } else if (systemActivity == "extInt") {
        this.userInt = false;
        this.autoAct = false;
        this.extInt = true;
      }
    },
    handleSubmit(name) {
      //Validar el formulario
      this.$refs[name].validate(valid => {
        if (valid) {
          
          this.loading = true;
        } else {
          this.loading = false;
          this.$Message.error("Fail!");
        }
      });
    },
     handleReset(name) {
      this.$refs[name].resetFields();
    },
    onVisibleChange(estate){
      alert(estate);
    },
    onApplicationCancel(value){
      this.dial = value;
      this.$emit("onApplicationCancel", this.dial);
    }
  }
};
</script>

<style scoped>
</style>
