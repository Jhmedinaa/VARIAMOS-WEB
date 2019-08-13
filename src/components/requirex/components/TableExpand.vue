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
    update(requirement) {
      var type = requirement.requirementNumber.split(".");
      requirement.estado = false;

      if (type[0] == "P") {
         console.log(requirement.estado);
        let uri = `http://localhost:4000/applications/update/${requirement._id}`;
        this.axios.post(uri, requirement).then(() => {
            console.log(" Hey ");
        });
      }

      /* */
    }
  }
};
</script>