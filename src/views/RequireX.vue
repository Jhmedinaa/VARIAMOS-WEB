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

      <div :style="{margin: '1em 0'}">
        <Table :columns="requirementsTable" :data="requirementsTable"></Table>
      </div>
    </Card>
    
    <app-application :dialog="dialog" @onApplicationCancel="dialog = $event"></app-application>
 

  </Content>
</template>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<script>

import application from "../components/requirex/RequireXApplication";
import adaptation from "../components/requirex/RequireXAdaptation";

export default {
  components: {
    "app-adaptation": adaptation,
    "app-application" : application,
  },
  data() {
    return {
      requirementsTable: [
        {
          title: "Requirement Type",
          key: "reqType"
        },
        {
          title: "Name",
          key: "name"
        },
        {
          title: "System",
          key: "systemName"
        }
      ],
      dialog: false
    };
  },
  methods: {
    onSelectedRequirement(name) {
      //alert(name);
      if ((name == "domain")) {
       // this.dialog = true;
      }else if((name == "application")){
          this.dialog = true;
      }else if (name == "adaptation"){

      }
    },
    onShowModal() {
     // this.$router.push("/requirex/application");
    }
  }
};
</script>