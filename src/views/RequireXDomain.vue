<template>
  <div class="container">
    <div id="domainMessage" class="alert alert-danger" role="alert" style="display: none">
      <span></span>
    </div>
    <div class="my-3">
      <h2>{{$t("requirex_domain_tittle")}}</h2>
    </div>
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
            <select id="from" class="form-control" :placeholder="$t('requirex_select')">
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
        <button
          id="generate"
          type="button"
          class="btn btn-outline-dark mx-2"
        >{{$t('requirex_generate')}}</button>
        <button id="cancel" type="button" class="btn btn-danger">{{$t('requirex_cancel')}}</button>
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

//Declara modelo del requerimineto
let requirement = getDomainRequirement();

$(function() {
  console.log(requirement);

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

  $(document).on("click", "#generate", function() {
    var valid = true;
    //Tipo de requerimiento
    requirement.reqType = $("#reqType").val();
    //Sistemas afectados
    requirement.affectedSystems = $("#affectedSystems").val();
    //Tiene condition
    if (requirement.isThoseCodition) {
      requirement.thoseCodition = $("#thoseCodition").val();
      if (requirement.thoseCodition.length <= 0) {
        $("#thoseCodition").addClass("error");
        valid = false;
      } else {
        $("#thoseCodition").removeClass("error");
      }
    }
    //nombre de la linea de productos
    requirement.systemName = $("#systemName").val();
    if (requirement.systemName.length <= 0) {
      $("#systemName").addClass("error");
      valid = false;
    } else {
      $("#systemName").removeClass("error");
    }

    //requirement name
    requirement.name = $("#name").val();
    if (requirement.name.length <= 0) {
      $("#name").addClass("error");
      valid = false;
    } else {
      $("#name").removeClass("error");
    }

    // Si tiene una condicion
    //requirement.condition = $("#condition").val();
    alert(requirement.condition);
    if (requirement.condition) {
      requirement.conditionDescription = $("#conditionDescription").val();
      if (requirement.conditionDescription.length <= 0) {
        $("#conditionDescription").addClass("error");
        valid = false;
      } else {
        $("#conditionDescription").removeClass("error");
      }
    }

    //Sistem activity
    requirement.systemActivity = $("#systemActivity").val();
    if (requirement.systemActivity == "userInt") {
      requirement.user = $("#user").val();
      if (requirement.user.length <= 0) {
        $("#user").addClass("error");
        valid = false;
      } else {
        $("#user").removeClass("error");
      }
    } else if (requirement.systemActivity == "extInt") {
      requirement.system = $("#system").val();
      if (requirement.system.length <= 0) {
        $("#system").addClass("error");
        valid = false;
      } else {
        $("#system").removeClass("error");
      }
    }

    //Proces verb
    requirement.processVerb = $("#processVerb").val();
    if (requirement.processVerb <= 0) {
      $("#processVerb").addClass("error");
      valid = false;
    } else {
      $("#processVerb").removeClass("error");
    }

    //Objecto
    requirement.object = $("#object").val();
    if (requirement.object <= 0) {
      $("#object").addClass("error");
      valid = false;
    } else {
      $("#object").removeClass("error");
    }

    //Si el sistema tiene una condicion
    requirement.systemCondition = $("#systemCondition").val();
    if (requirement.systemCondition) {
      requirement.systemConditionDescription = $(
        "#systemConditionDescription"
      ).val();
      if (requirement.systemConditionDescription <= 0) {
        $("#systemConditionDescription").addClass("error");
        valid = false;
      } else {
        $("#systemConditionDescription").removeClass("error");
      }
    }

    if (valid) {
      //Reiniciar requerimiento
      requirement.msg = "";

      //Si hay una condición
      if (requirement.condition == true) {
        requirement.msg += requirement.conditionDescription + " ";
      }

      //Sistemas afectado
      requirement.msg += requirement.affectedSystems + " ";
      //Complemento
      requirement.msg += $t("requirex_requirement_affected_systems_complement");

      if (
        requirement.affectedSystems ==
        $t("requirex_requirement_affected_systems3")
      ) {
        requirement.msg += $t("requirex_requirement_affected_that") + " ";
        requirement.msg += requirement.thoseCodition + " ";
      }

      requirement.msg += requirement.systemName + " " + requirement.imperative;

      //Validate system activity
      if (requirement.systemActivity == "autoAct") {
        requirement.msg +=
          " " + requirement.processVerb + " " + requirement.object;
      } else if (requirement.systemActivity == "userInt") {
        requirement.msg +=
          " provide the " + requirement.user + " with the capacity of";
        requirement.msg +=
          " " + requirement.processVerb + " " + requirement.object;
      } else if (requirement.systemActivity == "extInt") {
        requirement.msg +=
          " have the capacity of " +
          requirement.processVerb +
          " " +
          requirement.object +
          " " +
          requirement.from +
          " the " +
          requirement.system;
      }

      //Validat conditions
      if (requirement.systemCondition) {
        requirement.msg += ", " + requirement.systemConditionDescription;
      }
      //Agregar item a la lista
      countDomain++;
      requirement.id = countDomain;
      requirement.requirementNumber = "D.R." + requirement.id;

      saveRequirement();

      //Contar Requerimientos

      lastTimeDomain = new Date().toISOString().slice(0, 10);

      //Reiniciar Formulario
      $("#domainMessage span").text("Success!");
      setTimeout(showTooltip, 500);
    } else {
      $("#domainMessage span").text("please check the data");
      setTimeout(showTooltip, 500);
    }
  });

  function showTooltip() {
    $("#domainMessage").show("slow");
    setTimeout(hideTooltip, 5000);
  }

  function hideTooltip() {
    $("#domainMessage").hide("slow");
  }
  //Activar condiciones
  function conditionChange() {
    if ($("#condition").is(":checked")) {
      $("#conditionDescriptionContainer")
        .first()
        .fadeIn("slow");

      requirement.condition = true;
    } else {
      requirement.condition = false;
      $("#conditionDescriptionContainer").hide();
    }
  }

  //Activar o desactivar systemas afectados
  function affectedSystemsChange() {
    requirement.affectedSystems = $("#affectedSystems").val();
    if (requirement.affectedSystems == "Those") {
      $("#thoseCoditionContainer")
        .first()
        .fadeIn("slow");

      requirement.isThoseCodition = true;
    } else {
      requirement.isThoseCodition = false;
      $("#thoseCoditionContainer").hide();
    }
  }
});

/**
 * Funciones externas
 */

//Cambiar actividates del sistema
function systemActivityChange() {
  var systemActivity = $("#systemActivity").val();
  //Al selecccionar interaccion con el usuario
  if (systemActivity == "userInt") {
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

//Activar o desactivar condiciones del sistema
function systemConditionChange() {
  if ($("#systemCondition").is(":checked")) {
    $("#systemConditionDescriptionContainer")
      .first()
      .fadeIn("slow");
  } else {
    $("#systemConditionDescriptionContainer").hide();
  }
}

export default {
  data() {
    return {
      listDomainRequirement: [],
      countDomain: 0,
    };
  },
  methods: {
    getRequirement() {
      return JSON.stringify(this.requirement);
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
  }
};
</script>

<style scoped>
.form-requirement {
  margin: 0 auto;
  max-width: 500px;
}

.error {
  border: 1px solid red;
}
</style>
