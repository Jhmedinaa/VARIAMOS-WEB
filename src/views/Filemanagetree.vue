<template>
  <div>
    <!-- Create new proyect -->
    <div class="text-center my-2">
      <button
        type="button"
        class="btn btn-outline-dark btn-sm"
        style="border-radius: 1.5em;"
        data-toggle="modal"
        data-target="#modal"
      >
        <i class="fa fa-plus"></i>
        {{ $t('filemanagement_addproject_button') }}
      </button>
    </div>

    <div class="text-center my-4" v-if="isCreated">
      <b-tree-view
        class="text-black"
        :data="treeData"
        ref="tree"
        :contextMenuItems="contextMenuItems"
        :showIcons="true"
        @nodeSelect="nodeSelect"
        @contextMenuItemSelect="menuItemSelected"
        prependIconClass="fa"
      ></b-tree-view>
    </div>

    <div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                class="modal-title"
                id="exampleModalLongTitle"
              >{{$t("filemanagement_addproject_label")}}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <input
                type="text"
                class="form-control"
                maxlength="70"
                v-model="proyectName"
                :placeholder="$t('filemanagement_addproject_context')"
                data-test="newprojectmodalinput"
              />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button
                type="button"
                class="btn btn-primary"
                :labelProp="nodeLabelProp"
                @click="createProyect"
                data-dismiss="modal"
              >Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { getModelInfo, getModels } from "../assets/js/common/treeview-json";
import Bus from "../assets/js/common/bus";

export default {
  components: {},
  data: function() {
    return {
      proyectName: "",
      errormessage: "",
      nodeLabelProp: {
        type: String,
        default: "name"
      },
      treeData: [],
      contextMenuItems: [
        { code: "DELETE_NODE", label: "Delete node" },
        {
          code: "ADD_CHILD_NODE",
          label: "Add child"
        },
        { code: "RENAME_NODE", label: "Rename" }
      ],
      selectedNode: null,
      isCreated: false
    };
  },
  methods: {
    //Cambiar nombre del proyecto
    createProyect() {
      //Verficar si existe un proyecto
      if (this.treeData.length == 0) {
        this.treeData = getModelInfo();

        this.treeData[0].name = this.proyectName;
        this.$nextTick(function() {
          console.log(this.$el.textContent); // => 'updated'
        });
        this.isCreated = true;
      } else {
        $("#AppMessage span").text(this.$t("filemanagement_addproject_error3"));
        $("#AppMessage span")
          .first()
          .fadeIn("slow");
      }
    },
    nodeSelect(node, isSelected) {
      if (isSelected) {
        if (node.data.id == 1) {
          return;
        }

        if (node.data.id > 3) {
          if (node.data.type == "model") {
            this.$router.push(
              "/models/" +
                this.proyectName +
                "/" +
                node.data.folder +
                "-" +
                this.proyectName +
                "/" +
                node.data.name
            );
          } else if (node.data.type == "form") {
            this.$router.push(
              "/forms/" +
                this.proyectName +
                "/" +
                node.data.folder +
                "-" +
                this.proyectName +
                "/" +
                node.data.name
            );
          }
          //Para pasar objetos entre objetos

          Bus.$emit("proyectName", this.proyectName);
          Bus.$emit("itemSelect", JSON.stringify(node.data));
        } else {
          var defaultView = node.data.children[0];
          this.$router.push(
            "/models/" +
              this.proyectName +
              "/" +
              defaultView.folder +
              "-" +
              this.proyectName +
              "/" +
              defaultView.name
          );
          //Para pasar objetos entre objetos
          Bus.$emit("itemSelect", JSON.stringify(defaultView));
        }
      } else if (node.data === this.selectedNode) {
        this.selectedNode = null;
      }
    },
    menuItemSelected(item, node) {
      if (item.code === "DELETE_NODE") {
        if (node.data.id === 1) {
          this.$router.push("/models/default/default/default");
        }
      }
    },
    deleteNode(nodeData) {
      let nodes = this.treeData;
      let idx = nodes.indexOf(nodeData);
      nodes.splice(idx, 1);
      this.$router.push("/models/default/default/default");
    }
  },
  mounted() {
    if (localStorage.proyectName){
       this.proyectName = localStorage.proyectName;
       this.createProyect();
    }

  },
  watch: {
    proyectName(proyectName) {
      localStorage.proyectName = proyectName;
    }
  }
};
</script>

<style scoped>
</style>
