import { format } from 'date-fns';
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

export const COLUMNS = [
    {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
            row.subRows.length ? null : (
            <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? <AiOutlineDown/> : <AiOutlineRight/>}
            </span>
            )
        )
    },
    {
        Header: 'Unit',
        accessor: 'unit',
        canGroupBy: false,
        aggregate: topValue,
        disableSortBy: true
    },
    {
        Header: 'Reagent Name',
        accessor: 'reagentName',
        canGroupBy: false,
        aggregate: topValue,
        disableSortBy: true
    },
    {
        Header: 'LOT Number',
        id: 'lotNr',
        accessor: 'lotNr',
        canGroupBy: true,
        disableSortBy: true,
        aggregate: topValue,
    },
    {
        Header: 'CAT Number',
        accessor: 'catNr',
        canGroupBy: false,
        aggregate: topValue
    },
    {
        Header: 'Date Received',
        id: 'dateReceived',
        accessor: 'dateReceived',
        Cell: ({value}) => (value!=null ? format(new Date(value), 'dd/MM/yyyy'): ''),
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Expiry Date',
        accessor: 'expiryDate',
        Cell: ({value}) => (value!=null ? format(new Date(value), 'dd/MM/yyyy'): ''),
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Supplier',
        accessor: 'supplier',
        disableSortBy: true,
        aggregate: topValue,
        canGroupBy: true
    },
    {
        Header: 'Date of First Use',
        accessor: 'dateOfFirstUse',
        Cell: ({value}) => (value!=null ? format(new Date(value), 'dd/MM/yyyy'): ''),
        aggregate: topValue,
        canGroupBy: false
    },
    {
        Header: 'Status',
        accessor: 'status',
        canGroupBy: false
    },
    {
        Header: 'Assay',
        accessor: 'assayName',
        canGroupBy: false,
    },
    {
        Header: 'Updated At',
        accessor: 'updatedAt',
    }    
]

const onRowClick = (state, rowInfo, column, instance) => {
    return {
        onClick: e => {
            console.log('A Td Element was clicked!')
            console.log('it produced this event:', e)
            console.log('It was in this column:', column)
            console.log('It was in this row:', rowInfo)
            console.log('It was in this table instance:', instance)
        }
    }
}

function topValue(leafValues) {
    let top = leafValues[0]
  
    /*
    leafValues.forEach(value => {
      min = Math.min(min, value)
      max = Math.max(max, value)
    })
    */
  
    return top
  }