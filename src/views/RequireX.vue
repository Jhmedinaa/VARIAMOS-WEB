<template>
  <Content :style="{padding: '0 30px'}">
    <Breadcrumb :style="{margin: '3px 0'}">
      <BreadcrumbItem>Variamos</BreadcrumbItem>
      <BreadcrumbItem>RequireX</BreadcrumbItem>
    </Breadcrumb>
    <Card>
      <Row :style="{margin: '1em 0'}">
        <Col span="6">
          <Dropdown placement="bottom-start" @on-click="onSelectedRequirement">
            <Button color="#17233d">
              <Icon type="ios-add" size="24"/>Create Requirement
              <Icon type="md-arrow-dropdown"/>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="domain">Domain</DropdownItem>
              <DropdownItem name="application">Application</DropdownItem>
              <DropdownItem name="adaptation">Adaptation</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>

      <div class="row">
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{$t('requirex_domain')}}</h3>
              <p class="card-text">Name : {{requirementDomain.name}}</p>
              <Button @click="onAddRequirement(requirementDomain, 1)">
                <Icon type="ios-add" size="24"/>Add
              </Button>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card" :v-if="isCompleteApplication">
            <div class="card-body">
              <h3 class="card-title">{{$t('requirex_application')}}</h3>
              <p class="card-text">Name : {{requirementApplication.name}}</p>
               <Button @click="onAddRequirement(requirementApplication, 2)">
                <Icon type="ios-add" size="24"/>Add
              </Button>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card">
            <div class="card-body">
              <h3 class="card-title">{{$t('requirex_adaptation')}}</h3>
              <p class="card-text">Text</p>
             <Button @click="onAddRequirement(requirementApplication, 2)">
                <Icon type="ios-add" size="24"/>Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Row :style="{margin: '2em 0'}">
        <Col span="3">
          <p>Requirements</p>
        </Col>
        <Col span="16">
          
        </Col>
      </Row>

      <div :style="{margin: '1em 0'}">
        <Table
          :columns="requirementsTable"
          :data="requirementsTableCollection"
          no-data-text="Sin Datos"
        ></Table>
      </div>

      <div class="container">
        <button type="button" class="btn btn-danger">Generarte Pdf</button>
      </div>

    </Card>

    <app-application
      :dialog="dialogApplication"
      @onApplicationCancel="dialogApplication = $event"
      :requirementProp="requirementApplication"
      @handleSubmit="requirementApplication = $event"
    ></app-application>

    <app-domain
      :dialog="dialogDomain"
      @onDomainCancel="dialogDomain = $event"
      :requirementProp="requirementDomain"
      @handleSubmit="requirementDomain = $event"
    ></app-domain>
  </Content>
</template>

<script>
import application from "../components/requirex/RequireXApplication";
import adaptation from "../components/requirex/RequireXAdaptation";
import domain from "../components/requirex/RequireXDomain";

import expandRow from "../components/requirex/components/TableExpand";

export default {
  components: {
    "app-adaptation": adaptation,
    "app-application": application,
    "app-domain": domain,
    expandRow
  },
  data() {
    return {
      requirementApplication:[Object],
      requirementDomain: [Object],
      requirementsTableCollection: [
        {
          reqType: this.$t("requirex_domain"),
          amount: 0,
          lastTime: "No Data",
          listRequirements: []
        },
        {
          reqType: this.$t("requirex_application"),
          amount: 0,
          lastTime: "No Data",
          listRequirements: []
        },
        {
          reqType: this.$t("requirex_adaptation"),
          amount: 0,
          lastTime: "No Data",
          listRequirements: []
        }
      ],
      requirementsTable: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "Requirement Type",
          key: "reqType"
        },
        {
          title: "Amount",
          key: "amount"
        },
        {
          title: "Last Time",
          key: "lastTime"
        }
      ],
      dialogDomain: false,
      dialogApplication: false,
      isCompleteApplication: false
    };
  },
  methods: {
    onSelectedRequirement(name) {
      //alert(name);
      if (name == "domain") {
        this.dialogDomain = true;
      } else if (name == "application") {
        this.dialogApplication = true;
      } else if (name == "adaptation") {
      }
    },
    onAddRequirement(requirement, type) {
      var require = requirement;

      if (type == 1) {
        var newRequire = {
          reqType: require.reqType,
          name: require.name,
          condition: require.condition,
          conditionDescription: require.conditionDescription,
          imperative: require.imperative,
          systemName: require.systemName,
          systemActivity: require.systemActivity,
          user: require.user,
          processVerb: require.processVerb,
          object: require.object,
          system: require.system,
          from: require.from,
          processVerb: require.processVerb,
          systemCondition: require.systemCondition,
          systemConditionDescription: require.systemConditionDescription,
          msg: require.msg
        };
        this.requirementsTableCollection[0].listRequirements.push(newRequire);
        this.requirementsTableCollection[0].amount += 1;
      } else if (type == 2) {
        var newRequire = {
          reqType: require.reqType,
          name: require.name,
          condition: require.condition,
          conditionDescription: require.conditionDescription,
          imperative: require.imperative,
          systemName: require.systemName,
          systemActivity: require.systemActivity,
          user: require.user,
          processVerb: require.processVerb,
          object: require.object,
          system: require.system,
          from: require.from,
          processVerb: require.processVerb,
          systemCondition: require.systemCondition,
          systemConditionDescription: require.systemConditionDescription,
          msg: require.msg
        };
        this.requirementsTableCollection[1].listRequirements.push(newRequire);
        this.requirementsTableCollection[1].amount += 1;
      }
      this.requirementApplication = new Object;
    },
    onShowModal() {
      // this.$router.push("/requirex/application");
    }
  }
};
</script>