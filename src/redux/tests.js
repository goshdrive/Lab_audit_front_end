import * as ActionTypes from './ActionTypes';

export const Tests = (state = {
        isLoading: true,
        errMess: null,
        tests: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.RENDER_TESTS:
            return {...state, isLoading: false, errMess: null, tests: action.payload}

        //case ActionTypes.TESTS_LOADIG:
        //    return {...state, isLoading: true, errMess: null, tests: []}

        case ActionTypes.TESTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tests: []}

        default:
            return state;
    }
}