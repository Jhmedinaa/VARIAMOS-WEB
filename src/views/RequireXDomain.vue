<template>
  <div>
    <div class="container my-2 form-requirement">
      <form ref="requirement">
        <div class="row">
          <div class="col">
            <label for="reqType">
              <font size="3" color="red">*</font>
              {{$t('requirex_requirement_type_label')}}
            </label>

            <select id="reqType" class="form-control">
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
          <div class="col">
            <label for="affectedSystems">
              <font size="3" color="red">*</font>
              {{$t('requirex_requirement_affected_systems_label')}}
            </label>

            <select id="affectedSystems" class="form-control">
              <option
                :value="$t('requirex_requirement_affected_systems1')"
                selected
              >{{ $t('requirex_requirement_affected_systems1')}}</option>
              <option
                :value="$t('requirex_requirement_affected_systems2')"
              >{{ $t('requirex_requirement_affected_systems2')}}</option>
              <option
                :value="$t('requirex_requirement_affected_systems3')"
              >{{ $t('requirex_requirement_affected_systems3')}}</option>
            </select>
          </div>
        </div>

        <div id="thoseCoditionContainer" class="form-group my-3" style="display: none">
          <label for="thoseCodition">{{$t('requirex_requirement_affected_condition')}}</label>
          <input
            id="thoseCodition"
            class="form-control"
            :placeholder="$t('requirex_requirement_affected_condition')"
          />
        </div>

        <div class="row my-2">
          <div class="col">
            <label>{{$t('requirex_requirement_system_domain_name_label')}}</label>
            <input
              id="systemName"
              class="form-control"
              :placeholder="$t('requirex_requirement_system_domain_name_label')"
            />
          </div>
          <div class="col">
            <label>{{$t('requirex_requirement_name_label')}}</label>
            <input
              id="name"
              class="form-control"
              :placeholder="$t('requirex_requirement_name_label')"
            />
          </div>
        </div>

        <div class="row my-2">
          <div class="col">
            <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="condition" />
              <label
                class="custom-control-label"
                for="condition"
              >{{$t('requirex_requirement_condition_label')}}</label>
            </div>
          </div>
          <div id="conditionDescriptionContainer" class="col" style="display: none">
            <textarea
              id="conditionDescription"
              class="form-control"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              :placeholder="$t('requirex_requirement_condition_descrive_label')"
            />
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label>{{ $t('requirex_requirement_imperative_label') }}</label>
            <select id="imperative" class="form-control" :placeholder="$t('requirex_select')">
              <option
                :value="$t('requirex_requirement_imperative_value_1')"
              >{{ $t('requirex_requirement_imperative1')}}</option>
              <option
                :value="$t('requirex_requirement_imperative_value_2')"
              >{{ $t('requirex_requirement_imperative2')}}</option>
              <option
                :value="$t('requirex_requirement_imperative_value_3')"
              >{{ $t('requirex_requirement_imperative3')}}</option>
            </select>
          </div>

          <div class="col">
            <label>{{ $t('requirex_requirement_system_activity_label') }}</label>
            <select
              id="systemActivity" class="form-control"
              :placeholder="$t('requirex_select')"
              :remote-method="onSystemActivityChange"
            >
              <option
                :value="$t('requirex_requirement_system_activity_value_1')"
              >{{ $t('requirex_requirement_system_activity1')}}</option>
              <option
                :value="$t('requirex_requirement_system_activity_value_2')"
              >{{ $t('requirex_requirement_system_activity2')}}</option>
              <option
                :value="$t('requirex_requirement_system_activity_value_3')"
              >{{ $t('requirex_requirement_system_activity3')}}</option>
            </select>
          </div>
        </div>

        <div style="display: none">
          <label >{{$t('requirex_requirement_user_label')}}</label>
          <input id="user"  class="form-control"
              :placeholder="$t('requirex_requirement_user_label')"
            />
        </div>

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

        <!--
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
        -->
      </form>

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
<script src="//vuejs.org/js/vue.min.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>

<script>
import imperative from "./../components/requirex/components/Imperative";
import { getDomainRequirement } from "../assets/js/common/requirement.js";

import $ from "jquery";

$(document).ready(function() {
  //Declara modelo del requerimineto
  var requirement = getDomainRequirement();

  //Tipo de requerimiento
  requirement.reqType = $("#reqType").val();
  //Sistemas afectados
  requirement.affectedSystems = $("#affectedSystems").val();

  //Evento que se ejecuta cuando se cambia el tipo de requerimiento
  $(document).on("change", "#reqType", function() {
    requirement.reqType = $("#reqType").val();
  });

  //Evento que se ejecuta cuando se cambiam los sistemas afectados
  $(document).on("change", "#affectedSystems", function() {
    requirement.affectedSystems = $("#affectedSystems").val();
    console.log(requirement.affectedSystems);
    if (requirement.affectedSystems == "Those") {
      $("#thoseCoditionContainer")
        .first()
        .fadeIn("slow");
    } else {
      $("#thoseCoditionContainer").hide();
    }
  });

  //Activar condiciones
  $("#condition").click(function() {
    if ($("#condition").is(":checked")) {
      $("#conditionDescriptionContainer")
        .first()
        .fadeIn("slow");
    } else {
      $("#conditionDescriptionContainer").hide();
    }
  });

  //Cambiar de Actividad del sistema
  $(document).on("change", "#systemActivity", function(){
      alert("");
  });
});

export default {
  components: {
    "app-imperative": imperative
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
    getRequirement() {
      return JSON.stringify(this.requirement);
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
              " provide the " + this.requirement.user + " with the capacity of";
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
  created() {
    //Cargar lista de requerimientos de dominio
    let uri = "http://localhost:4000/domains";
    this.axios.get(uri).then(response => {
      this.listDomainRequirement = response.data;
      this.countDomain = this.listDomainRequirement.length;
    });
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
