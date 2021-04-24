import React, { useMemo, useState } from 'react';
import { useTable, useSortBy, useGlobalFilter, useRowSelect, useExpanded } from 'react-table';
import { COLUMNS } from './ColsSecReagents'
import './table.css';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import { GlobalFilter } from './GlobalFilter';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Checkbox } from './CheckBox';
import SecReagentsCards from './SecReagentsCards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons'

export const SecReagentsBin = (props) => {
    
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => props.deletedSecReagents, [])
    //const [data, setData] = useState(props.deletedSecReagents, []);
    
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

    const deleteRows = () => { 
        selectedFlatRows.forEach(row => {     
            var update = {
                _id: row.original._id,
                status: "DELETED"
            }
            props.putSecReagent(update);
        });
    }

    const undoDelete = () => { 
        selectedFlatRows.forEach(row => {     
            var update = {
                _id: row.original._id,
                status: "OK"
            }
            props.putSecReagent(update);
        });
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
        // []
        <SecReagentsCards reagentValues={row.original}/>
      )
    )
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
            <div style={{"padding-right":"20px"}} className="col-2 ml-auto text-right">
            </div>
        </div>
        <div className="table-container row"> 
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
                            {/*
                                If the row is in an expanded state, render a row with a
                                column that fills the entire length of the table.
                            */}
                            {row.isExpanded ? (
                            <tr>
                                <td colSpan={visibleColumns.length}>
                                {/*
                                    Inside it, call our renderRowSubComponent function. In reality,
                                    you could pass whatever you want as props to
                                    a component like this, including the entire
                                    table instance. But for this example, we'll just
                                    pass the row
                                    */}
                                {renderRowSubComponent({ row })}
                                </td>
                            </tr>
                            ) : null}
                        </React.Fragment>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="col-1 text-center button-col">
                {selectedFlatRows[0] ? (
                        <ul className="list-unstyled">
                            <li>
                                <div className="textCenter">
                                    <a type="button" onClick={undoDelete} className="dot" style={{"line-height":"50px",
                                    "border": "rgba(67, 47, 135, 0.9)",
                                    "width": "50px",
                                    "background-color": "rgba(67, 47, 135, 0.9)",
                                    "border-radius": "50%",
                                    "display": "inline-block",
                                    "box-shadow": "0px 0px 10px 0px lightgrey",
                                    "text-align": "center",
                                    "vertical-align": "middle"}}>
                                    <FontAwesomeIcon icon={faUndo} color="white" size='lg'/></a>
                                </div>
                                <div className="subtitle">Restore</div>
                            </li>
                        </ul>
                ) : null}
            </div>  
        </div>
        
        </>
    );
}

