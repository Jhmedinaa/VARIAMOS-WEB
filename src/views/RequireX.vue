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
            <Button type="#17233d" color="#17233d">
              <Icon type="ios-add" size="24"/>Add Requirement
              <Icon type="md-arrow-dropdown"/>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="domain">Domain</DropdownItem>
              <DropdownItem name="aplication">Application</DropdownItem>
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
        <Table :columns="requirementsTable" :data="data9"></Table>
      </div>
    </Card>

    <Modal
      on-visible-change="onShowModal"
      v-model="modal1"
      title="Common Modal dialog box title"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Scroll>
        <router-view></router-view>
      </Scroll>
    </Modal>
  </Content>
</template>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/iview/dist/iview.min.js"></script>
<script>
import requireApp from "./RequireXApplication";

export default {
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
      modal1: false
    };
  },
  methods: {
    onSelectedRequirement(name) {
      if ((name = "domain")) {
        this.modal1 = true;
      }
    },
    onShowModal() {
      this.$router.push("/requirex/application");
    }
  }
};
</script>