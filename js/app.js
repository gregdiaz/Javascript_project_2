/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/
/**
 * Define Global Variables
 *
*/
var menuCaption, menu_info, menu;
var element_menu = document.querySelectorAll('section');
var nav =  document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

//This Fuction get the element's menu name
function element(){
    let arr = [];
    for(menuCaption of element_menu){
        id = menuCaption.id;
        text = menuCaption.getElementsByTagName("h2")[0].innerText;
        menuCaption ={ id: id, text:  text};
        arr.push(menuCaption);
    };
    return arr;
};
createnav(element());
/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
function createnav(menu){
    for(menu_info of menu){
        let menuop = document.createElement("li");
        let menuLink = document.createElement("a");
        menuLink.setAttribute("href", `#${menu_info.id}`);
        menuop.appendChild(menuLink);
        menuop.setAttribute("target_id",menu_info.id);
        menuop.classList.add("menu__link");
        nav.appendChild(menuop);
    }
    menubuild(menu);
}

// Add class 'active' to section when near top of viewport

function active(elementClicked){
    let activeClass = document.querySelector(".active");
    let selectElement = document.querySelector("li[target_id="+elementClicked+"]");
    if(activeClass){
        activeClass.classList.remove("active");
    };
    selectElement.classList.add("active");
};

// Scroll to anchor ID using scrollTO event
function scroll(menuSelector){
    elementTop =  document.getElementById(menuSelector).offsetTop;
    menuHeight = nav.offsetHeight;
    totalTop =  elementTop - menuHeight;
    window.scrollTo(0,totalTop);
    active(menuSelector);
};

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
function menubuild(menu){
    let divyArray = Array.from(document.querySelectorAll("#navbar__list > li"));
    for(i=0; i <= divyArray.length - 1; i++){
        let write = document.createTextNode(menu[i].text);
        divyArray[i].appendChild(write);
    };
};

// Scroll to section on link click
Array.from (document.querySelector("#navbar__list").children).forEach(element => {
    element.addEventListener("click", elements=>{
        scroll(elements.target.getAttribute("target_id"));
    });
});

// Set sections as active
function scroll(menuSelector){
    elementTop =  document.getElementById(menuSelector).offsetTop;
    menuHeight = nav.offsetHeight;
    totalTop =  elementTop - menuHeight;
    window.scrollTo(0,totalTop);
    active(menuSelector);
    return totalTop;
}

// highlight current tab
$(window).on("scroll", function() {
    var topNavHeight = $('#navbar__list').outerHeight() + 1;
    var lastId;
    var fromTop = $(this).scrollTop() + topNavHeight;
    var menuItems = $("#navbar__list li a");
    var scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });
    var current = scrollItems.map(function(){
        if ($(this).offset().top < fromTop)
        return this;
    });

    current = current[current.length-1];
    var id = current && current.length ? current[0].id : "";
    
    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter(`[href="#${id}"]`).parent().addClass("active");
    }       
});
