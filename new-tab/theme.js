var theme = 0;
function toggleTheme() { 
var sheets = document.getElementsByTagName('link'); 
theme++;
theme = theme%2
if (theme == 0) {
sheets[0].href = "./style.css"
} else {      
sheets[0].href = "./style-light.css"
}; 
return theme;
}
