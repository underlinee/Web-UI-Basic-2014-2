var sTemplate = document.querySelector('#_templates').innerHTML;

var resultArr; //Ajax로 받아오는 북리스트 정보

/*장르 메뉴의 건강/생활을 눌렀을 때, 실행되는 Ajax() 통신 함수*/
function arrFromWellBeing() {
  var url = "response.json"; 
  var request = new XMLHttpRequest();
  request.open("GET" , url , true);
  request.send();
  
  request.onreadystatechange = function() {
    if(request.readyState === 4 && request.status === 200) {
      resultArr = request.responseText;
      resultArr = JSON.parse(resultArr);
    }
  }
}

/*버블링,캡쳐링에 따라 달라지는 것.*/
function captureBodyEvent(){
  var elBody = document.querySelector("body");
  var elApp_menu = document.getElementById("app-selector");
  var elGenre_menu = document.getElementById("genre_menu");

  elBody.addEventListener('click',
    function(e){
      if(e.target.id === "genre" || e.target.parentNode.id === "down-icon"){
        changeDisplay(elGenre_menu);  
        showEachGenre(); 
      }else if(e.target.id == "app-menu"){
        changeDisplay(elApp_menu);
      }else if(e.target.className =="more"){
        showMoreBooks(e.target);
      }else{
        pageInitializer();
      }
    },true);
}

/*장르메뉴, 앱메뉴 등의 display속성 바꾸어 줌 */
function changeDisplay(elTarget){
	var style = window.getComputedStyle(elTarget);
  if(style.display === "none"){
   elTarget.style.display = "block";
  }else{
   elTarget.style.display = "none"
  }
}

/*초기 페이지 설정으로*/
function pageInitializer(){
 var elApp_menu = document.getElementById("app-selector");
 var elGenre_menu = document.getElementById("genre_menu");
 elApp_menu.style.display = "none"
 elGenre_menu.style.display = "none"
}

/*elTarget에 따라 Ajax통신을 하고, 그 결과로 booklist를 전환*/
function showEachGenre(){
 var elChoice = document.getElementById("genre_menu");
 elChoice.addEventListener('click', function(e){
   changeBookElement(sTemplate, e.target.className);
 },false);
}

function changeBookElement(Template, elTarget){
	var elBookList= document.querySelectorAll(".bookCard");
	var elGenre_menu = document.getElementById("genre_menu");
  if(elTarget==="wellBeing"){
    arrFromWellBeing();
  }
  for(var i=0; i<resultArr.length;i++){
    var temp = Template.replace("%=title%",resultArr[i].book_title).replace("%=price%",resultArr[i].price).replace("%=imgUrl%",resultArr[i].imgSrc).replace("%=author%",resultArr[i].author);
    elBookList[i].innerHTML = temp;
  }
  elGenre_menu.style.display = "none";
}


/*더보기 버튼을 누르면, Ajax로 가져온 Booklist를 덧붙여 보여줌*/
function showMoreBooks(elTarget){
  elTarget.addEventListener('click', function(e){
    var bookCard = e.target.parentNode.nextElementSibling.children[0];
    addBookElement(sTemplate, bookCard);
  }, false)
}

function addBookElement(Template, bookCard){
  for(var i=0; i<resultArr.length;i++){
    var temp = Template.replace("%=title%",resultArr[i].book_title).replace("%=price%",resultArr[i].price).replace("%=imgUrl%",resultArr[i].imgSrc).replace("%=author%",resultArr[i].author);
    bookCard.insertAdjacentHTML('beforeend',temp);
  }
}

/*상단 네비게이터를 고정*/
function fixBar(){
  var fixedBar = document.getElementById("gravity-box");
  var fixedBox = document.getElementById("nav-container");
  if(window.scrollY>60){
    fixedBar.style.top = "0px";
    fixedBox.style.top = "0px";
    fixedBar.style.position = "fixed";
    fixedBox.style.position = "fixed";
  }else{
    fixedBar.style.position = "";
    fixedBox.style.position = "";
  }
}


/*마우스 드래그 이벤트(정렬은 구현하지 못함)*/
var isMouseDown = false;
var isMouseOver = false;
var obj = null;
var offsetX = null;
var offsetY = null;


function mouseOver(e) {
  obj = e.target;
  if(obj.parentNode.className==="app-block"){
    obj = e.target.parentNode;
  }

  if(obj.className === "app-block") {
    isMouseOver = true;
  }
  else {
    isMouseOver = false;
    obj = null;
  }
}

function mouseDown(e) {

  if(isMouseOver) {
    isMouseDown = true;
    offsetX = e.clientX - parseInt(obj.offsetLeft);
    offsetY = e.clientY - parseInt(obj.offsetTop);
    obj.style.zIndex = 9999;
  }
}

function mouseMove(e) {

  if(isMouseDown && isMouseOver && obj != null) {
    obj.style.position = "absolute";
    obj.style.margin = "0px";
    obj.style.left = e.clientX - offsetX + "px";
    obj.style.top = e.clientY - offsetY + "px";      

  }
}

function mouseUp() {
  isMouseDown = false;
}

function mouseOut() {
  isMouseOver = false;
  obj = null;
}


window.addEventListener('mouseout', function(e){
  mouseOut(e);
}, false);

window.addEventListener('mouseover', function(e){
  mouseOver(e);
}, false);

window.addEventListener('mousemove', function(e){
  mouseMove(e);
}, false);

window.addEventListener('mouseup', function(e){
  mouseUp(e);
}, false);

window.addEventListener ("mousedown", function(e){
  mouseDown(e);
}, false);

window.addEventListener('scroll', function(){
 fixBar();
}, false);

window.addEventListener('load', function(){
  captureBodyEvent();
  arrFromWellBeing();
}, false);

window.attach('onload', function(){
  showLoadingDisplay();
})
