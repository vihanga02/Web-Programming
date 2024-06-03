document.querySelector('#check').addEventListener('click', function(){
    let number = document.querySelector('#input').value;
    let currentResult = document.querySelector('#result');

    if(number ===""){
        currentResult.innerHTML = '<div class="errors">Input field is empty</div>';
    }
    else{
        let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
        let result = regex.test(number);
        if(result){
            currentResult.innerHTML = `<div class="success">Valid US number: ${number}</div>`;
        }
        else{
            currentResult.innerHTML = `<div class="errors">Invalid US number: ${number}</div>`;
        }
    }
})

document.querySelector('#clear').addEventListener('click', function(){
    document.querySelector('#input').value = "";
    document.querySelector('#result').innerHTML = "";
})