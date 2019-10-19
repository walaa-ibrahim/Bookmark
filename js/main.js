//storage data
var bookmarks
if (localStorage.getItem("bookmarkItem")==null) {
    bookmarks=[];
}else{
    bookmarks=JSON.parse(localStorage.getItem("bookmarkItem"));
};
//collect data
var siteNameInp = document.getElementById('siteName');
var siteUrlInp = document.getElementById('siteUrl');
var bookmarkResult= document.getElementById('bookmarkResult');
var inputs= document.getElementsByTagName('input');
var myForm= document.getElementById('myForm');
//messages var
var nameMessag= document.querySelector('#webName .alert');
var urlMessag= document.querySelector('#webUrl .alert');
//validation of siteNameInp
var siteRegx= /^[a-zA-z0-9]+[a-zA-z0-9]/;
siteNameInp.addEventListener("blur", function(){
   if (siteNameInp.value != '' && siteRegx.test(siteNameInp.value)==true) {
    nameMessag.style.display='none'
   }else{
    nameMessag.style.display='block'
   }
});
//validation of siteUrlInp
var urlRegx= /^(http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
siteUrlInp.addEventListener("blur", function(){
   if (siteUrlInp.value != '' && urlRegx.test(siteUrlInp.value)==true) {
    urlMessag.style.display='none'
   }else{
    urlMessag.style.display='block'
   }
});
//add sites
myForm.addEventListener("submit", function(e){
    //prevent default from form submit
    e.preventDefault();
    if (siteNameInp.value != '' && siteRegx.test(siteNameInp.value)==true && siteUrlInp.value != '' && urlRegx.test(siteUrlInp.value)==true) {
        //object of array
        var bookmark={siteName:siteNameInp.value , siteUrl:siteUrlInp.value}
        //push object to bookmarks
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarkItem",JSON.stringify(bookmarks));
       display();
       clear();
   }else{
    alert('please enter all fields');
   }
    
});
//display result of submit
function display(){
    var temp= '';
    for (var i = 0; i < bookmarks.length; i++) {
        temp+='<div class="item py-4">'+
        '<h3 class="ml-md-4">'+bookmarks[i].siteName+
        '<a class="btn btn-info mx-md-3" target="_blank" href="'+bookmarks[i].siteUrl+'">Visit</a>'+
        '<button onclick="deleteSite(\''+bookmarks[i].siteUrl+'\')" class="btn btn-danger">Delete</button>'+
        '</h3>'+
        '</div>'
    }
     bookmarkResult.innerHTML=temp;
};
//function delete site
function deleteSite(url) {
    bookmarks=JSON.parse(localStorage.getItem("bookmarkItem"));
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].siteUrl==url) {
            bookmarks.splice(i,1);
        }
    }
   localStorage.setItem("bookmarkItem", JSON.stringify(bookmarks));
    display();
};
//clear the value of input
function clear(){
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value='';
    }
};
display();
