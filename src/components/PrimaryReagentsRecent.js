import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded } from 'react-table';
import { COLUMNS } from './ColsPrimaryReagents'
import './table.css';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import { GlobalFilter } from './GlobalFilter';
import PrReagentsCards from './PrReagentsCards';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Checkbox } from './CheckBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faPencilAlt, faDownload, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import AddReagent from './AddReagent';
import QRCode  from 'qrcode.react';
import html2canvas from 'html2canvas';
import EditReagent from './EditReagent';
import Loader from "react-loader-spinner";

export const PrimaryReagentsRecent = (props) => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.reagents, [])
    //const [data, setData] = useState(props.reagents, []);
    
    const tableInstance = useTable({
            columns,
            data,
            initialState: {
                sortBy: [
                    {
                        id: 'updatedAt',
                        desc: true
                    }
                ],
                hiddenColumns: ['updatedAt']
            },
        },         
        useGlobalFilter,
        useSortBy,
        useExpanded,
        useRowSelect,        
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [                    
                    ...columns,
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()}/>
                        )
                    }    
                ]
            })
        })

    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        rows, 
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows,
        visibleColumns,
        //state: { expanded },
    } = tableInstance

    const { globalFilter } = state

    const [selectedRow, setSelectRows] = useState('')
    const [isSidebarOpen, setSidebarState] = useState(false)
    const [isModalOpen, setModalState] = useState(false)

    const toggleSidebar = (form=null) => {     
        setSidebarState(!isSidebarOpen);
    }    

    const handleModalShow = () => {
        setModalState(true);
    }

    const handleModalClose = () => {
        setModalState(false);
    }

    const deleteRows = () => { 
        selectedFlatRows.forEach(row => {  
            if (row.original) {
                var update = {
                    _id: row.original._id,
                    status: "DELETED"
                }
                props.putReagent(update);
            }   
        });
    }

    const disposeReagents = () => { 
        selectedFlatRows.forEach(row => { 
            if (row.original) {    
                var update = {
                    _id: row.original._id,
                    status: "DISPOSED"
                }
                props.putReagent(update);
            }
        });
    }

    const downloadQR = () => {

        document.getElementById("hidden-qr").style.display = "block";
        //document.getElementById("hidden-qr").style.marginTop = "1500px";

        selectedFlatRows.forEach(row => {
            if (row.original != null) {
                var elemId = String(row.original._id)+"-ext" 
                var elem = document.getElementById(`${elemId}`)
                elem.style.display = "block";           
                html2canvas(elem).then(function(canvas) {
                    elem.style.display = "none";  
                    const pngUrl = canvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");  
                    let downloadLink = document.createElement("a");
                    downloadLink.href = pngUrl;
                    downloadLink.download = elemId+".png";
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);                                   
                })    
            }            
        });

        document.getElementById("hidden-qr").style.display = "none";
        //document.getElementById("hidden-qr").style.marginTop = "0px";
    }

    const renderRowSubComponent = React.useCallback(
        ({ row }) => (
        //   <pre
        //     style={{
        //       fontSize: '10px',
        //     }}
        //   >
        //     <code>{JSON.stringify({ values: row.original }, null, 2)}</code>
        //   </pre>
        // ),
            <PrReagentsCards reagentValues={row.original}/>
        )
    )

    if (props.reagentsLoading) {
        return (
            <>
            <div style={{"height":"61px","border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-left": "-20px", "width":"85%",
                            "display": "flex",
                            "align-items": "center",
                            "position":"fixed",
                            "z-index":"10"}} className="row header">
                <div className="col-6">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                </div>
                <div style={{"padding-right":"30px"}} className="col-2 ml-auto text-right">
                    <span>
                        <a style={{"font-size": "medium", "color":"rgba(67, 47, 135, 0.9)"}} type="button" onClick={toggleSidebar}>Add Reagent<span style={{"padding-left":"10px"}}><FontAwesomeIcon icon={faFolderPlus} size='lg' /></span></a>
                    </span>
                </div>
            </div>
            <div style={{"paddingTop":"61px"}} className="table-container row">  
                <div style={{"padding-top":"100px", "padding-bottom":"0px", "padding-left":"0px", "padding-right":"10px"}} className="col-11 text-center">
                    <Loader
                        type="TailSpin"
                        color="rgba(67, 47, 135, 0.9)"
                        height={50}
                        width={50}
                        timeout={2000}
                    />
                </div>
            </div>
            </>
        );
    }
    else {
        return(
            <>        
            <div style={{"height":"61px","border-bottom":"1px solid #E2E2E4", "background-color": "white", "margin-left": "-20px", "width":"85%",
                            "display": "flex",
                            "align-items": "center",
                            "position":"fixed",
                            "z-index":"10"}} className="row header">
                <div className="col-6">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                </div>
                <div style={{"padding-right":"30px"}} className="col-2 ml-auto text-right">
                    <span>
                        <a style={{"font-size": "medium", "color":"rgba(67, 47, 135, 0.9)"}} type="button" onClick={toggleSidebar}>Add Reagent<span style={{"padding-left":"10px"}}><FontAwesomeIcon icon={faFolderPlus} size='lg' /></span></a>
                    </span>
                </div>
            </div>
            <div style={{"paddingTop":"61px"}} className="table-container row"> 
                <div style={{"padding-top":"10px", "padding-bottom":"0px", "padding-left":"0px", "padding-right":"10px"}} className="col-11">
                    <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted ? (column.isSortedDesc ? <AiFillCaretDown/> : <AiFillCaretUp/>) : ''}
                                                </span>
                                            </th>
                                        ))}
                                </tr>
                            ))}                
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                            // Use a React.Fragment here so the table markup is still valid
                            <React.Fragment {...row.getRowProps()}>
                                <tr>
                                {row.cells.map(cell => {
                                    return (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                                </tr>
                                {row.isExpanded ? (
                                <tr>
                                    <td colSpan={visibleColumns.length}>
                                    {renderRowSubComponent({ row })}
                                    </td>
                                </tr>
                                ) : null}
                            </React.Fragment>
                            )
                        })}
                        </tbody>
                    </table>
                    <div id="hidden-qr">                    
                        {
                            selectedFlatRows.map(row => {
                                if (row.original == null) {
                                    return null
                                } 
                                else {
                                    return( 
                                        <div style={{display: "none"}} key={row.original._id} id={String(row.original._id)+"-ext"} className="container text-center">
                                            <div className="row">                                            
                                                <h5><b>LOT Number</b>: {row.original.lotNr} {"\n"}</h5>                                                                                                                                                                                            
                                            </div>               
                                            <div className="row">                                    
                                                <QRCode
                                                    id={String(row.original._id)}
                                                    value={String(row.original._id)}
                                                    size={290}
                                                    level={"H"}
                                                    includeMargin={false}
                                                />
                                            </div>              
                                            <div className="row">
                                                <p><b>Unique ID</b>: {row.original._id}</p>{' '}    
                                            </div>                        
                                            <div className="row">
                                                <p><b>Pack No</b>: {row.original.unit}</p>                                                                                                    
                                            </div>                                                                                           
                                        </div>
                                    );
                                }                                        
                            })
                        }
                    </div>
                </div>
                <div className="col-1 text-center">
                    {selectedFlatRows[0] ? (
                        <ul style={{"position": "fixed", "textAlign":"center", "paddingLeft":"0.5%"}} className="list-unstyled">
                            <li>
                                <div className="text-center">
                                    <a type="button" onClick={handleModalShow} className="dot" style={{"line-height":"50px",
                                    "border": "rgba(67, 47, 135, 0.9)",
                                    "width": "50px",
                                    "background-color": "rgba(67, 47, 135, 0.9)",
                                    "border-radius": "50%",
                                    "display": "inline-block",
                                    "box-shadow": "0px 0px 10px 0px lightgrey",
                                    "text-align": "center",
                                    "vertical-align": "middle"}}>
                                    <FontAwesomeIcon icon={faPencilAlt} color="white" size='lg'/></a>
                                </div>
                                <div className="subtitle">Edit</div>
                            </li>
                            <li>
                                <div className="text-center">
                                    <a type="button" onClick={disposeReagents} className="dot"
                                    style={{"line-height":"50px",
                                    "border": "0.5px solid white",
                                    "width": "50px",
                                    "background-color": "white",
                                    "border-radius": "50%",
                                    "display": "inline-block",
                                    "box-shadow": "0px 0px 5px 0px lightgrey",
                                    "text-align": "center",
                                    "vertical-align": "middle"}}>
                                    <FontAwesomeIcon icon={faTimes} color="rgba(67, 47, 135, 0.9)" size='lg'/></a>
                                </div>
                                <div className="subtitle">Dispose</div>
                            </li>
                            <li>
                                <div className="text-center">
                                    <a type="button" onClick={downloadQR} className="dot"
                                    style={{"line-height":"50px",
                                    "border": "0.5px solid white",
                                    "width": "50px",
                                    "background-color": "white",
                                    "border-radius": "50%",
                                    "display": "inline-block",
                                    "box-shadow": "0px 0px 5px 0px lightgrey",
                                    "text-align": "center",
                                    "vertical-align": "middle",
                                    "align":"middle"}}>
                                    <FontAwesomeIcon icon={faDownload} color="rgba(67, 47, 135, 0.9)" size='lg'/></a>
                                </div>
                                <div className="subtitle">Download QR</div>
                            </li>
                            <li>
                                <div className="text-center">
                                    <a type="button" onClick={deleteRows} className="dot"
                                    style={{"line-height":"50px",
                                    "border": "0.5px solid white",
                                    "width": "50px",
                                    "background-color": "white",
                                    "border-radius": "50%",
                                    "display": "inline-block",
                                    "box-shadow": "0px 0px 5px 0px lightgrey",
                                    "text-align": "center",
                                    "vertical-align": "middle"}}>
                                    <FontAwesomeIcon icon={faTrash} color="grey" size='lg'/></a>
                                </div>
                                <div className="subtitle">Delete</div>
                            </li>
                        </ul>
                    ) : null}
                </div>  
                <AddReagent isSidebarOpen={isSidebarOpen} onSidebarToggle={toggleSidebar} 
                    selectedRow={{selectedFlatRows: selectedFlatRows.map((row) => row.original)[0] != null ? 
                        selectedFlatRows.map((row) => row.original)[0] : 
                        selectedFlatRows.map((row) => row.original)[1]}}
                    resetAddReagentForm={props.resetAddReagentForm}
                    changeAddReagentForm={props.changeAddReagentForm} 
                    postReagent={props.postReagent} />        
                <EditReagent isModalOpen={isModalOpen} handleModalClose={handleModalClose} handleModalOpen={handleModalShow} 
                    selectedRow={{selectedFlatRows: selectedFlatRows.map((row) => row.original)[0] != null ? 
                        selectedFlatRows.map((row) => row.original)[0] : 
                        selectedFlatRows.map((row) => row.original)[1]}} 
                        putReagent={props.putReagent} /> 
            </div>
            </>
        );
    }
}

