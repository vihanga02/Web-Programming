document.querySelector('button').addEventListener('click', function() {
    let input = document.querySelector('input').value;
    let ret = isPalindrome(input);
    document.querySelector('#result').innerText = ret;
});

function isPalindrome(str) {
    let len = str.length;
    if (len === 0){
        alert("Please input a value");
        return "Please input a value";
    }
    else if (len === 1){
        return `${str} is a palindrome`;
    }
    else{
        let start = 0;
        let end = len -1;
        while(start <= end){
            if(str[start] != str[end]){
                return `${str} is not a palindrome`;
            }
            start++;
            end--;
        }
        return `${str} is a palindrome`;
    }
}
