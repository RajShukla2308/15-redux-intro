const initialStateCustomer = {
    fullName: '',
    nationalID: '',
    createdAt: ''
}


export default function customerReducer(state = initialStateCustomer, action){
    switch(action.type){
        case 'customer/createCustomer':
            return {...state, 
                fullName: action.payload.fullName, 
                nationalID: action.payload.nationalID,
                createdAt: action.payload.createdAt}

        case 'customer/updateName':
            return {...state,
                    fullName: action.payload
            }

        default:
            return {...state}
    }
}


// ACTION CREATORS FOR CUSTOMER

export function createCustomer(fullName, nationalID){
    return {type: 'customer/createCustomer', payload: {fullName, nationalID, createdAt: new Date().toISOString()}};
}

export function updateName(fullName){
    return {type: 'customer/updateName', payload: fullName }
}


// store.dispatch(createCustomer('Raj','1234'));
// console.log(store.getState())

// store.dispatch(updateName('raj2'));
// console.log(store.getState())
