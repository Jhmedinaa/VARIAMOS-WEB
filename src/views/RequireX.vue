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
              <DropdownItem :name="$t('requirex_domain')">{{$t('requirex_domain')}}</DropdownItem>
              <DropdownItem :name="$t('requirex_application')">{{$t('requirex_application')}}</DropdownItem>
              <DropdownItem :name="$t('requirex_adaptation')">{{$t('requirex_adaptation')}}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>

      <Row :style="{margin: '2em 0'}">
        <Col span="3">
          <p>Requirements</p>
        </Col>
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
      @handleSubmit="onApplicationGenerate($event)"
    ></app-application>

    <app-domain
      :dialog="dialogDomain"
      @onDomainCancel="dialogDomain = $event"
      :requirementProp="requirementDomain"
      @handleSubmit="onDomainGenerate($event)"
    ></app-domain>

    <app-adaptation
      :dialog="dialogAdaptation"
      @onAdaptationCancel="dialogAdaptation = $event"
      :requirementProp="requirementAdaptation"
      @handleSubmit="onSeftAdaptableGenerate($event)"
    ></app-adaptation>
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
      requirementAdaptation: [Object],
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
    onDomainGenerate(requirement) {
      this.requirementDomain = requirement;
      var newRequire = {
        reqType: this.requirementDomain.reqType,
        name: this.requirementDomain.name,
        condition: this.requirementDomain.condition,
        conditionDescription: this.requirementDomain.conditionDescription,
        imperative: this.requirementDomain.imperative,
        systemName: this.requirementDomain.systemName,
        systemActivity: this.requirementDomain.systemActivity,
        user: this.requirementDomain.user,
        processVerb: this.requirementDomain.processVerb,
        object: this.requirementDomain.object,
        system: this.requirementDomain.system,
        from: this.requirementDomain.from,
        processVerb: this.requirementDomain.processVerb,
        systemCondition: this.requirementDomain.systemCondition,
        systemConditionDescription: this.requirementDomain
          .systemConditionDescription,
        msg: this.requirementDomain.msg
      };
      this.requirementsTableCollection[0].listRequirements.push(newRequire);
      this.requirementsTableCollection[0].amount += 1;
      this.requirementsTableCollection[0].lastTime = new Date()
        .toISOString()
        .slice(0, 10);
      this.requirementApplication = new Object();
    },
    onApplicationGenerate(requirement) {
      this.requirementApplication = requirement;
      var newRequire = {
        reqType: this.requirementApplication.reqType,
        name: this.requirementApplication.name,
        condition: this.requirementApplication.condition,
        conditionDescription: this.requirementApplication.conditionDescription,
        imperative: this.requirementApplication.imperative,
        systemName: this.requirementApplication.systemName,
        systemActivity: this.requirementApplication.systemActivity,
        user: this.requirementApplication.user,
        processVerb: this.requirementApplication.processVerb,
        object: this.requirementApplication.object,
        system: this.requirementApplication.system,
        from: this.requirementApplication.from,
        processVerb: this.requirementApplication.processVerb,
        systemCondition: this.requirementApplication.systemCondition,
        systemConditionDescription: this.requirementApplication
          .systemConditionDescription,
        msg: this.requirementApplication.msg
      };
      this.requirementsTableCollection[1].listRequirements.push(newRequire);
      this.requirementsTableCollection[1].amount += 1;
      this.requirementsTableCollection[1].lastTime = new Date()
        .toISOString()
        .slice(0, 10);
      this.requirementDomain = new Object();
    },
    onSeftAdaptableGenerate(requirement) {
      this.requirementAdaptation = requirement;
      var newRequire = {
        reqType: this.requirementAdaptation.reqType,
        name: this.requirementAdaptation.name,
        condition: this.requirementAdaptation.condition,
        conditionDescription: this.requirementAdaptation.conditionDescription,
        imperative: this.requirementAdaptation.imperative,
        systemName: this.requirementAdaptation.systemName,
        processVerb: this.requirementAdaptation.processVerb,
        object: this.requirementAdaptation.object,
        system: this.requirementAdaptation.system,
        relaxing: this.requirementAdaptation.relaxing,
        postBehaviour: this.requirementAdaptation.postBehaviour,
        event: this.requirementAdaptation.event,
        timneInterval: this.requirementAdaptation.timneInterval,
        units: this.requirementAdaptation.units,
        quantity: this.requirementAdaptation.quantity,
        frecuency: this.requirementAdaptation.frecuency,
        msg: this.requirementAdaptation.msg,
        isComplete: this.requirementAdaptation.isComplete
      };

      this.requirementsTableCollection[2].listRequirements.push(newRequire);
      this.requirementsTableCollection[2].amount += 1;
      this.requirementsTableCollection[2].lastTime = new Date()
        .toISOString()
        .slice(0, 10);
      this.requirementAdaptation = new Object();
    },

    onSelectedRequirement(name) {
      //alert(name);
      if (name == this.$t("requirex_domain")) {
        this.dialogDomain = true;
      } else if (name == this.$t("requirex_application")) {
        this.dialogApplication = true;
      } else if (name == this.$t("requirex_adaptation")) {
        this.dialogAdaptation = true;
      }
    },
    onShowModal() {
      // this.$router.push("/requirex/application");
    },
    onGeneratePdf() {
      var domainCount = this.requirementsTableCollection[0].amount;
      var applicationCount = this.requirementsTableCollection[1].amount;
      var adaptationCount = this.requirementsTableCollection[2].amount;

      var linea = 20;
      var idCount = 1;
      var total = domainCount + applicationCount + adaptationCount;
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
              id: "D.R." + idCount,
              system: this.requirementsTableCollection[0].listRequirements[i]
                .systemName,
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
          linea += 15;
          linea += domainCount * 15;
        }

        if (applicationCount > 0) {
          doc.setFontSize(16);
          doc.text(20, linea, this.$t("requirex_application_tittle") + "s");
          linea += 10;

          var vec = [];
          for (var i = 0; i < applicationCount; i++) {
            var item = {
              id: "P.R." + idCount,
              system: this.requirementsTableCollection[1].listRequirements[i]
                .systemName,
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

          linea += 15;
          linea += applicationCount * 15;
        }

        //Sub titulo
        if (adaptationCount > 0) {
          doc.setFontSize(16);
          doc.text(20, linea, this.$t("requirex_adaptation_tittle") + "s");
          linea += 10;

          var vec = [];
          for (var i = 0; i < adaptationCount; i++) {
            var item = {
              id: "A.R." + idCount,
              system: this.requirementsTableCollection[2].listRequirements[i]
                .systemName,
              name: this.requirementsTableCollection[2].listRequirements[i]
                .name,
              requirement: this.requirementsTableCollection[2].listRequirements[
                i
              ].msg,
              date: this.requirementsTableCollection[2].lastTime
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
          linea += 15;
          linea += domainCount * 15;
        }
        doc.save("requirement.pdf");
      } else {
        this.$Message.error("There are no requirements to generate!");
      }
    }
  }
};
</script>