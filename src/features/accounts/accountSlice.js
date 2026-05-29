



const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading : false
}


export default function accountReducer(state = initialStateAccount, action){

    switch(action.type){

        case 'account/deposit':
            return {...state, balance: state.balance + action.payload, isLoading: false};
        
        case 'account/withdraw':
            return {...state, balance: state.balance - action.payload};


        case 'account/requestLoan':
            if(state.loan > 0) return;
            return {...state, loan:action.payload.amount, 
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount};

        case 'account/payLoan':
            return {...state, 
                loan: 0, 
                loanPurpose: '', 
                balance: state.balance - state.loan}

        case 'account/convertingCurrency':
            return {...state, isLoading: true}
        
        default: 
            return {...state}

    }
}


// ACTION CREATORS
export function deposit(amount,currency){
    if(currency === 'USD') return {type:'account/deposit', payload: amount};

    return async function(dispatch, getState){

        dispatch({type:'account/convertingCurrency'})

        // api call
        const res = await fetch((`https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`));
        const data = await res.json();
        // console.log(data);

        const convertedAmount = data.rates.USD;
        dispatch({type:'account/deposit', payload: convertedAmount});

    }
}

export function withdraw(amount){
    return {type: 'account/withdraw', payload: amount}
}

export function requestLoan(amount, purpose){
    return {type: 'account/requestLoan', payload: {amount, purpose}};
}

export function payLoan(){
    return {type: 'account/payLoan'}
}

// store.dispatch(deposit(500));
// console.log(store.getState())
// store.dispatch(withdraw(200));
// console.log(store.getState())
// store.dispatch(requestLoan(1000,'buy a car'));
// console.log(store.getState())
// store.dispatch(payLoan());
// console.log(store.getState())

