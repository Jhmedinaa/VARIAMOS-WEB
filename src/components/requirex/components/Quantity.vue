<template>
    <div>
        <form-item :label="$t('requirex_requirement_affected_systems_label')" prop="affectedSystems">
            <i-select    
            :value="affectedSystems"
        :placeholder="$t('requirex_select')"
        @on-change="onAffectedSystemChange">
                 <i-option
          :value="$t('requirex_requirement_affected_systems1')"
        >{{ $t('requirex_requirement_affected_systems1')}}</i-option>
         <i-option
          :value="$t('requirex_requirement_affected_systems2')"
        >{{ $t('requirex_requirement_affected_systems2')}}</i-option>
         <i-option
          :value="$t('requirex_requirement_affected_systems3')"
        >{{ $t('requirex_requirement_affected_systems3')}}</i-option>
            </i-select>
        </form-item>
    </div>
</template>

<script>
export default {
    props:{
      affectedSystems: {
      type: [String],
      required: true
    }
    },
    data(){
        return {
            affected: ""
        }
    }, 
    methods:{
        onAffectedSystemChange(event){
            this.affected = event;
            this.$emit("onAffectedSystemChange", this.affected);
        }
    }
}
</script>

