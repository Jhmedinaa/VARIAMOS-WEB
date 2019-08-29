<template>
  <div>
    <!-- <CellGroup>
      <Cell v-for="r in row.listRequirements" :key="r.id"  :title="r.requirementNumber + ' '+ r.name" :label="r.msg"/>
    </CellGroup>-->

    <div class="list-group">
      <a
        href="#"
        class="list-group-item list-group-item-action flex-column align-items-start"
        v-for="r in row.listRequirements"
        :key="r._id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{r.requirementNumber + ' '+ r.name}}</h5>
          <small>
            <button
              type="button"
              class="btn btn-link danger text-danger"
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('requirex_delete')"
              @click="update(r)"
            >
              <Icon type="ios-trash-outline" size="25" />
            </button>
            <button
              type="button"
              class="btn btn-link btn-sm"
              data-toggle="tooltip"
              data-placement="top"
              :title="$t('requirex_edit')"
              @click="edit(r)"
            >
              <Icon type="md-create" size="25" />
            </button>
          </small>
        </div>
        <p class="mb-1">{{r.msg}}.</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object
  },
  methods: {
    edit(requirement) {
      var type = requirement.requirementNumber.split(".");
      console.log(type);
      if (type[0] == "D") {
         this.$router.push({ name: "requirexdomainedit", params: {id: requirement._id}});
      } else if (type[0] == "P") {
        this.$router.push({ name: "requirexapplicationedit", params: {id: requirement._id}});
      } else if (type[0] == "S") {
         this.$router.push({ name: "requirexadaptationedit", params: {id: requirement._id}});
      }
    },
    update(requirement) {
      var type = requirement.requirementNumber.split(".");
      requirement.estado = false;

      if (type[0] == "D") {
        let uri = `http://localhost:4000/domains/delete/${requirement._id}`;
        this.axios.post(uri, requirement).then(() => {
          //Eliminar item de la lista domains
          this.row.listRequirements.splice(
            this.row.listRequirements.indexOf(requirement._id),
            1
          );
        });
      } else if (type[0] == "P") {
        let uri = `http://localhost:4000/applications/delete/${requirement._id}`;
        this.axios.post(uri, requirement).then(() => {
          //Eliminar item de la lista applications
          this.row.listRequirements.splice(
            this.row.listRequirements.indexOf(requirement._id),
            1
          );
        });
      } else if (type[0] == "S") {
        let uri = `http://localhost:4000/adaptations/delete/${requirement._id}`;
        this.axios.post(uri, requirement).then(() => {
          //Eliminar item de la lista adaptation
          this.row.listRequirements.splice(
            this.row.listRequirements.indexOf(requirement._id),
            1
          );
        });
      }

      /* */
    }
  }
};
</script>