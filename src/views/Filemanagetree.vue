<template>
  <div>
    <!-- Create new proyect -->
    <div class="text-center">
      <button type="button" class="btn btn-light btn-sm" @click="modal=!modal">
        <i class="fa fa-plus"></i>
        {{ $t('filemanagement_addproject_button') }}
      </button>
    </div>

    <div class="text-center my-4" v-if="isCreated">
      <b-tree-view
        class="text-white"
        :data="treeData"
        :contextMenuItems="contextMenuItems"
        :showIcons="true"
		prependIconClass="fa"
      ></b-tree-view>
    </div>

    <div>
      <Modal
        v-model="modal"
        :title="$t('filemanagement_addproject_title')"
        class-name="vertical-center-modal"
        width="600"
        ok-text="OK"
        cancel-text="Cancel"
        @on-ok="createProyect"
        data-test="newprojectmodal"
      >
        <div class="form-horizontal">
          <div class="form-group">
            <label class="col-md-3 control-label">
              <em>*</em>
              {{$t("filemanagement_addproject_label")}}
            </label>
            <div class="col-md-9">
              <input
                type="text"
                class="form-control"
                maxlength="70"
                v-model="proyectName"
                :placeholder="$t('filemanagement_addproject_context')"
                data-test="newprojectmodalinput"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: function() {
    return {
      proyectName: "",
      treeData: [   {
          id: 1,
          name: "Users",
          icon: "fa-folder"
        },
        {
          id: 2,
          name: "Books",
          icon: "fa-book",
          children: [
            {
              id: 3,
              name: "Neptune",
              icon: "fa-book"
            }
          ]
        },
        {
          id: 5,
          name: "Vehicles",
          children: [
            {
              id: 23,
              name: "Cars",
              icon: "fa-car"
            },
            {
              id: 34,
              name: "Trucks",
              icon: "fa-truck",
              children: [
                {
                  id: 101,
                  name: "Mars"
                }
              ]
            }
          ]
        }],
      baseTreeData: [
        {
          id: 1,
          name: "Users",
          icon: "fa-users"
        },
        {
          id: 2,
          name: "Books",
          icon: "fa-book",
          children: [
            {
              id: 3,
              name: "Neptune",
              icon: "fa-book"
            }
          ]
        },
        {
          id: 5,
          name: "Vehicles",
          children: [
            {
              id: 23,
              name: "Cars",
              icon: "fa-car"
            },
            {
              id: 34,
              name: "Trucks",
              icon: "fa-truck",
              children: [
                {
                  id: 101,
                  name: "Mars"
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
      modal: false,
      isCreated: false
    };
  },
  methods: {
    //Cambiar nombre del proyecto
    createProyect() {
      alert(this.treeData.length);
      if (this.treeData.length == 0) {
        this.treeData = this.baseTreeData;
      }

      this.treeData[0].name = this.proyectName;
      this.$nextTick(function() {
        console.log(this.$el.textContent); // => 'updated'
      });
      this.isCreated = true;
    }
  }
};
</script>

<style scoped>
</style>
