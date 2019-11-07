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
        :contextMenuItems="contextMenuItems"
        :showIcons="true"
        @nodeSelect="nodeSelect"
        @deleteNode="deleteNode"
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

$(document).ready(function() {
  $(".toast")
    .toast({ delay: 1000 })
    .toast("show");
});

export default {
  components: {},
  data: function() {
    return {
      proyectName: "",
      errormessage: "",
      treeData: [],
      baseTreeData: [
        {
          id: 1,
          name: "",
          icon: "fa-folder",
          children: [
            {
              id: 2,
              name: "Domain",
              icon: "fa-globe-americas",
              children: [
                {
                  id: 3,
                  name: "feature"
                },
                {
                  id: 4,
                  name: "component"
                },
                {
                  id: 5,
                  name: "binding_feature_component"
                },
                {
                  id: 6,
                  name: "istar"
                }
              ]
            },
            {
              id: 7,
              name: "Application",
              icon: "fas fa-mobile-alt",
              children: [
                {
                  id: 8,
                  name: "Adaptation",
                  icon: "fa-headphones-alt"
                },
                {
                  id: 9,
                  name: "adaptation_state"
                },
                {
                  id: 10,
                  name: "adaptation_hardware"
                },
                {
                  id: 11,
                  name: "adaptation_binding_state_hardware"
                },
                {
                  id: 12,
                  name: "control"
                }
              ]
            }
          ]
        }
      ],
      contextMenuItems: [
        { code: "DELETE_NODE", label: "Delete node" },
        {
          code: "ADD_CHILD_NODE",
          label: "Add child"
        },
        { code: "RENAME_NODE", label: "Rename" }
      ],
      isCreated: false
    };
  },
  methods: {
    //Cambiar nombre del proyecto
    createProyect() {
      //Verficar si existe un proyecto
      if (this.treeData.length == 0) {
        this.treeData = this.baseTreeData;

        this.treeData[0].name = this.proyectName;
        this.$nextTick(function() {
          console.log(this.$el.textContent); // => 'updated'
        });
        this.isCreated = true;
      } else {
        this.errormessage = this.$t("filemanagement_addproject_error3");
        $(".toast").toast("show");
      }
    },
    nodeSelect(node, isSelected) {
      this.$emit("nodeSelect", node, isSelected);
      if (isSelected) {
        console.log("by larry " + node);

        this.$router.push(
          "/models/" + this.proyectName + "/" + "Domain-jhon" + "/" + "feature"
        );
        this.$store.dispatch('setopen', 1);
      }
    },
    deleteNode(nodeData) {
      let nodes = this.treeData;
      let idx = nodes.indexOf(nodeData);
      nodes.splice(idx, 1);
      this.$router.push("/models/default/default/default");
    }
  }
};
</script>

<style scoped>
</style>
