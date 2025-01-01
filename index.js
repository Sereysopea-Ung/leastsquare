var title1 = document.getElementById('number1-title');
var title2 = document.getElementById('number2-title');
document.addEventListener("DOMContentLoaded", function() {
    if(window.innerWidth<487){
        title1.innerHTML = 'Members';
        title2.innerHTML = 'LS';
    } else {
        title1.innerHTML = 'Team Members';
        title2.innerHTML = 'Least Square';
    }
    window.addEventListener('resize', (event)=>{
        if(window.innerWidth<335){
            title1.innerHTML = 'Members';
            
        } else {
            title1.innerHTML = 'Team Members';
        }
        if(window.innerWidth<487){
            title2.innerHTML = 'LS';
        } else {
            title2.innerHTML = 'Least Square';
        }
    })
});