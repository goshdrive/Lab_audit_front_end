import { format } from 'date-fns';
import {AiOutlineRight, AiOutlineDown} from 'react-icons/ai'

export const COLUMNS = [
    {
        // Make an expander cell
        Header: () => null, // No header
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? <AiOutlineDown/> : <AiOutlineRight/>}
          </span>
        ),
    },
    {
        Header: 'Reagent Name',
        accessor: 'reagentName',
    },
    {
        Header: 'Lot Nr',
        accessor: 'lotNr',
    },
    {
        Header: 'Date Created',
        accessor: 'dateCreated',
        Cell: ({value}) => (value!=null ? format(new Date(value), 'dd/MM/yyyy'): '')
    },    
    {
        Header: 'Expiry Date',
        accessor: 'expiryDate',
        Cell: ({value}) => (value!=null ? format(new Date(value), 'dd/MM/yyyy'): '')
    },    
    {
        Header: 'Created By',
        accessor: 'createdBy',
    },
    {
        Header: 'Updated At',
        accessor: 'updatedAt',
    }    
]