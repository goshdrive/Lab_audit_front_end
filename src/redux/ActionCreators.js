import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseURL';
import { TestTypes } from './testTypes';

///////////////////////////////////////////////////
// PRIMARY REAGENTS
///////////////////
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

// PUT
export const putReagent = (
    updatedReagent, action = ""
) => (dispatch) => {
    
    return fetch(baseUrl + 'reagents/' + updatedReagent._id 
    + "?action=" + action, {
        method: 'PUT',
        body: JSON.stringify(updatedReagent),
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
        .then(response => {dispatch(updateReagent(response))})
        .catch(error => { console.log('Post reagents', error.message) 
            alert('Reagent could not be posted\nError: '+ error.message)})
}

export const updateReagent = (reagent) => ({
    type: ActionTypes.UPDATE_REAGENT,
    payload: reagent
});

// DELETE
export const deleteReagent = (
    reagent_id
) => (dispatch) => {
    
    return fetch(baseUrl + 'reagents/' + reagent_id, {
        method: 'DELETE',
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
        .then(response => {dispatch(removeReagent(response))})
        .catch(error => { console.log('Delete reagents', error.message) 
            alert('Reagent could not be deleted\nError: '+ error.message)})
        
}

export const removeReagent = (reagent) => ({    
    type: ActionTypes.REMOVE_REAGENT,
    payload: reagent
});
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// TESTS
////////
// GET
export const fetchTests = () => (dispatch) => {
    return fetch(baseUrl + 'tests')
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
        .then(tests => dispatch(renderTests(tests)))
        .catch(error => dispatch(testsFailed(error.message)));
}

export const testsLoading = () => ({
    type: ActionTypes.TESTS_LOADING
});

export const renderTests = (tests) => ({
    type: ActionTypes.RENDER_TESTS,
    payload: tests
});

export const testsFailed = (errmess) => ({
    type: ActionTypes.TESTS_FAILED,
    payload: errmess
});

// DELETE
export const deleteTest = (
    test_id
) => (dispatch) => {
    
    return fetch(baseUrl + 'tests/' + test_id, {
        method: 'DELETE',
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
        .then(response => {dispatch(removeTest(response))})
        .catch(error => { console.log('Delete reagents', error.message) 
            alert('Reagent could not be deleted\nError: '+ error.message)})
        
}

export const removeTest = (test) => ({    
    type: ActionTypes.REMOVE_TEST,
    payload: test
});
///////////////////////////////////////////////////

///////////////////////////////////////////////////
// TEST TYPES
/////////////
// GET
export const fetchTestTypes = () => (dispatch) => {
    return fetch(baseUrl + 'testTypes')
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
        .then(testTypes => dispatch(renderTestTypes(testTypes)))
        .catch(error => dispatch(reagentsFailed(error.message)));
}

export const testTypesLoading = () => ({
    type: ActionTypes.TESTTYPES_LOADING
});

export const renderTestTypes = (testTypes) => ({
    type: ActionTypes.RENDER_TESTTYPES,
    payload: testTypes
});

export const testTypesFailed = (errmess) => ({
    type: ActionTypes.TESTTYPES_FAILED,
    payload: errmess
});
