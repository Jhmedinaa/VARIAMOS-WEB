<template>
  <div>
    <div class="container my-2 form-requirement">
      <i-form ref="requirement" :model="requirement" :rules="ruleValidate">
        <div class="row">
          <div class="col">
            <app-requireType
              @onRequireTypeChange="requirement.reqType = $event"
              :reqType="requirement.reqType"
            ></app-requireType>
          </div>
          <div class="col">
            <app-quantity
              @onAffectedSystemChange="requirement.affectedSystems = $event"
              :affectedSystems="requirement.affectedSystems"
            ></app-quantity>
          </div>
        </div>

        <div
          class="row"
          v-if="requirement.affectedSystems == $t('requirex_requirement_affected_systems3')"
        >
          <div class="col">
            <form-item :label="$t('requirex_requirement_affected_condition')" prop="thoseCodition">
              <i-input
                v-model="requirement.thoseCodition"
                :placeholder="$t('requirex_requirement_affected_condition')"
              />
            </form-item>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <form-item
              :label="$t('requirex_requirement_system_domain_name_label')"
              prop="systemName"
            >
              <i-input
                v-model="requirement.systemName"
                :placeholder="$t('requirex_requirement_system_domain_name_label')"
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

        <div class="row">
          <div class="col">
            <app-imperative
              @onImperativeChange="requirement.imperative = $event"
              :imperative="requirement.imperative"
            ></app-imperative>
          </div>
          <div class="col">
            <form-item
              :label="$t('requirex_requirement_system_activity_label')"
              prop="systemActivity"
            >
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
          </div>
        </div>

        <div class="sub-form" v-if="isSystemActivity">
          <form-item :label="$t('requirex_requirement_user_label')" v-if="userInt">
            <i-input
              v-model="requirement.user"
              :placeholder="$t('requirex_requirement_user_label')"
            />
          </form-item>

          <div class="row">
            <div class="col">
              <form-item :label="$t('requirex_requirement_system_label')" v-if="extInt">
                <i-input
                  v-model="requirement.system"
                  :placeholder="$t('requirex_requirement_system_label')"
                />
              </form-item>
            </div>
            <div class="col">
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
            </div>
          </div>

          <div class="row">
            <div class="col">
              <form-item :label="$t('requirex_requirement_process_verb_label')" prop="processVerb">
                <i-input
                  v-model="requirement.processVerb"
                  :placeholder="$t('requirex_requirement_process_verb_label')"
                />
              </form-item>
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

          <form-item :label="$t('requirex_requirement_system_condition_domain_label')">
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

      <div class="container text-right my-2">
        <Button
          class="mx-1 cb-dark"
          @click="handleSubmit('requirement')"
        >{{$t('requirex_generate')}}</Button>
        <Button type="error" @click="onDomainCancel('requirement')">{{$t('requirex_cancel')}}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import requireType from "./../components/requirex/components/RequireType";
import imperative from "./../components/requirex/components/Imperative";
import quantity from "./../components/requirex/components/Quantity";

export default {
  components: {
    "app-requireType": requireType,
    "app-imperative": imperative,
    "app-quantity": quantity
  },

  data() {
    return {
      listDomainRequirement: [],
      requirement: {
        id: 0,
        requirementNumber: "",
        affectedSystems: this.$t("requirex_requirement_affected_systems1"),
        thoseCodition: "",
        reqType: this.$t("requirex_requirement_type_value_1"),
        name: "",
        condition: false,
        conditionDescription: "",
        imperative: this.$t("requirex_requirement_imperative_value_1"),
        systemName: "",
        systemActivity: "",
        user: "",
        processVerb: "",
        object: "",
        system: "",
        from: "",
        systemCondition: false,
        systemConditionDescription: "",
        msg: "",
        estado: true
      }, //Realizar validaciones del formulario
      ruleValidate: {
        affectedSystems: [
          {
            required: true,
            message: "Please select a option",
            trigger: "change"
          }
        ],
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
        ]
      },
      countDomain: 0,
      lastTimeDomain: "",
      isSystemActivity: false,
      userInt: false,
      autoAct: false,
      extInt: false
    };
  },
  methods: {
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
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    onDomainCancel(name) {
      this.$refs[name].resetFields();
      this.$router.push("/requireX");
    },
    handleSubmit(name) {
      //Validar el formulario
      this.$refs[name].validate(valid => {
        if (valid) {
          //Reiniciar requerimiento
          this.requirement.msg = "";

          //Si hay una condición
          if (this.requirement.condition == true) {
            this.requirement.msg += this.requirement.conditionDescription + " ";
          }

          //Sistemas afectado
          this.requirement.msg += this.requirement.affectedSystems + " ";
          //Complemento
          this.requirement.msg += this.$t(
            "requirex_requirement_affected_systems_complement"
          );

          if (
            this.requirement.affectedSystems ==
            this.$t("requirex_requirement_affected_systems3")
          ) {
            this.requirement.msg +=
              this.$t("requirex_requirement_affected_that") + " ";
            this.requirement.msg += this.requirement.thoseCodition + " ";
          }

          this.requirement.msg +=
            this.requirement.systemName + " " + this.requirement.imperative;

          //Validate system activity
          if (this.requirement.systemActivity == "autoAct") {
            this.requirement.msg +=
              " " +
              this.requirement.processVerb +
              " " +
              this.requirement.object;
          } else if (this.requirement.systemActivity == "userInt") {
            this.requirement.msg +=
              " provide the " + this.requirement.user + " the capacity ";
            this.requirement.msg +=
              " " +
              this.requirement.processVerb +
              " " +
              this.requirement.object;
          } else if (this.requirement.systemActivity == "extInt") {
            this.requirement.msg +=
              " have the capacity of " +
              this.requirement.processVerb +
              " " +
              this.requirement.object +
              " " +
              this.requirement.from +
              " the " +
              this.requirement.system;
          }

          //Validat conditions
          if (this.requirement.systemCondition) {
            this.requirement.msg +=
              ", " + this.requirement.systemConditionDescription;
          }
          //Agregar item a la lista
          this.countDomain++;
          this.requirement.id = this.countDomain;
          this.requirement.requirementNumber = "D.R." + this.requirement.id;

          this.saveRequirement();

          //Contar Requerimientos

          this.lastTimeDomain = new Date().toISOString().slice(0, 10);

          //Reiniciar Formulario
          this.$Message.success("Success!");
          this.$router.push("/requireX");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    saveRequirement() {
       let uri = "http://localhost:4000/domains/add";
      this.axios.post(uri, this.requirement).then(() => {
        this.$Message.success("Success!");
        this.$router.push("/requirex");
      });
    }
  },
  mounted() {
    //Cargar datos
    this.$refs["requirement"].resetFields();
  }
};
</script>


<style scoped>
.form-requirement {
  margin: 0 auto;
  max-width: 500px;
}
</style>
