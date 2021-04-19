import React, { createRef, Component } from "react";
import Sidebar from './Sidebar';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Accordion, Card, Modal, Button}  from "react-bootstrap";


const required = value => (value ? undefined : 'Required')
const mapping = ["JAN", "FEB", "MAR", "APR", "MAI", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEZ"];

const RenderAssay = ( props ) => (
    <div className="col-4 assay-cards" style={{"width":"100%"}}>
            <Card id={props.assayType._id} key={props.assayType._id}>                            
                <Card.Title>
                    <span>
                        <h4 style={{"padding":"10px"}}>{props.assayType.assayName}</h4>
                        <a type="button" onClick={() => props.deleteTestType(props.assayType._id)}><FontAwesomeIcon icon={faTimes} color="grey" size='md'/></a>
                    </span>
                </Card.Title>
                <Card.Body>         
                        <div className="row">     
                            <div className="col-12">
                                <h5>Reagents</h5>
                            </div>                           
                            {props.assayType.metadata[0] ? (props.assayType.metadata[0].children.map(reagent => {
                                return(
                                    <div className="col-6" key={reagent.key}>
                                        {reagent.label}
                                    </div>
                                );
                            })) : null}
                        </div>                         
                        <div className="row">                                
                            <div className="col-12">
                                <h5>Reagent Data</h5>
                            </div>
                            {props.assayType.metadata[1] ? (props.assayType.metadata[1].children.map(reagentDataInput => {
                                return(
                                    <div className="col-6" key={reagentDataInput.key}>
                                        {reagentDataInput.label}
                                    </div>
                                );
                            })) : null}
                        </div>
                        <div className="row">  
                            <div className="col-12">
                                <h5>Other</h5>
                            </div>                              
                            {props.assayType.metadata[2] ? (props.assayType.metadata[2].children.map(otherInput => {
                                return(
                                    <div className="col-6" key={otherInput.key}>
                                        {otherInput.label}
                                    </div>
                                );
                            })) : null}
                        </div>                      
                </Card.Body>
            </Card>
        </div> 
    )


class AssayTypes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            assayTypes: props.testTypes,
            dateSeries: [],
            monthCounter: []
        }
    }

    componentDidMount() {
        var dateSeries = this.state.assayTypes.map(assayType => new Date(assayType.createdAt));
        dateSeries.sort().reverse();
        dateSeries = dateSeries.map(date => date.toISOString().substring(0, 7))
        dateSeries = [...new Set(dateSeries)]
        
        this.setState({
            dateSeries: dateSeries
        });
    }

    addToMonthCounter(date) {
        this.setState(prevState => ({
            monthCounter: [...prevState.monthCounter, date]
        }))
        console.log(this.state.monthCounter);
    }

    handleSubmit = async values => {
        var newAssayType = {
            assayName: values.assayName,
            metadata: [
                {
                    key: "reagents",
                    children: []
                },
                {
                    key: "reagentData",
                    children: []
                },
                {
                    key: "other",
                    children: []
                }
            ]
        };

        if (values.reagents) {
            var reagentChildren = values.reagents.filter(inputField => inputField != null);
            reagentChildren = reagentChildren.map(inputField => {
                let key = inputField.label.toLowerCase();
                key = key.replace(" ","_");
                return(
                    {
                        key: key,
                        label: inputField.label,
                        required: true,
                        type: "text"
                    }
                );
            });
            newAssayType.metadata[0].children = reagentChildren;
        }

        if (values.reagentData) {
            var reagentDataChildren = values.reagentData.filter(inputField => inputField.label != null);
            reagentDataChildren = reagentDataChildren.map(inputField => {
                let key = inputField.label.toLowerCase();
                key = key.replace(" ","_");
                return(
                    {
                        key: key,
                        label: inputField.label,
                        required: inputField.required,
                        type: inputField.type
                    }
                );
            });

            newAssayType.metadata[1].children = reagentDataChildren;
        }
        
        if (values.other) {
            var otherDataChildren = values.other.filter(inputField => inputField.label != null);
            var otherDataChildren = otherDataChildren.map(inputField => {
                let key = inputField.label.toLowerCase();
                key = key.replace(" ","_");
                return(
                    {
                        key: key,
                        label: inputField.label,
                        required: inputField.required,
                        type: inputField.type
                    }
                );
            });

            newAssayType.metadata[2].children = otherDataChildren;
        }
        
        this.props.postTestType(newAssayType);
        //alert(JSON.stringify(newAssayType))
    }

    childRef = createRef();

    render() {
        return(
            <div id="page-wrap" className="container-fluid">         
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} logoutUser={this.props.logoutUser} />                               
                <div className="row flex-fill h-100 d-flex">
                    <div className="col-4">
                        <div style={{"z-index":"10", "position":"fixed", "border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-top": "0px", "padding": "10px", "width":"110%"}} className="row header">
                            <div className="col ml-5">
                                <span className="menu-header"> Assay Types </span>
                            </div>
                        </div>
                        <div style={{"border-right":"1px solid #E2E2E4", "paddingTop":"81px"}} className="row side-info">
                            <div style={{"margin-left":"30px", "margin-right":"15px", "border-radius": "7px",
                                                    "background-color": "rgba(47, 73, 209, 0.15)",                                                    
                                                    "box-shadow": "0px 0px 5px 0px lightgrey", 
                                                    "paddingTop":"10px", "paddingBottom":"10px"}} className="container">
                            <Form 
                                onSubmit={this.handleSubmit}
                                mutators={{
                                ...arrayMutators
                                }}
                                render={({
                                handleSubmit,
                                form: {
                                    mutators: { push, pop }
                                }, // injected from final-form-arrays above
                                pristine,
                                form,
                                submitting,
                                values
                                }) => {
                                    return(
                                        <form id="addAssayType" onSubmit={handleSubmit}>
                                            <div className="container">
                                                <Field
                                                    name="assayName"
                                                    component="input"
                                                    type="text"
                                                    validate={required}
                                                    >
                                                    {({ input, meta }) => (
                                                        <div className="row">                                  
                                                            <div className="col">
                                                                <input {...input} id="assay-name-input" placeholder="New Assay Name..."/>
                                                                {meta.error && meta.submitFailed && <span>{meta.error}</span>}
                                                            </div>
                                                        </div>
                                                    )}
                                                </Field>
                                                <div className="row input-header">
                                                    <div className="col-6"><span className="input-h4">Reagents</span>                                                        
                                                    <button className="button-form-array" type="button" onClick={() => push('reagents', undefined)}>
                                                            <FontAwesomeIcon icon={faPlus} color="#3e8bd6" size='md'/>
                                                        </button>{' '}
                                                        <button className="button-form-array" type="button" onClick={() => pop('reagents')}>
                                                            <FontAwesomeIcon icon={faMinus} color="#3e8bd6" size='md'/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <FieldArray name="reagents">
                                                    {({ fields }) =>
                                                        fields.map((name, index) => (
                                                        <div className="row" key={name}>
                                                            {/*<label>Reagent #{index + 1}</label>*/}
                                                            <div className="col-6">
                                                                <Field
                                                                name={`${name}.label`}
                                                                component="input"
                                                                placeholder="Reagent Name"
                                                                className="reagent-type-input"
                                                                />
                                                            
                                                                <span
                                                                onClick={() => fields.remove(index)}
                                                                style={{ cursor: 'pointer' }}
                                                                >
                                                                ❌
                                                                </span>
                                                            </div>
                                                        </div>
                                                        ))
                                                    }
                                                </FieldArray> 
                                            </div>
                                            <div className="container">
                                                <div className="row input-header">
                                                    <div className="col-6"><span className="input-h4">Reagent Data</span><button className="button-form-array" type="button" onClick={() => push('reagentData', undefined)}>
                                                            <FontAwesomeIcon icon={faPlus} color="#3e8bd6" size='md'/>
                                                        </button>{' '}
                                                        <button className="button-form-array" type="button" onClick={() => pop('reagentData')}>
                                                            <FontAwesomeIcon icon={faMinus} color="#3e8bd6" size='md'/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <FieldArray name="reagentData">
                                                    {({ fields }) =>
                                                        fields.map((name, index) => (
                                                        <div className="row" key={name}>
                                                            {/*<label>{index + 1}</label>*/}
                                                            <div className="col-5">
                                                                <Field
                                                                name={`${name}.label`}
                                                                component="input"
                                                                placeholder="Input Name"
                                                                />
                                                            </div>
                                                            <div className="col-2">
                                                                <Field
                                                                name={`${name}.type`}
                                                                component="select"
                                                                defaultValue="text"
                                                                >
                                                                    <option selected value="text">Text</option>
                                                                    <option value="false">Date</option>
                                                                </Field>
                                                            </div>
                                                            <div className="col-4">
                                                                <Field
                                                                name={`${name}.required`}
                                                                component="select"
                                                                defaultValue="true"
                                                                >
                                                                    <option selected value="true">Required</option>
                                                                    <option value="false">Not Required</option>
                                                                </Field>
                                                                <span
                                                                onClick={() => fields.remove(index)}
                                                                style={{ cursor: 'pointer' }}
                                                                >
                                                                ❌
                                                                </span>
                                                            </div>
                                                        </div>
                                                        ))
                                                    }
                                                </FieldArray>
                                                <div className="row input-header">
                                                    <div className="col-6"><span className="input-h4">Other Inputs</span>
                                                        <button className="button-form-array" type="button" onClick={() => push('other', undefined)}>
                                                            <FontAwesomeIcon icon={faPlus} color="#3e8bd6" size='md'/>
                                                        </button>{' '}
                                                        <button className="button-form-array" type="button" onClick={() => pop('other')}>
                                                            <FontAwesomeIcon icon={faMinus} color="#3e8bd6" size='md'/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <FieldArray name="other">
                                                    {({ fields }) =>
                                                        fields.map((name, index) => (
                                                        <div className="row" key={name}>
                                                            {/*<label>{index + 1}</label>*/}
                                                            <div className="col-5">
                                                                <Field
                                                                name={`${name}.label`}
                                                                component="input"
                                                                placeholder="Input Name"
                                                                />
                                                            </div>
                                                            <div className="col-2">
                                                                <Field
                                                                name={`${name}.type`}
                                                                component="select"
                                                                defaultValue="text"
                                                                >
                                                                    <option selected value="text">Text</option>
                                                                    <option value="false">Date</option>
                                                                </Field>
                                                            </div>
                                                            <div className="col-4">
                                                                <Field
                                                                name={`${name}.required`}
                                                                component="select"
                                                                defaultValue="true"
                                                                >
                                                                    <option selected value="true">Required</option>
                                                                    <option value="false">Not Required</option>
                                                                </Field>
                                                                <span
                                                                onClick={() => fields.remove(index)}
                                                                style={{ cursor: 'pointer' }}
                                                                >
                                                                ❌
                                                                </span>
                                                            </div>
                                                        </div>
                                                        ))
                                                    }
                                                </FieldArray>
                                                <div className="container">
                                                    <div className="row">
                                                        <button className="submit-button" type="submit" disabled={submitting || pristine}>
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    )
                                }
                            }/>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">  
                        <div style={{"padding-top":"81px", "paddingRight":"15px"}} className="row">
                            <div className="col">
                            <Accordion defaultActiveKey="0">
                            <Card key="0" style={{"display": this.state.dateSeries[0] ? "block": "none"}}>
                                <Card.Header>
                                    <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                                        {this.state.dateSeries[0] ? String(mapping[Number(this.state.dateSeries[0].substring(5, 7))-1]) + ' ' + String(this.state.dateSeries[0].substring(0, 4)) : null}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <div className="container">
                                                <div className="row">
                                                {this.state.dateSeries[0] ? (this.state.assayTypes.map(assayType => {
                                                if (Number(assayType.createdAt.substring(5,7)) == this.state.dateSeries[0].substring(5,7)) {
                                                        return(
                                                            <RenderAssay ref={this.childRef} key={assayType._id} assayType={assayType}
                                                                deleteTestType={this.props.deleteTestType} />
                                                        );
                                                    }
                                                    else {
                                                        return(
                                                            <div></div>
                                                        );
                                                    }
                                                })): null}
                                                </div>
                                            </div>
                                        </Card.Body>                                                    
                                    </Accordion.Collapse>
                                </Card.Header>
                            </Card>
                            {this.state.dateSeries.map(date => {
                                if (date != this.state.dateSeries[0]) {
                                    return(
                                        <Card key={date.substring(0, 7)}>
                                            <Card.Header>
                                                <Accordion.Toggle as={Card.Header} variant="link" eventKey={date.substring(5, 7)}>
                                                    {String(mapping[Number(date.substring(5, 7))-1]) + ' ' + String(date.substring(0, 4))}
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey={date.substring(5, 7)}>
                                                    <Card.Body>
                                                        <div className="row">
                                                            {this.state.assayTypes.map(assayType => {
                                                                if (Number(assayType.createdAt.substring(5,7)) == date.substring(5,7)) {
                                                                    return(
                                                                        <>
                                                                        <div className="col">
                                                                                <RenderAssay ref={this.childRef} key={assayType._id} assayType={assayType}
                                                                                    deleteTestType={this.props.deleteTestType} />
                                                                        </div>
                                                                        </>
                                                                    );
                                                                }
                                                                else {
                                                                    return(
                                                                        null
                                                                    );
                                                                }
                                                            })}
                                                        </div>
                                                    </Card.Body>                                                    
                                                </Accordion.Collapse>
                                            </Card.Header>
                                        </Card>
                                    );
                                }  
                            })}                                         
                        </Accordion> 
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        );
    }
}

export default AssayTypes;