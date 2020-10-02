import React, { Component } from "react";
import "./App.css";
import {
  PageHeader,
  Button,
  Descriptions,
  Tabs,
  Empty,
  Table,
  Tag,
  Statistic
} from "antd";
import {
  SyncOutlined,
  PicRightOutlined,
  ExclamationOutlined,
  LoadingOutlined,
  CloseSquareOutlined,
  DeleteRowOutlined,
  CheckCircleTwoTone
} from "@ant-design/icons";
import {
  getcreatedjobs,
  getqueuedjobs,
  gethaltjobs,
  getabortjobs,
  getdeletedjobs,
  getrunningjobs,
  getsuccessjobs,
  api_base_url,
  api_token_url
} from "./components/global_api";

const { Countdown } = Statistic;
const { TabPane } = Tabs;

const columns = [
  {
    title: "Name_of_Job",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Time_Needed",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tags",
    key: "enabled",
    dataIndex: "enabled",
    render: text => {
      if (text === true) {
        return <Tag color="processing">Processed</Tag>;
      } else {
        return <Tag color="success">Completed</Tag>;
      }
    }
  },
  {
    title: "Other Actions",
    dataIndex: "others",
    key: "others"
  }
];

const columns_created = [
  {
    title: "Name_of_Job",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Time_Needed",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tags",
    key: "enabled",
    dataIndex: "enabled",
    render: text => {
      if (text === true) {
        return <Tag color="processing">Waitng for the Thread Couner</Tag>;
      } else {
        return <Tag color="success">Sent to Queue</Tag>;
      }
    }
  },
  {
    title: "Other Actions",
    dataIndex: "others",
    key: "others"
  }
];

const columns_queued = [
  {
    title: "Name_of_Job",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Time_Needed",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tags",
    key: "enabled",
    dataIndex: "enabled",
    render: text => {
      if (text === true) {
        return <Tag color="processing">Waiting in queue</Tag>;
      } else {
        return <Tag color="success">Sent to Running Worker</Tag>;
      }
    }
  },
  {
    title: "Other Actions",
    dataIndex: "others",
    key: "others"
  }
];

const columns_running = [
  {
    title: "Name_of_Job",
    dataIndex: "name",
    key: "name",
    render: text => <a>{text}</a>
  },
  {
    title: "Total_Time_Allocated",
    dataIndex: "time",
    key: "time"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tags",
    key: "enabled",
    dataIndex: "enabled",
    render: text => {
      if (text === true) {
        return <Tag color="processing">Running</Tag>;
      } else {
        return <Tag color="success">Completed</Tag>;
      }
    }
  },
  {
    title: "Other Actions",
    dataIndex: "others",
    key: "others"
  }
];

//Sample Data to be tested
const data = [
  {
    key: "1",
    name: "Task 1",
    time: 25,
    description: "Task Updated in Queue",
    enabled: "true",
    others: "let's test"
  }
];

class LoggedInDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: [],
      queued: [],
      halted: [],
      aborted: [],
      running: [],
      deleted: [],
      successful: []
    };
  }

  async componentDidMount() {
    const create = await getcreatedjobs();
    this.setState({ created: create });
    const queue = await getqueuedjobs();
    this.setState({ queued: queue });
    console.log("created jobs", create);
    const halt = await gethaltjobs();
    this.setState({ halted: halt });
    console.log("halted jobs", halt);
    const abort = await getabortjobs();
    this.setState({ aborted: abort });
    console.log("aborted jobs", abort);
    const run = await getrunningjobs();
    this.setState({ running: run });
    console.log("running jobs", run);
    const deletee = await getdeletedjobs();
    this.setState({ deleted: deletee });
    console.log("deleted jobs", deletee);
    const success = await getsuccessjobs();
    this.setState({ successful: success });
    console.log("successful jobs", success);
  }

  handle_created = () => {
    fetch(api_base_url + "created/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ created: json }));
  };

  handle_queued = () => {
    fetch(api_base_url + "queued/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ queued: json }));
  };

  handle_running = () => {
    fetch(api_base_url + "running/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ running: json }));
  };

  handle_successful = () => {
    fetch(api_base_url + "successful/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ successful: json }));
  };

  handle_halted = () => {
    fetch(api_base_url + "halt/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ halted: json }));
  };

  handle_aborted = () => {
    fetch(api_base_url + "abort/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ aborted: json }));
  };

  handle_deleted = () => {
    fetch(api_base_url + "deleted/", {
      mode: "cors",
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`
      }
    })
      .then(function(res) {
        if (res.status === 200) {
          var data = {
            refresh: localStorage.getItem("refresh")
          };
          fetch(api_token_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(res => res.json())
            .then(json => {
              localStorage.removeItem("access");
              localStorage.setItem("access", json.access);
            });
        } else {
          localStorage.removeItem("access");
          window.location.reload();
        }
        return res.json();
      })
      .then(json => this.setState({ deleted: json }));
  };

  render() {
    return (
      <div>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            onBack={() => window.location.reload()}
            title="DASHBOARD TO SCHEDULER"
            subTitle="We can monitor jobs here"
            extra={[
              <Button key="3">
                <a
                  href="http://saurabh9495.org:8000/admin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Admin Panel
                </a>
              </Button>,
              <Button key="2" type="primary">
                Home
              </Button>,
              <Button
                key="1"
                type="danger"
                onClick={this.props.Logout}
                className="float-right"
              >
                Logout
              </Button>
            ]}
          >
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Created">
                Saurabh Kumar
              </Descriptions.Item>
              <Descriptions.Item label="Association">
                <a>Sample Project</a>
              </Descriptions.Item>
              <Descriptions.Item label="Creation Time">
                2020-09-28
              </Descriptions.Item>
              <Descriptions.Item label="Effective Time">
                2020-09-30
              </Descriptions.Item>
              <Descriptions.Item label="Remarks">
                It'll monitor Create, Queue, Halt, Run, Abort, Deleted and
                Success Jobs.{" "}
              </Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </div>
        <Tabs defaultActiveKey="1" style={{ marginLeft: "2%" }}>
          <TabPane
            tab={
              <span>
                <SyncOutlined spin />
                <Button onClick={() => this.handle_created()}>
                  Created Jobs
                </Button>
              </span>
            }
            key="1"
          >
            <Table columns={columns_created} dataSource={this.state.created} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <PicRightOutlined />
                <Button onClick={() => this.handle_queued()}>
                  Queued Jobs
                </Button>
              </span>
            }
            key="2"
          >
            <Table columns={columns_queued} dataSource={this.state.queued} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <LoadingOutlined />
                <Button onClick={() => this.handle_running()}>
                  Running Jobs
                </Button>
              </span>
            }
            key="3"
          >
            <Table columns={columns_running} dataSource={this.state.running} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <CheckCircleTwoTone twoToneColor="#52c41a" />
                <Button onClick={() => this.handle_successful()}>
                  Successful Jobs
                </Button>
              </span>
            }
            key="4"
          >
            <Table columns={columns} dataSource={this.state.successful} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <ExclamationOutlined />
                <Button onClick={() => this.handle_halted()}>
                  halted Jobs
                </Button>
              </span>
            }
            key="5"
          >
            <Table columns={columns} dataSource={this.state.halted} />
          </TabPane>

          <TabPane
            tab={
              <span>
                <CloseSquareOutlined />
                <Button onClick={() => this.handle_aborted()}>
                  Aborted Jobs
                </Button>
              </span>
            }
            key="6"
          >
            <Table columns={columns} dataSource={this.state.aborted} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <DeleteRowOutlined />
                <Button onClick={() => this.handle_deleted()}>
                  Deleted Jobs
                </Button>
              </span>
            }
            key="7"
          >
            <Table columns={columns} dataSource={this.state.deleted} />
          </TabPane>
        </Tabs>
        <Empty />
      </div>
    );
  }
}

export default LoggedInDashboard;
