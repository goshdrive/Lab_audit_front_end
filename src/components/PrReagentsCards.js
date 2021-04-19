import React, { Component } from 'react';

class PrReagentsCards extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="row">
                <div className="col-4">
                    <div className="row">
                        <div className="col">
                            <b>First Used By</b>
                        </div>
                        <div className="col">
                            {this.props.reagentValues.firstUsedBy}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <b>Received By</b>
                        </div>
                        <div className="col">
                            {this.props.reagentValues.receivedBy}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <b>Last Edited By</b>
                        </div>
                        <div className="col">
                            {this.props.reagentValues.lastEditedBy}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    
                </div>
                <div className="col-4">
                    
                </div>
            </div>
        );
    }
}

export default PrReagentsCards;