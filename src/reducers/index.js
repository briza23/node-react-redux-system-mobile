import { combineReducers } from 'redux';

function userPosition(state = {}, action) {
    switch (action.type) {
        case "RECV_POSITION": {
            const { latitude, longitude } = action;
            return { latitude, longitude };
        }
        default:
            return state;
    }
}

function FACEBOOKAPPID(state = 554044578269969 , action) {
    switch (action.type) {
        default:
            return state;
    }
}

function isAuthenticated(state = false, action) {
    switch (action.type) {
        case "AUTHENTICATE":
            return action.auth;
        default:
            return state;
    }
}

function branches(branches = [], action) {
    switch (action.type) {
        case "CHANGE_BRANCHES":
            return action.branches;
        default:
            return branches;
    }
}

function page(page = 0, action) {
    switch (action.type) {
    case "CHANGE_PAGE":
        return action.page;
    default:
        return page;
    }
}

function transaction_type(transaction = "", action) {
    switch (action.type) {
    case "CHANGE_TRANSACTION_TYPE":
        return action.transaction;
    default:
        return transaction;
    }
}

function switch_status(value = 1, action) {
    switch (action.type) {
    case "CHANGE_SWITCH_STATUS":
        return action.value;
    default:
        return value;
    }
}

function queue(value = "nearest", action) {
    switch (action.type) {
    case "CHANGE_NEAREST":
        return action.value;
    default:
        return value;
    }
}

function form_type (form_type = "", action) {
    switch(action.type) {
    case "ATTRIBUTE_FORM_TYPE":
        return action.value;
    default:
        return form_type;
    }
}

function form_account (form_account = "", action) {
    switch(action.type) {
    case "ATTRIBUTE_FORM_ACCOUNT":
        return action.value;
    default:
        return form_account;
    }
}

function form_amount (form_amount = 0, action) {
    switch(action.type) {
        case "ATTRIBUTE_FORM_AMOUNT":
            return action.value;
        default:
            return form_amount;
    }
}

function current_branch (current_branch = "", action) {
    switch(action.type) {
    case "CHANGE_BRANCH":
        return action.value;
    case "CHANGE_BRANCHES":
        return action.branches[0].code;
    default:
        return current_branch;
    }
}

function current_branch_object (current_branch = {name: '', address: '', code: '', current_queue: 0, difference: 0}, action) {
    switch(action.type) {
    case "CHANGE_BRANCHES":
        return action.branches[0];
    case "CHANGE_BRANCH":
        return action.branch;
    default:
        return current_branch;
    }
}

function current_transaction (current_transaction = {branch_code: '', actions: [], number: 0}, action) {
    switch (action.type) {
    case "RECV_TRANSACTION":
        return action.value;
    default:
        return current_transaction;
    }
}

const rootReducer = combineReducers({
    userPosition,
    isAuthenticated,
    FACEBOOKAPPID,
    page,
    transaction_type,
    branches,
    queue,
    switch_status,
    form_type,
    form_account,
    form_amount,
    current_branch,
    current_transaction,
    current_branch_object
});

export default rootReducer;