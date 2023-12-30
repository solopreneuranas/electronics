var initialState = {
    cart: {
    }
}

export default function RootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            state.cart[action.payload[0]] = action.payload[1]
            return { cart: state.cart }
        case 'EDIT_PRODUCT':
            state.cart[action.payload[0]] = action.payload[1]
            return { cart: state.cart }
        case 'DELETE_PRODUCT':
            delete state.cart[action.payload[0]]
            return { cart: state.cart }
        default:
            return { cart: state.cart }
    }
}