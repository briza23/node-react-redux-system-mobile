import axios from "axios";

function receivePosition(position) {
    const { latitude, longitude } = position.coords;
    return {
        type: "RECV_POSITION",
        latitude,
        longitude
    };
}

function change_page(page) {
    return {
        type: "CHANGE_PAGE",
        page
    };
}

function change_transaction_type(transaction) {
    return {
        type: "CHANGE_TRANSACTION_TYPE",
        transaction
    };
}

function authenticate() {
    return {
        type: "AUTHENTICATE",
        auth: true
    };
}

function receiveError(error) {
    return {
        type: "RECEIVE_ERROR",
        error
    };
}

function change_branches(branches) {
    return {
        type: "CHANGE_BRANCHES",
        branches
    };
}

function change_switch_status(value) {
    return {
        type: "CHANGE_SWITCH_STATUS",
        value
    };
}

function change_nearest(value) {
    return {
        type: "CHANGE_NEAREST",
        value
    };
}

function receiveTransaction(value) {
    return {
        type: "RECV_TRANSACTION",
        value
    };
}

export function submitLocation() {
    return (dispatch, getState) => {
        return axios({
            url: "https://api.cocobeach.site//api/v1/branches",
            params: {
                latitude: getState().userPosition.latitude,
                type: getState().queue,
                longitude: getState().userPosition.longitude,
            },
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                dispatch( change_branches(response.data.data));
                dispatch(getTransaction());
            })
            .catch((response) => {
                dispatch(receiveError(response));
            });
    };
}

export function getTransaction() {
    return (dispatch) => {
        return axios({
            url: "https://api.cocobeach.site//api/v1/transactions/12333322",
            timeout: 20000,
            method: "get",
            responseType: "json"
        })
            .then((response) => {
                if (Object.keys(response.data.data).length > 1) {
                    dispatch( receiveTransaction (response.data.data.attributes));
                    dispatch( change_page(4) );
                }
            })
            .catch((response) => {
                dispatch(receiveError(response));
            });
    };
}

function submitTransaction() {
    return (dispatch, getState) => {
        return axios({
            url: "https://api.cocobeach.site//api/v1/transactions",
            data: {
                user_id: '12333322',
                branch_code: getState().current_branch,
                actions: [
                    {
                        type: getState().form_type,
                        amount: getState().form_amount,
                        account_number: getState().form_account
                    }
                ]
            },
            timeout: 20000,
            method: "post",
            responseType: "json"
        })
            .then((response) => {
                dispatch( getTransaction() );
            })
            .catch((response) => {
                dispatch(receiveError(response));
            });
    };
}
function change_branch(value, branches) {
    return {
        type: "CHANGE_BRANCH",
        value,
        branch: branches.filter(obj => obj.code === value)[0]
    }
}

export function onClickBranch(value) {
    return (dispatch, getState) => {
        dispatch(change_branch(value, getState().branches));
        dispatch(change_page(1));
    }
}

export function getLatLon() {
    return (dispatch) => {
        const getPosition = options => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        };

        getPosition()
            .then((position) => {
                dispatch(receivePosition(position));
                dispatch(change_page(1))
            })
            .catch((err) => {
                dispatch(receiveError(err.message));
            });
    };
}

function getLatLonLocal() {
    return (dispatch) => {
        const getPosition = options => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, options);
            });
        };

        getPosition()
            .then((position) => {
                dispatch(receivePosition(position));
                dispatch(change_page(1))
            })
            .catch((err) => {
                dispatch(receiveError(err.message));
            });
    };
}

export function handleChangePage(page) {
    return (dispatch) => {
        dispatch( change_page(page));
    };
}

export function handleChangeTransactionType(type, page) {
    return (dispatch) => {
        dispatch( change_page(page));
        dispatch( change_transaction_type(type));
        dispatch( changeAttribute("FORM_TYPE", type));
    };
}

export function handleContinueTransaction(page) {
    return (dispatch) => {
        dispatch( change_page(page));
        if (page === 4) {
            dispatch(submitTransaction());
        }
    };
}


export function login() {
    return (dispatch) => {
        dispatch(authenticate());
    };
}

export function handleChangeQueue(){
    return (dispatch, getState) => {
        let status = 0;
        let queue = "nearest";
        if(getState().switch_status === 1){
            status = 2;
            queue = "fastest";
        }else{
            queue = "nearest";
            status = 1;
        }
        dispatch(change_switch_status(status));
        dispatch(change_nearest(queue));
        dispatch(getLatLonLocal());
    };
}

export function changeAttribute(type, value) {
    return {
        type: "ATTRIBUTE_" + type,
        value
    }
}