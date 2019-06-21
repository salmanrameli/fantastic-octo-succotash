import React from 'react';

const Store = window.Store;
const store = new Store();

class Root extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            winWidth: '',
            winHeight: '',
            windowHasFrame: '',
            windowIsResizable: ''
        }

        this.handleWindowSizeSetting = this.handleWindowSizeSetting.bind(this)
        this.handleWindowResizableChange = this.handleWindowResizableChange.bind(this)
        this.handleWindowHasFrameChange = this.handleWindowHasFrameChange.bind(this)
    }

    componentDidMount() {
        let winWidth = store.get('winWidth')
        let winHeight = store.get('winHeight')
        let windowHasFrame = store.get('windowHasFrame')
        let windowIsResizable = store.get('windowIsResizable')
        
        this.setState({
            winWidth: winWidth,
            winHeight: winHeight,
        })

        if(windowHasFrame !== undefined) {
            this.setState({
                windowHasFrame: String(windowHasFrame)
            })
        } else {
            this.setState({
                windowHasFrame: true
            })
        }

        if(windowIsResizable !== undefined) {
            this.setState({
                windowIsResizable: String(windowIsResizable)
            })
        } else {
            this.setState({
                windowIsResizable: true
            })
        }
    }

    handleWindowSizeSetting(e) {
        let winWidth = e.target.width.value
        let winHeight = e.target.height.value

        store.set('winWidth', winWidth)
        store.set('winHeight', winHeight)
    }

    handleWindowHasFrameChange(e) {
        let val = e.target.value

        this.setState({
            windowHasFrame: val
        })

        store.set('windowHasFrame', val)
    }

    handleWindowResizableChange(e) {
        let val = e.target.value

        this.setState({
            windowIsResizable: val
        })

        store.set('windowIsResizable', val)
    }

    render() {
        return(
            <div className="row">
                <div className="col-md-12">
                    <div className="pb-2 mt-4 mb-2">
                        <h1>Setting</h1>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <form id="windowSizeSetting" onSubmit={this.handleWindowSizeSetting}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="width">Window Width:</label>
                                        <input className="form-control form-control-lg" type="text" name="width" placeholder={this.state.winWidth} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label className="form-label" htmlFor="height">Window Height:</label>
                                        <input className="form-control form-control-lg" type="text" name="height" placeholder={this.state.winHeight} />
                                    </div>
                                    <button className="btn btn-success" type="submit"><i className="fa fa-bookmark"></i> Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br></br>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form id="windowFrameSetting">
                                <label className="form-label" htmlFor="width">Set Window has Frame</label>
                                <br></br>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="windowFrame" id="windowFrameTrue" value="true" checked={this.state.windowHasFrame === 'true'} onChange={this.handleWindowHasFrameChange} />
                                    <label className="form-check-label" htmlFor="windowFrameTrue">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="windowFrame" id="windowFrameFalse" value="false" checked={this.state.windowHasFrame === 'false'} onChange={this.handleWindowHasFrameChange} />
                                    <label className="form-check-label" htmlFor="windowFrameFalse">No</label>
                                </div>
                                <br></br><br></br>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form id="windowResizableSetting">
                                <label className="form-label" htmlFor="width">Set Window is Resizable</label>
                                <br></br>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="windowResizable" id="windowResizableTrue" value="true" checked={this.state.windowIsResizable === 'true'} onChange={this.handleWindowResizableChange} />
                                    <label className="form-check-label" htmlFor="windowResizableTrue">Yes</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="windowResizable" id="windowResizableFalse" value="false" checked={this.state.windowIsResizable === 'false'} onChange={this.handleWindowResizableChange} />
                                    <label className="form-check-label" htmlFor="windowResizableFalse">No</label>
                                </div>
                                <br></br><br></br>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Root