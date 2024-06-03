document.querySelector('#convert-btn').addEventListener('click', function(){
    let num = document.querySelector('#number').value;

    if (num === ''){
        return "Please enter a valid number";
    }

    num = parseInt(num);

    if (num >= 4000){
        document.querySelector("#output").innerHTML = '<div class="error">Please enter a number less than or equal to 3999</div>';
        return;
    }
    if (num <= 0){
        document.querySelector("#output").innerHTML = '<div class="error">Please enter a number greater than or equal to 1</div>';
        return;
    }
    document.querySelector('#output').innerHTML = convertToRoman(num);
})

function convertToRoman(num) {
    const romanNumerals = [
        { value: 1000, symbol: 'M' },
        { value: 900, symbol: 'CM' },
        { value: 500, symbol: 'D' },
        { value: 400, symbol: 'CD' },
        { value: 100, symbol: 'C' },
        { value: 90, symbol: 'XC' },
        { value: 50, symbol: 'L' },
        { value: 40, symbol: 'XL' },
        { value: 10, symbol: 'X' },
        { value: 9, symbol: 'IX' },
        { value: 5, symbol: 'V' },
        { value: 4, symbol: 'IV' },
        { value: 1, symbol: 'I' }
    ];


    let roman = '';

    for (const numeral of romanNumerals){
        while (num >= numeral.value){
            roman += numeral.symbol;
            num -= numeral.value;
        }
    }

    return roman;
}