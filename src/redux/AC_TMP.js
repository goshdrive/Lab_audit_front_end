import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';
import { TestTypes } from './testTypes';

// GET
export const fetchReagents = () => (dispatch) => {
    return fetch(baseUrl + 'reagents')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(reagents => dispatch(renderReagents(reagents)))
        .catch(error => dispatch(reagentsFailed(error.message)));
}

export const reagentsLoading = () => ({
    type: ActionTypes.REAGENTS_LOADING
});

export const renderReagents = (reagents) => ({
    type: ActionTypes.RENDER_REAGENTS,
    payload: reagents
});

export const reagentsFailed = (errmess) => ({
    type: ActionTypes.REAGENTS_FAILED,
    payload: errmess
});

// POST
export const postReagent = (
    unit,
    reagentName,
    supplier,
    lotNr,
    catNr,
    expiryDate,
    dateReceived,
    storageLocation
) => (dispatch) => {

    const newReagent = {
        unit: unit,
        reagentName: reagentName,
        supplier: supplier,
        lotNr: lotNr,
        catNr: catNr,
        expiryDate: expiryDate,
        dateReceived: dateReceived,
        storageLocation: storageLocation
    }
    //newComment.date = new Date().toISOString();
    
    return fetch(baseUrl + 'reagents', {
        method: 'POST',
        body: JSON.stringify(newReagent),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        }, 
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addReagent(response)))
        .catch(error => { console.log('Post reagents', error.message) 
            alert('Reagent could not be posted\nError: '+ error.message)})
}

export const addReagent = (reagent) => ({
    type: ActionTypes.ADD_REAGENT,
    payload: reagent
});

