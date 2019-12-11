<template>
  <div id="tabs" class="p20">
    <ul id="ul-tabs" class="nav justify-content-center my-1"></ul>

    <div>
      <div v-if="getactivetab !== ''" class="tabcontent">
        <keep-alive>
          <model :key="getmodel_component"></model>
        </keep-alive>
      </div>
    </div>
    <div v-if="getactivetab === '' && $route.params.project !== 'default'" data-test="nofolder">
      <div class="border-bottom text-left" style="padding-bottom: 10px">
        <h1 class="h2">Project: {{ $route.params.project }}</h1>
      </div>
      <div class="div-text-area" style="padding-up: 10px">
        Please select one folder
        <br />
        <br />
      </div>
    </div>
    <div v-if="getactivetab === '' && $route.params.project === 'default'" data-test="noproject">
      <div class="border-bottom text-left" style="padding-bottom: 10px">
        <h1 class="h2">Please select one project</h1>
      </div>
    </div>
  </div>
</template>

<script>
import model from "./Models.vue";
import Bus from "../assets/js/common/bus.js";
import { getModelInfo } from "../assets/js/common/treeview-json";
import $ from "jquery";

/**
 * Al iniciar la pagina
 */
$(document).ready(function() {
  //Captura json con datos
  var m = getModelInfo();

  //Se activa cuando se realiza un cambio
  Bus.$on("itemSelect", function(item) {
    //Verificar si se cambio el contenedor padre
    var treeItem =  JSON.parse(item);
    if (treeItem.folder != this.selectedFolder) {
      var children = m[0].children;
      for (var i = 0; i < children.length; i++) {
        if (children[i].folder == treeItem.folder) {
          this.models = children[i].children;
          break;
        }
      }
    }
    //SE agregan li a ul de tabs
    $("#ul-tabs").empty();
    for (var i = 0; i < this.models.length; i++) {
      var li = "<li class='nav-item ";

      //Verificar si el objeto seleccionado no es conctenedor, para el active
      if (this.models[i].type != "content") {
        if(this.models[i].id == treeItem.id){
            li += "' style='border-bottom: 1px solid black;'";
        }
      }

      li += "'> <a class='nav-link' href='#'>";
      li += this.models[i].name;
      li += "</a></li>";

      $("#ul-tabs").append(li);
    }
  });

 
});

export default {
  components: {
    model
  },
  data: function() {
    return {
      models: [],
      selectedFolder: ""
    };
  },
  created: function() {},
  methods: {
    /**
     * when the folder is opened, show up the tabs and model component
     * @param {string} item     - the element of the array for tabs
     * @param {number} index    - the index of the array for tabs
     * @returns {boolean}
     */
    checktabs: function(item, index) {
      let data = this.getdata;
      for (let i = 0; i < getModelInfo()[item].projFolders.length; i++) {
        // check the tabs for each folder
        if (
          this.getmodel_component.includes(getModelInfo()[item].projFolders[i])
        ) {
          this.mxgraphreset = true;
          return true;
        }
      }
      // close model component
      this.mxgraphreset = false;
      return false;
    },
    /**
     * click the tab and navigate to the corresponding path and model
     * @param {number} index    - the index of the array for tabs
     * @fires module:store~actions:updateactivetab
     */
    clickactivetab(index) {
      let data = this.getdata;
      let projectname = "";
      let foldername = data[
        this.getmodel_component_index
      ].data.nodeName.replace(/\s+/g, "");
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].data.nodeId ===
          data[this.getmodel_component_index].data.projectId
        )
          projectname = data[i].data.nodeName;
      }
      this.$router.push(
        "/models/" +
          projectname +
          "/" +
          foldername +
          "/" +
          getModelInfo()["gmodels"][index]
      );
      this.$store.dispatch("updateactivetab", getModelInfo()["gmodels"][index]);
    }
  },
  computed: {
    /**
     * @returns	{string} activetab in the store
     */
    getactivetab() {
      return this.$store.getters.getactivetab;
    },
    /**
     * @returns {array} tree data in the store
     */
    getdata() {
      return this.$store.getters.getdata;
    },
    /**
     * @returns	{string} model_component in the store
     */
    getmodel_component() {
      return this.$store.getters.getmodelcomponent;
    },
    /**
     * @returns {number} the index of current folder in the store
     */
    getmodel_component_index() {
      return this.$store.getters.getmodelcomponentindex;
    }
  },
  mounted() {
    Bus.$on("folderSelected", function(folder) {});
    /**
     * reset the model component
     * @deprecated
     */
    Bus.$on("resetall", data => {
      Bus.$emit("disablegraph", false);
      this.mxgraphreset = false;
      Vue.nextTick(() => {
        this.mxgraphreset = true;
        this.model_component = data;
        localStorage.clear();
      }, 100);
    });
    //update activetab
    if (this.$route["params"]["type"] != "default") {
      this.$store.dispatch("updateactivetab", this.$route["params"]["type"]);
    }
  },
  watch: {
    $route(to, from) {
      //update activetab
      if (to["params"]["type"] != "default") {
        this.$store.dispatch("updateactivetab", to["params"]["type"]);
      }
    }
  }
};
</script>

<style scoped>
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.p20 {
  padding-bottom: 20px;
}

.container {
  /* min-width: 1100px; */
  margin: 10px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9em;
  /* color: #888; */
}

.acti {
  border-bottom: 1px solid black;
}
</style>