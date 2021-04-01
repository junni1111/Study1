const idForm = document.querySelector(".js-idForm"),
     idInput = idForm.querySelector("input"),
     pwForm = document.querySelector(".js-pwForm"),
     pwInput = pwForm.querySelector("input");

const btn = document.querySelector(".js-btn"),
    clear = document.querySelector(".js-clear");

const ACCOUNTS_LS = "accounts";

let accounts = [];

function saveAccounts(){
    localStorage.setItem(ACCOUNTS_LS, JSON.stringify(accounts));
}

function joinAccount(idText, pwText){
    let flag = true;
    const accountObj = {
        id : idText,
        pw : pwText
    };
    accounts.forEach(function(account){
        if(account.id === idText) flag = false;
    });
    if(flag){
        accounts.push(accountObj);
        console.log(idText, pwText);
        saveAccounts();
        confirm(idText + "님 회원가입 하신 것을 환영합니다.");
    }
    else{
        confirm("다른 ID를 입력해 주세요.");
    }
}

function loginAccount(idText, pwText){
    // true : PW 일치, false : PW 불일치
    let flag = false;
    accounts.forEach(function(account){
        if(account.id === idText && account.pw === pwText) flag = true;
    });
    if(flag){
        confirm(idText + "님 환영합니다. 로그인 되었습니다.");
    } else{
        confirm("아이디 혹은 비밀번호가 일치하지 않습니다.");
    }
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = idInput.value;
    console.log(currentValue);

    if(idInput.value !== "" && pwInput.value !== ""){
        // true : login, false : join
        let flag = false;
        if(accounts !== null){
            accounts.forEach(function(account){
                if(account.id === idInput.value) flag = true;
            });
        }
        if(flag){
            loginAccount(idInput.value, pwInput.value);
        } else if(confirm("회원가입 하시겠습니까?") == true){
            joinAccount(idInput.value, pwInput.value);
        }
    } else{
        confirm("ID 및 PW를 모두 입력해 주세요.");

    }
}

function handleClick(event){
    const btnClicked = event.target;

    if(idInput.value === "" || pwInput.value === ""){
        confirm("ID 및 PW를 모두 입력해 주세요.");
    } else if(btnClicked.name === "join"){
        joinAccount(idInput.value, pwInput.value);
    } else{
        loginAccount(idInput.value, pwInput.value);
    }
}

function loadAccounts(){
    const loadedAccounts = localStorage.getItem(ACCOUNTS_LS);
    console.log(loadAccounts);
    if(loadedAccounts !== null){
        const parsedAccounts = JSON.parse(loadedAccounts);
        console.log(parsedAccounts);
        parsedAccounts.forEach(function(account){
            const accountObj = {
                id : account.id,
                pw : account.pw
            };
            accounts.push(accountObj);
        });
    }
    else{
        accounts = [];
    }
}

function clearAccounts(){
    localStorage.removeItem(ACCOUNTS_LS);
    loadAccounts();
}

function init(){
    loadAccounts();
    btn.addEventListener("click", handleClick);
    clear.addEventListener("click", clearAccounts);
    idForm.addEventListener("submit", handleSubmit);
    pwForm.addEventListener("submit", handleSubmit);
}

init();