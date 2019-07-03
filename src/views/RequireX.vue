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
              <Icon type="ios-add" size="24"/>Add Requirement
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

      <Row :style="{margin: '2em 0'}">
        <Col span="3">
          <p>Requirements</p>
        </Col>
      </Row>

      <div v-if="requirementApplication">
        <Row :style="{margin: '2em 0'}">
          <Col span="3">
            <pre>{{ requirementApplication.name}}</pre>
            <Button @click="onAddRequirement(requirementApplication)">
              <Icon type="ios-add" size="24"/>Add
            </Button>
          </Col>
        </Row>
      </div>

      <div :style="{margin: '1em 0'}">
        <Table
          :columns="requirementsTable"
          :data="requirementsTableCollection"
          no-data-text="Sin Datos"
        ></Table>
      </div>
    </Card>

    <app-application
      :dialog="dialog"
      @onApplicationCancel="dialog = $event"
      :requirementProp="requirementApplication"
      @handleSubmit="requirementApplication = $event"
    ></app-application>
  </Content>
</template>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<script>
import application from "../components/requirex/RequireXApplication";
import adaptation from "../components/requirex/RequireXAdaptation";
import expandRow from "../components/requirex/components/TableExpand";
export default {
  components: {
    "app-adaptation": adaptation,
    "app-application": application,
    expandRow
  },
  data() {
    return {
      requirementApplication: [Object],
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
      dialog: false
    };
  },
  methods: {
    onSelectedRequirement(name) {
      //alert(name);
      if (name == "domain") {
        // this.dialog = true;
      } else if (name == "application") {
        this.dialog = true;
      } else if (name == "adaptation") {
      }
    },
    onAddRequirement(requirement) {
      var require = requirement;
      this.requirementsTableCollection[0].listRequirements.push(require);
    },
    onShowModal() {
      // this.$router.push("/requirex/application");
    }
  }
};
</script>