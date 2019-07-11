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
              <Icon type="ios-add" size="24" />Create Requirement
              <Icon type="md-arrow-dropdown" />
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="domain">Domain</DropdownItem>
              <DropdownItem name="application">Application</DropdownItem>
              <DropdownItem :name="$t('requirex_adaptation')">{{$t('requirex_adaptation')}}</DropdownItem>
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
                <Icon type="ios-add" size="24" />Add
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
                <Icon type="ios-add" size="24" />Add
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
                <Icon type="ios-add" size="24" />Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Row :style="{margin: '2em 0'}">
        <Col span="3">
          <p>Requirements</p>
        </Col>
        <Col span="16"></Col>
      </Row>

      <div :style="{margin: '1em 0'}">
        <Table
          :columns="requirementsTable"
          :data="requirementsTableCollection"
          no-data-text="Sin Datos"
        ></Table>
      </div>

      <div class="container text-right">
        <button type="button" class="btn btn-danger" @click="onGeneratePdf">Generarte Pdf</button>
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

    <app-adaptation  :dialog="dialogAdaptation"
      @onAdaptationCancel="dialogAdaptation = $event">
    </app-adaptation>
  </Content>
</template>

<script>
import application from "../components/requirex/RequireXApplication";
import adaptation from "../components/requirex/RequireXAdaptation";
import domain from "../components/requirex/RequireXDomain";

import expandRow from "../components/requirex/components/TableExpand";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default {
  components: {
    "app-adaptation": adaptation,
    "app-application": application,
    "app-domain": domain,
    expandRow
  },
  data() {
    return {
      requirementApplication: [Object],
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
      dialogAdaptation: false,
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
        this.dialogAdaptation = true;
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
        this.requirementsTableCollection[0].lastTime = new Date()
          .toISOString()
          .slice(0, 10);
        this.requirementDomain = new Object();
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
        this.requirementsTableCollection[1].lastTime = new Date()
          .toISOString()
          .slice(0, 10);
        this.requirementApplication = new Object();
      } else if (type == 3) {
      }
    },
    onShowModal() {
      // this.$router.push("/requirex/application");
    },
    onGeneratePdf() {
      var domainCount = this.requirementsTableCollection[0].amount;
      var applicationCount = this.requirementsTableCollection[1].amount;
      var linea = 20;
      var idCount = 1;
      var total = domainCount + applicationCount;
      var doc = new jsPDF();

      //Titulo
      doc.setFontSize(22);
      doc.text(20, linea, "Variamos - RequireX");

      if (total > 0) {
        linea += 20;

        //Sub titulo
        if (domainCount > 0) {
          doc.setFontSize(16);
          doc.text(20, linea, this.$t("requirex_domain_tittle") + "s");
          linea += 10;

          var vec = [];
          for (var i = 0; i < domainCount; i++) {
            var item = {
              id: "R." + idCount,
              system: this.requirementsTableCollection[0].listRequirements[i].systemName, 
              name: this.requirementsTableCollection[0].listRequirements[i]
                .name,
              requirement: this.requirementsTableCollection[0].listRequirements[
                i
              ].msg,
              date: this.requirementsTableCollection[0].lastTime
            };

            vec.push(item);
            idCount++;
          }

          doc.autoTable({
            columns: [
              { header: "Id", dataKey: "id" },
              { header: "Name", dataKey: "name" },
              { header: "Requirement", dataKey: "requirement" },
              { header: "Date", dataKey: "date" }
            ],
            body: vec,
            startY: linea,
            theme: "grid"
          });
        }

        if (applicationCount > 0) {
          doc.setFontSize(16);
          doc.text(20, linea, this.$t("requirex_application_tittle") + "s");
          linea += 10;
          
          var vec = [];
          for (var i = 0; i < applicationCount; i++) {
            var item = {
              id: "R." + idCount,
              name: this.requirementsTableCollection[1].listRequirements[i]
                .name,
              requirement: this.requirementsTableCollection[1].listRequirements[
                i
              ].msg,
              date: this.requirementsTableCollection[1].lastTime
            };

            vec.push(item);
            idCount++;
          }

          doc.autoTable({
            columns: [
              { header: "Id", dataKey: "id" },
              { header: "System", dataKey: "system" },
              { header: "Name", dataKey: "name" },
              { header: "Requirement", dataKey: "requirement" },
              { header: "Date", dataKey: "date" }
            ],
            body: vec,
            startY: linea,
            theme: "grid"
          });
        }
        doc.save("requirement.pdf");
      } else {
        this.$Message.error("There are no requirements to generate!");
      }
    }
  }
};
</script>