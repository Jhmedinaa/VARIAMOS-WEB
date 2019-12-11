<template>
  <div>
    <div class="container my-2 form-requirement">
      <form id="domainForm" ref="requirement">
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
            <label>
              <font size="3" color="red">*</font>
              {{$t('requirex_requirement_system_domain_name_label')}}
            </label>
            <input
              id="systemName"
              class="form-control"
              :placeholder="$t('requirex_requirement_system_domain_name_label')"
            />
          </div>
          <div class="col">
            <label>
              <font size="3" color="red">*</font>
              {{$t('requirex_requirement_name_label')}}
            </label>
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
            <label>
              <font size="3" color="red">*</font>
              {{ $t('requirex_requirement_imperative_label') }}
            </label>
            <select id="imperative" class="form-control" :placeholder="$t('requirex_select')">
              <option
                value="$t('requirex_requirement_imperative_value_1')"
              >{{ $t('requirex_requirement_imperative1')}}</option>
              <option
                value="$t('requirex_requirement_imperative_value_2')"
              >{{ $t('requirex_requirement_imperative2')}}</option>
              <option
                value="$t('requirex_requirement_imperative_value_3')"
              >{{ $t('requirex_requirement_imperative3')}}</option>
            </select>
          </div>

          <div class="col">
            <label class="text-left">
              <font size="3" color="red">*</font>
              {{ $t('requirex_requirement_system_activity_label') }}
            </label>
            <select
              id="systemActivity"
              class="form-control"
              placeholder="$t('requirex_select')"
              onload="systemActivityChange()"
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

        <div id="userContent" class="text-left my-2">
          <label>{{$t('requirex_requirement_user_label')}}</label>
          <input
            id="user"
            class="form-control"
            :placeholder="$t('requirex_requirement_user_label')"
          />
        </div>

        <div id="extIntContent" class="row my-2" style="display: none">
          <div class="col">
            <label>{{$t('requirex_requirement_system_label')}}</label>
            <input
              id="system"
              class="form-control"
              :placeholder="$t('requirex_requirement_system_label')"
            />
          </div>
          <div class="col">
            <label>{{ $t('requirex_requirement_from_label') }}</label>
            <select
              id="from"
              class="form-control"
              :placeholder="$t('requirex_select')"
              :remote-method="onSystemActivityChange"
            >
              <option
                :value="$t('requirex_requirement_from_value_1')"
              >{{ $t('requirex_requirement_from1')}}</option>
              <option
                :value="$t('requirex_requirement_system_from_value_2')"
              >{{ $t('requirex_requirement_from2')}}</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <label>
              <font size="3" color="red">*</font>
              {{ $t('requirex_requirement_process_verb_label') }}
            </label>
            <input
              id="processVerb"
              class="form-control"
              :placeholder="$t('requirex_requirement_process_verb_label')"
            />
          </div>
          <div class="col">
            <label>
              <font size="3" color="red">*</font>
              {{ $t('requirex_requirement_object_label') }}
            </label>
            <input
              id="object"
              class="form-control"
              :placeholder="$t('requirex_requirement_object_label')"
            />
          </div>
        </div>

        <div class="custom-control custom-switch my-2">
          <input type="checkbox" class="custom-control-input" id="systemCondition" />
          <label
            class="custom-control-label"
            for="systemCondition"
          >{{$t('requirex_requirement_system_condition_domain_label')}}</label>
        </div>

        <div id="systemConditionDescriptionContainer" class="text-left" style="display: none">
          <label>{{ $t('requirex_requirement_description') }}</label>
          <textarea
            id="systemConditionDescription"
            class="form-control"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            :placeholder="$t('requirex_requirement_system_condition_descrive_label')"
          />
        </div>
      </form>

      <div class="container text-right my-2">
        <Button
          class="mx-1 cb-dark"
          @click="handleSubmit('requirement')"
        >{{$t('requirex_generate')}}</Button>
        <Button id="cancel" class="btn btn-danger">{{$t('requirex_cancel')}}</Button>
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

$(function() {
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
    affectedSystemsChange();
  });

  //Activar condiciones
  $("#condition").change(function() {
    conditionChange();
  });

  //Cambiar de Actividad del sistema, oculta o muestra las funciones correspondientes
  $(document).on("change", "#systemActivity", function() {
    systemActivityChange();
  });

  //Agregar o retirar condiciones del sistema
  $("#systemCondition").click(function() {
    systemConditionChange();
  });

  $(document).on("click", "#cancel", function() {
    $("#domainForm").trigger("reset");
    //systemActivity
    systemActivityChange();
    //System condition change
    systemConditionChange();
    //Condition change
    conditionChange();
    //affected systems change
    affectedSystems();
  });
});

/**
 * Funciones externas
 */
function systemActivityChange() {
  var systemActivity = $("#systemActivity").val();
  //Al selecccionar interaccion con el usuario
  if (systemActivity == "userInt") {
    console.log("entro");
    $("#userContent")
      .first()
      .fadeIn("slow");
    $("#extIntContent").hide();
  } else if (systemActivity == "autoAct") {
    //Al selecccionar actividad autonoma
    $("#userContent").hide();
    $("#extIntContent").hide();
  } else if (systemActivity == "extInt") {
    //Al seleccionar actividad externa
    $("#userContent").hide();
    $("#extIntContent")
      .first()
      .fadeIn("slow");
  }
}
function conditionChange() {
  if ($("#condition").is(":checked")) {
    $("#conditionDescriptionContainer")
      .first()
      .fadeIn("slow");
  } else {
    $("#conditionDescriptionContainer").hide();
  }
}

function systemConditionChange() {
  if ($("#systemCondition").is(":checked")) {
    $("#systemConditionDescriptionContainer")
      .first()
      .fadeIn("slow");
  } else {
    $("#systemConditionDescriptionContainer").hide();
  }
}

function affectedSystems() {
  requirement.affectedSystems = $("#affectedSystems").val();
  if (requirement.affectedSystems == "Those") {
    $("#thoseCoditionContainer")
      .first()
      .fadeIn("slow");
  } else {
    $("#thoseCoditionContainer").hide();
  }
}

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

    handleReset(name) {
      // this.$refs[name].resetFields();
    },
    onDomainCancel(name) {
      // this.$refs[name].resetFields();
      this.$router.push("/requireX");
    },
    handleSubmit(name) {
      //Validar el formulario
      //this.$refs[name].validate(valid => {
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
            " " + this.requirement.processVerb + " " + this.requirement.object;
        } else if (this.requirement.systemActivity == "userInt") {
          this.requirement.msg +=
            " provide the " + this.requirement.user + " with the capacity of";
          this.requirement.msg +=
            " " + this.requirement.processVerb + " " + this.requirement.object;
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
      // });
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
    //this.$refs["requirement"].resetFields();
  }
};
</script>

<style scoped>
.form-requirement {
  margin: 0 auto;
  max-width: 500px;
}
</style>
