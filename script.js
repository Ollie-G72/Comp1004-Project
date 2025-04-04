
const SubmitButton1 = document.getElementById("SubmitButton1");
const SubmitButton2 = document.getElementById("SubmitButton2");
const StrengthBox = document.getElementById("StrengthBox");
const ClearHistory = document.getElementById("ClearAllButton");
const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const special = ['@','%','$','£','#','&','!'];



SubmitButton2.addEventListener("click",PasswordAdd);
SubmitButton1.addEventListener("click",PasswordSearch);
GenButton.addEventListener("click",GenPassword);
ClearButton1.addEventListener("click",ClearAll);
ClearButton2.addEventListener("click",ClearAll);
ClearHistory.addEventListener("click",ClearAllHistory);

const PasswordEntryBox = document.forms["PasswordEntry"]["Password"];
PasswordEntryBox.addEventListener("input",StrengthCheck);






function PasswordAdd()
{

    let WebsiteName = document.forms["PasswordEntry"]["Website"].value;
    let Email = document.forms["PasswordEntry"]["Email"].value;
    let Password = document.forms["PasswordEntry"]["Password"].value;
    let key = WebsiteName + Email;
    

    localStorage.setItem(key,Encryption(Password,Email,true));
    
    //add a success indicator
}

function PasswordSearch()
{
    let WebsiteNameS = document.forms["PasswordRequest"]["Website"].value;
    let EmailS = document.forms["PasswordRequest"]["Email"].value;
    let key = WebsiteNameS + EmailS;
    

    let RequestedPassword = localStorage.getItem(key);
    RequestedPassword = Encryption(RequestedPassword,EmailS,false);

    if( RequestedPassword != null)
        {
            document.forms["PasswordRequest"]["PasswordOutput"].value = RequestedPassword;
        }
        else
        {
            document.forms["PasswordRequest"]["PasswordOutput"].value = "No Password Exists";
        }
    
}

function GenNumber(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GenPassword()
{
   

   var Generated = "";
   

   for(let x = 0; x < GenNumber(8,14); x++){
    switch(GenNumber(0,3)){
        case 0:
            Generated = Generated + lowercase[GenNumber(0,25)];
            break;
        case 1:
            Generated = Generated + uppercase[GenNumber(0,25)];
            break;
        case 2:
            Generated = Generated + special[GenNumber(0,6)];
            break;
        case 3:
            Generated = Generated + GenNumber(0,9);
        default:
            Generated = Generated + '0';
    }
   }
   
   document.forms["PasswordEntry"]["Password"].value = Generated;

}

function ClearAll()
{
    document.forms["PasswordEntry"]["Website"].value = "";
    document.forms["PasswordEntry"]["Email"].value = "";
    document.forms["PasswordEntry"]["Password"].value = "";

    document.forms["PasswordRequest"]["Website"].value = "";
    document.forms["PasswordRequest"]["Email"].value = "";
    document.forms["PasswordRequest"]["PasswordOutput"].value = "";
    
}

function StrengthCheck()
{
    let input = PasswordEntryBox.value;
    let Points = 0;

    if(input.length >= 12){
        Points += 3;
    }
    else if (input.length >= 8){
        Points += 2;
    }
    else if (input.length >= 6){
        Points++;
    }

    for(let x = 0; x < lowercase.length; x++){
        if(input.includes(lowercase[x])){
            Points++;
            break;
        }
    }

    for(let x = 0; x < uppercase.length; x++){
        if(input.includes(uppercase[x])){
            Points += 2;
            break;
        }
    }

    for(let x = 0; x < special.length; x++){
        if(input.includes(special[x])){
            Points += 3;
            break;
        }
    }
    
    for(x = 0; x < 10; x++){
        if(input.includes(x)){
            Points += 2;
            break;
        }
    }

    console.log(Points);


    switch(Points){
        case 0:
            StrengthBox.style.backgroundColor = "#ff0303";
            break;
        case 1:
            StrengthBox.style.backgroundColor = "#ff0303";
            break;
        case 2:
            StrengthBox.style.backgroundColor = "##f01c03";
            break;
        case 3:
            StrengthBox.style.backgroundColor = "#e23503";
            break;
        case 4:
            StrengthBox.style.backgroundColor = "#d34e03";
            break;
        case 5:
            StrengthBox.style.backgroundColor = "#c56703";
            break;
        case 6:
            StrengthBox.style.backgroundColor = "#b68003";
            break;
        case 7:
            StrengthBox.style.backgroundColor = "#a89903";
            break;
        case 8:
            StrengthBox.style.backgroundColor = "#99b203";
            break;
        case 9:
            StrengthBox.style.backgroundColor = "#8bcb03";
            break;
        default:
            StrengthBox.style.backgroundColor = "#6eff03";
    } 
}

function ClearAllHistory(){
    localStorage.clear();
}

function Encryption(Password,Email,EorD)
{
    let Caesar = Email.length;
    let Temp;
    let Final = "";
        
    if(EorD == true){ //Enctryption
        for(let x = 0; x < Password.length; x++){
            Temp = Password.charCodeAt(x) + Caesar;
            console.log(Temp);
            Final = Final + String.fromCharCode(Temp);
            console.log(Final[x]);
        }

    }
    else //decryption
    {
        for(let x = 0; x < Password.length; x++){
            Temp = Password.charCodeAt(x) - Caesar;
            console.log(Temp);
            Final = Final + String.fromCharCode(Temp);
            console.log(Final[x]);
        }
    }
    
    return Final;
}