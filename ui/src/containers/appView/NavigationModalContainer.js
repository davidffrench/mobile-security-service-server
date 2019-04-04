import React from 'react';
import { Button, Modal } from '@patternfly/react-core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleNavigationModal, setAppDetailedIsDirty } from '../../actions/actions-ui';

const NavigationModalContainer = ({ isOpen, targetLocation, title, unblockHistory, children, history, toggleNavigationModal, setAppDetailedIsDirty }) => {
  const handleModalClose = () => {
    toggleNavigationModal(false);
  };

  const handleLeaveClick = () => {
    setAppDetailedIsDirty();
    unblockHistory();
    history.push(targetLocation);
    handleModalClose();
  };

  return (
    <Modal
      isLarge
      title={title}
      isOpen={isOpen}
      onClose={handleModalClose}
      actions={[
        <Button key="leave" variant="danger" onClick={handleLeaveClick}>
          Leave
        </Button>,
        <Button key="stay" variant="primary" onClick={handleModalClose}>
          Stay
        </Button>
      ]}>
      {children}
    </Modal>
  );
};

NavigationModalContainer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  targetLocation: PropTypes.string,
  title: PropTypes.string.isRequired,
  unblockHistory: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

function mapStateToProps (state) {
  return {
    isOpen: state.modals.navigationModal.isOpen,
    targetLocation: state.modals.navigationModal.targetLocation
  };
}

export default withRouter(connect(mapStateToProps, { toggleNavigationModal, setAppDetailedIsDirty })(NavigationModalContainer));