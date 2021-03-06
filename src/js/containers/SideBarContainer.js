const React = require('react');
const { connect } = require('react-redux');
const CheckStoreActions = require('../actions/CheckStoreActions.js');
const SideBarActions = require('../actions/SideBarActions.js');
const MenuHeaders = require('../components/core/navigation_menu/MenuHeaders');
const {Grid, Row, Col, Glyphicon} = require('react-bootstrap');
const Chevron = require('../components/core/SideBar/Chevron');
const style = require("../components/core/SideBar/Style");


var sideBarContainerStyle = {
  backgroundColor: "#333333",
  zIndex: "98",
  fontSize: "12px",
  overflowX: "hidden",
  height: "100%",
  padding: 0,
  position:"fixed",
  width:"250px"
}

class SideBarContainer extends React.Component {
  render() {
    return (
      <div>
        <div style={{display: this.props.menuVisibility ? "block" : "none"}}>
          <Grid fluid style={sideBarContainerStyle}>
            <Col style={
              {
                width:"250px",
                position: "fixed",
                padding: 0,
                backgroundColor: "#333333",
                height: "95%",
                overflowY: "scroll"
              }
            }>
              <MenuHeaders {...this.props} currentToolNamespace={this.props.currentToolNamespace}/>
            </Col>
          </Grid>
        </div>
        <Glyphicon style={this.props.menuVisibility ? style.slideButton : style.slideButtonCollapsed}
                   glyph={this.props.menuVisibility ? 'chevron-left' : 'chevron-right'}
                   onClick={this.props.onToggleMenu} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return Object.assign({}, state.checkStoreReducer, state.sideBarReducer);
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleMenu: () => {
      dispatch(SideBarActions.toggleMenu());
    },
    menuClick: (id, currentToolNamespace, bool) => {
      dispatch(SideBarActions.menuHeaderClicked(currentToolNamespace, parseInt(id), 0, bool));
    },
    checkClicked: (currentGroupIndex, id, currentToolNamespace) => {
      dispatch(
        CheckStoreActions.goToCheck(currentToolNamespace, currentGroupIndex, parseInt(id))
      );
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);
