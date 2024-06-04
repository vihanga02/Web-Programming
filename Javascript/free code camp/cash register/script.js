let cid = [
    ["PENNY", 0.01],
    ["NICKEL", 0.05],
    ["DIME", 0.1],
    ["QUARTER", 0.25],
    ["ONE", 1],
    ["FIVE", 5],
    ["TEN", 10],
    ["TWENTY", 20],
    ["ONE HUNDRED", 100]
];

let cashInDrawer = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

let price = 3.26;

document.querySelector('#purchase-button').addEventListener('click', function() {
    let cash = parseFloat(document.querySelector('input').value);
    const priceScreen = document.getElementById('price-screen');
    const cashDrawerDisplay = document.getElementById('cash-drawer-display');
    let state = 'CLOSED';
    let result = checkCashregister(cash);
    document.querySelector('.change-div').innerHTML = formateResult(result.status, result.change_details);
    updateUI(result.change_details);
})

function checkCashregister(cash){
    let change = cash - price;
    let result = { status: 'OPEN', change_details: []}
    let reversedCID = [...cid].reverse();
    let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];

    if (change < 0){
        alert('Customer does not have enough money to purchase the item');
        return '<div id="changed">Customer does not have enough money to purchase the item</div>';
    }
    else if(change === 0){
        return '<div id="changed">No change due - customer paid with exact cash</div>';
    }
   
    let totalCID = parseFloat(
        cid
            .map((x) => x[1])
            .reduce((a, b) => a + b)
            .toFixed(2)
    );

    if (change > totalCID){
        return '<div id="changed">Status: Insufficient Funds</div>';
    }

    if (change === totalCID){
        return '<div id="changed">Status: Closed</div>';
    }

    for (let i = 0; i < reversedCID.length; i++) {
        let total = 0;
        while (change >= reversedCID[i][1] && total < cashInDrawer[i][1]) {
            total += reversedCID[i][1];
            change -= reversedCID[i][1];
            change = parseFloat(change.toFixed(2));
        }
        if (total > 0) {
            result.change_details.push([reversedCID[i][0], total]);
            cashInDrawer[i][1] -= total;
        }
    }
    if (change > 0) {
        return '<div id="changed">Status: INSUFFICIENT_FUNDS</div>';
    }

    return formateResult(result.status, result.change_details);
}

function formateResult(status, change_details){
    return `<div id="changed">Status: ${status} <br> ${change_details.map((x) => `<p>${x.join(': ')}</p>`).join('')}</div>`;
}

const updateUI = change => {
    const currencyNameMap = {
      PENNY: 'Pennies',
      NICKEL: 'Nickels',
      DIME: 'Dimes',
      QUARTER: 'Quarters',
      ONE: 'Ones',
      FIVE: 'Fives',
      TEN: 'Tens',
      TWENTY: 'Twenties',
      'ONE HUNDRED': 'Hundreds'
    };
    // Update cid if change is passed in
    if (change) {
        change.forEach(changeArr => {
          const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
          targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
        });
    }
  
    cash.value = '';
    priceScreen.textContent = `Total: $${price}`;
    cashDrawerDisplay.innerHTML = `<p><strong>Change in drawer:</strong></p>
      ${cid
        .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
        .join('')}  
    `;
  };