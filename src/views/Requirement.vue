<template>
  <div class="container px-1">
    <div class="border-bottom text-left row">
        <div class="col">
            <h2 class="h2">{{ $t("app_menu_requirements") }}</h2>
        </div>
        <div class="col text-right">
            <button type="button" class="btn btn-secondary btn-sm align-middle" 
            data-toggle="modal" data-target="#Modal">Generate Requirement</button>
       </div>
    </div>

    <div class="card text-left my-2">
      <img class="card-img-top" src="holder.js/100px180/" alt="">
      <div class="card-body">
        <h4 class="card-title">Requirement variamos</h4>
        <form>
            <div class="row">
                <div class="col">
                     <label for="requirementType">Requirement Type</label>
                     <select id="requirementType" class="form-control">
                        <option selected>functional requirement</option>
                        <option>Quality requirement</option>
                        <option>restriction requirement</option>
                    </select>
                </div>
                <div class="col">
                    <label for="systemActivity">System Activity</label>
                    <input id="systemActivity" type="text" class="form-control" placeholder="System Activity">
                </div>
            </div>
            <div class="row">
                <div class="col">
                     <label for="conditionType">Condition Type</label>
                     <select id="conditionType" class="form-control">
                        <option selected>Logical Condition</option>
                        <option>None</option>
                     </select>
                </div>
                <div class="col">
                     <label for="condition">Condition</label>
                     <input id="condition" type="text" class="form-control" placeholder="Condition">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="scopeRequirement">Scope of Requirement</label>
                     <select id="scopeRequirement" class="form-control">
                        <option selected>Family of Systems</option>
                        <option>System</option>
                        <option>System Component</option>
                     </select>
                </div>
                <div class="col">
                    <label for="reachLp">Reach (LP)</label>
                     <select id="reachLp" class="form-control">
                        <option selected>None</option>
                        <option>All Systems</option>
                        <option>Some Systems</option>
                     </select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="systemName">System Name(or Family of Systems)</label>
                    <input id="systemName" type="text" class="form-control" placeholder="System Name">
                </div>
                <div class="col">
                    <label for="priorityRequirement">Priority of the Requirement</label>
                    <select id="priorityRequirement" class="form-control">
                        <option>Essential</option>
                        <option>Desirable</option>
                        <option>Recommended</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="processVerb">Process Verb</label>
                    <input id="processVerb" type="text" class="form-control" placeholder="Process Verb">
                </div>
                <div class="col">
                    <label for="user">User or External Interface</label>
                    <input id="user" type="text" class="form-control" placeholder="User or External Interface">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="sinceToward">Since/Toward (External Interface)</label>
                    <select id="sinceToward" class="form-control">
                        <option>Since</option>
                        <option>Toward</option>
                    </select>
                </div>
                
                <div class="col">
                    <label for="rank">Rank</label>
                    <input id="rank" type="text" class="form-control" placeholder="Rank">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="object">Object</label>
                    <input id="object" type="text" class="form-control" placeholder="Object">
                </div>                
                <div class="col">
                    <label for="adverbs">Adverbs and Complements of the Object</label>
                    <input id="adverbs" type="text" class="form-control" placeholder="Adverbs">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="conditionObject">Condition of the object</label>
                    <input id="conditionObject" class="form-control" placeholder="Condition of the Object">
                </div>
                <div class="col">
                    <label for="criteria">Verification criteria</label>
                    <input id="criteria" class="form-control" placeholder="Verification criteria">
                </div>
            </div>
        </form>
      </div>
    </div>
   
<div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ModalLabel">Requirement</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Requirement in Process....
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

  </div>
</template>



<script>
export default {
    name: 'Requirement',
    data() {
        return {}
    },
}
</script>