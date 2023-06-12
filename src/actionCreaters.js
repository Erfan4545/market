import * as actions from './actionTypes';

export const productAdded = (productId) => (dispatch) => {
    dispatch({
        type: actions.PRODUCT_ADDED,
        payload: {
            productId: productId,
            number: 1
        }
    })

}

export const productRemoved = (productid) => (dispatch) => {
    dispatch({
        type: actions.PRODUCT_REMOVED,
        payload: {
            productId: productid
        }
    })
}





export const productIncremented = (id) => (dispatch) => {
    dispatch({
        type: actions.PRODUCT_INCREMENTED,
        payload: {
            productId: id
        }
    })
}

export const productReducted = (id) => (dispatch) => {
    dispatch({
        type: actions.PRODUCT_REDUCTED,
        payload: {
            productId: id
        }
    })
}


export const productRetreaved = (products) => (dispatch) => {
    dispatch({
        type: actions.PRODUCT_RETREAVED,
        payload: {
            products
        }
    })
}


export const productViped = (products) => (dispatch) => {
    dispatch({
        type: actions.PRODUCT_Viped,
        payload: {
            products
        }
    })
}