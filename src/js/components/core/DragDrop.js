const React = require('react');

const Dropzone = require('react-dropzone');

const remote = require('electron').remote;
const {dialog} = remote;

const style = {
  dropzone: {
    active: {
      border: '2px solid #727272',
      backgroundColor: '#f5f5f5'
    },
    main: {
      width: '100%',
      color: '#212121',
      height: '200px',
      border: '2px dashed #727272',
      borderRadius: '5px',
      fontSize: '25px'
    },
    inner: {
      fontSize: '15px'
    },
    welcome: {
      width: '100%',
      color: '#212121',
      height: '200px',
      borderRadius: '5px',
      fontSize: '25px'
    }
  }
};

var _this;

class DragDrop extends React.Component{
  constructor() {
    super();
    _this = this;
  }

  componentWillMount() {
    if(this.props.isWelcome){
      this.mainStyle = style.dropzone.welcome;
    } else {
      this.mainStyle = style.dropzone.main;
    }
  }

  onDrop(files) {
    if (files !== undefined) {
      // FileImport(files[0].path);
      _this.props.sendFilePath(files[0].path);
    }
  }

  onClick() {
    if (!_this.opened) {
      _this.opened = true;
      dialog.showOpenDialog({
        properties: _this.props.properties
      }, function(filename) {
        if (filename !== undefined) {
          _this.props.sendFilePath(filename[0]);
        }
        _this.opened = false;
      });
    }
  }

  render() {
    return (
    <div onClick = {this.onClick} >
        <Dropzone onDrop = {this.onDrop}
        disableClick={true} multiple={false} style={this.mainStyle}
        activeStyle={style.dropzone.active}>
            <div style={this.props.styles}>
              <center>
                Drag files here to upload, or click to select a file
                <span style={style.dropzone.inner}> {this.props.filePath} </span>
              </center>
            </div>
      </Dropzone>
    </div>
  );
  }
}

module.exports = DragDrop;
