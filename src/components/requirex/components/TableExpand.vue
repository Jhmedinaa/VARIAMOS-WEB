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
        :key="r.id"
      >
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{r.requirementNumber + ' '+ r.name}}</h5>
          <small>
          <button type="button" class="btn btn-link danger text-danger"    data-toggle="tooltip"
            data-placement="top"
            :title="$t('requirex_delete')">
            <Icon type="ios-trash-outline" size="25" />
          </button>
          <button type="button" class="btn btn-link btn-sm"   data-toggle="tooltip"
            data-placement="top"
            :title="$t('requirex_edit')">
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
  }
};
</script>