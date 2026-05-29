import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}


// C - accept props
function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}


// A - create function
function mapStateToProps(state){
  return {
    balance: state.account.balance
  }
}

// B - export
export default connect(mapStateToProps)(BalanceDisplay);
