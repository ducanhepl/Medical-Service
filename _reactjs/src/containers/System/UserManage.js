import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getUserInfor,
  createUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { reject } from "lodash";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenUserModal: false,
      isOpenEditUserModal: false,
      userInfor: "",
    };
  }

  async componentDidMount() {
    await this.getUserInforFromReact();
  }

  getUserInforFromReact = async () => {
    let response = await getUserInfor("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    // console.log('get user infor from expressjs',this.state.arrUsers);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenUserModal: true,
    });
  };

  handleEditUser = (user) => {
    this.setState({
      isOpenEditUserModal: true,
      userInfor: user,
    });
  };

  toggleUserModal = () => {
    this.setState({
      isOpenUserModal: !this.state.isOpenUserModal,
    });
  };

  toggleEditUserModal = () => {
    this.setState({
      isOpenEditUserModal: !this.state.isOpenEditUserModal,
    });
  };

  createUser = async (data) => {
    try {
      let response = await createUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getUserInforFromReact();
        this.setState({
          isOpenUserModal: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  editUser = async (data) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getUserInforFromReact();
        this.setState({
          isOpenEditUserModal: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getUserInforFromReact();
      } else {
        alert(response.message);
      }
    } catch (e) {
      reject(e);
    }
  };

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenUserModal}
          toggleFromParent={this.toggleUserModal}
          createUser={this.createUser}
        />
        {this.state.isOpenEditUserModal && (
          <ModalEditUser
            isOpen={this.state.isOpenEditUserModal}
            toggleFromParent={this.toggleEditUserModal}
            currentUser={this.state.userInfor}
            editUser={this.editUser}
          />
        )}
        <div className="title text-center">Manage user react</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fa fa-plus"></i> Add new users
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>Firtname</th>
                <th>Lastname</th>
                <th>Address</th>
                <th>Phone number</th>
                <th>Gender</th>
                {/* <th>Role ID</th> */}
                <th>Actions</th>
              </tr>

              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.gender}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => {
                            this.handleEditUser(item);
                          }}
                        >
                          <i class="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => {
                            this.handleDeleteUser(item);
                          }}
                        >
                          <i class="fa fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
