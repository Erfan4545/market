import * as actions from './actionTypes'



export default function reducer(state = [], action) {

    if (action.type === actions.PRODUCT_ADDED)
        return [
            ...state,
            {
                productId: action.payload.productId,
                amount: 1
            }
        ];
    else if (action.type === actions.PRODUCT_REMOVED)
        return state.filter(product => product.productId !== action.payload.productId)

    else if (action.type === actions.PRODUCT_INCREMENTED)
        return state.map(product => product.productId !== action.payload.productId ? product : {...product, amount: product.amount + 1 })

    else if (action.type === actions.PRODUCT_REDUCTED)
        return state.map(product => product.productId !== action.payload.productId ? product : {...product, amount: product.amount - 1 })

    else if (action.type === actions.PRODUCT_RETREAVED)
        return action.payload.products

    else if (action.type === actions.PRODUCT_Viped)
        return action.payload.products



    return state;
}