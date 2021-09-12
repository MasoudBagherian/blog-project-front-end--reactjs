import React, { Component, Fragment } from 'react';
import Modal from './../UI/Modal/Modal';
import Loader from './../UI/Loader/Loader';
import ModalAlert from '../UI/Modal/ModalAlert/ModalAlert';

const withAjax = (WrappedComponent, axios, errInfo) =>
  class extends Component {
    constructor(props) {
      super(props);
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ err: false, loading: true });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => {
          this.setState({ loading: false });
          return res;
        },
        (err) => {
          this.setState({ loading: false });
          if (!errInfo) {
            this.setState({ err: true });
          } else {
            if (err.response) {
              if (err.response.data.errCode !== errInfo.errCode) {
                this.setState({ err: true });
              }
            } else {
              this.setState({ err: true });
            }
          }
          return Promise.reject(err);
        }
      );
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    state = {
      err: false,
      loading: false,
    };
    render() {
      console.log('errAjax', this.state.err);
      return (
        <Fragment>
          {this.state.loading ? <Loader /> : null}
          <Modal
            show={this.state.err}
            backdropClickHandler={() => this.setState({ err: false })}>
            <ModalAlert message="There is something wrong with server" />
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };

export default withAjax;
