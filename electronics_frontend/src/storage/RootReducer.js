var initialState = {
    cart: {
    },
    wishlist: {

    }
}

export default function RootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            state.cart[action.payload[0]] = action.payload[1]
            return { cart: state.cart, wishlist: state.wishlist }
        case 'EDIT_PRODUCT':
            state.cart[action.payload[0]] = action.payload[1]
            return { cart: state.cart, wishlist: state.wishlist }
        case 'DELETE_PRODUCT':
            delete state.cart[action.payload[0]]
            return { cart: state.cart, wishlist: state.wishlist }
        case 'ADD_PRODUCT_WISHLIST':
            state.wishlist[action.payload[0]] = action.payload[1]
            return { cart: state.cart, wishlist: state.wishlist }
        case 'DELETE_PRODUCT_WISHLIST':
            delete state.wishlist[action.payload[0]]
            return { cart: state.cart, wishlist: state.wishlist }
        default:
            return { cart: state.cart, wishlist: state.wishlist }
    }
}