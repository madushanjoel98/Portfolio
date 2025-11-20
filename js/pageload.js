let images = null;
var jsonloc = 'js/myprofile.json';

$(document).ready(function () {
    loadJson();
    loadAnimatiom();


});

function loadJson() {

    $.getJSON(jsonloc, function (data) {
        // Display the data
        images = data.image_f;
        console.log(images);
        $('#containscv').attr('content', data.about_me);
        $("#abut_text").html(data.about_me);
        loadExpriance(data);
        loadimages(data.image_f);
        loadProjects(data.projects);
        skillCapus(data.skills);
        loadContactME(data.contact);
        loadSome(data.socialme);
        liveProject(data.onlive);
    });

}

function loadExpriance(data) {
    //expriance
    data.expriance.forEach(element => {
        $("#expm").append(renderProject(element.companynme, element.role, element.startDate, element.enddate, element.des));

    });

}

function renderProject(compname, position, start, end, des) {
    let elo = `

<div class="timeline-item">
        <div class="card">
          <h3 class="card-title">${position}</h3>
          <p class="card-subtitle">${compname} | ${start} - ${end}</p>
          <p class="card-text"> ${des}</p>
        </div>
      </div>

    `;
    return elo;
}

function loadAnimatiom() {

    const scrollingContainers = document.getElementsByClassName('scrolling-gallery');

    // Auto-scroll function (horizontal)
    function autoScroll(container) {
        container.scrollBy(1, 0); // Scroll 1 pixel to the right
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollLeft = 0; // If end is reached, go back to the start
        }
    }

    // Set up auto-scrolling for each container
    Array.from(scrollingContainers).forEach(container => {
        let scrollInterval = setInterval(() => autoScroll(container), 50); // Speed of auto-scroll (50ms = slower scroll)

        // Pause auto-scrolling when mouse enters the container, and restart when mouse leaves
        container.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });

        container.addEventListener('mouseleave', () => {
            scrollInterval = setInterval(() => autoScroll(container), 50);
        });
    });
}

function loadimages(arrayd) {
    arrayd.forEach(element => {
        $(`#${element.id}`).attr('src', element.loc);
    });



}

function loadProjects(data) {

    data.forEach((element, index) => {

        let collapseId = "proj_desc_" + index; // unique collapse ID

        var layout = `
                <div class="card mb-2">
                <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div>
                            <h5 class="card-title mb-0">${element.name}</h5>
                            <small class="text-muted text-wrap d-block">${element.associated_with}</small>
                        </div>
                          <button class="btn text-light"
                        data-bs-toggle="collapse"
                        data-bs-target="#${collapseId}">
                                       <i class="fa-solid fa-circle-info" data-bs-toggle="tooltip" data-bs-placement="right" title="Project information"></i>
                    </button>

                    </div>
                    <small class="text-nowrap"> ${element.start_date} - ${element.end_date}</small>
                    <div id="${collapseId}" class="collapse mt-2 pt-2 border-top">
                        <p class="text-wrap mb-0">${element.description}</p>
                    </div>

                </div>
            </div>
        `;

        $("#projecter").append(layout);
    });

}

function skillCapus(data) {
    var darkColor = getRandomDarkColor();
    data.forEach(element => {
        var cap = `<span class="skill-badge" >
                  ${element}
                  </span>`;
        $("#skiller").append(cap);
    });

}

function getRandomDarkColor() {
    // Function to generate random integer between 0 and 255
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Convert RGB values to hex
    function rgbToHex(r, g, b) {
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // Function to calculate luminance
    function calculateLuminance(r, g, b) {
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    let r, g, b, luminance;

    // Loop until we get a color with a luminance value low enough for white text
    do {
        r = randomInt(0, 255);
        g = randomInt(0, 255);
        b = randomInt(0, 255);
        luminance = calculateLuminance(r, g, b);
    } while (luminance > 180); // Adjust threshold to control the darkness (lower = darker)

    // Return the random dark color in hex format
    return rgbToHex(r, g, b);
}
function loadContactME(data) {
    data.forEach(element => {
        var layout = ` <div>
  <a href="${element.data}"><img src="${element.icon}" alt="" width="60px"></a>
 </div>`;
        $("#contacwt").append(layout);
    });

}

function loadSome(data) {
    data.forEach(element => {

        var layout = ` 
          <div class="col col-lg-3">
         <a href="${element.link}"><img src="${element.img}" alt="" width="30%"></a>
        </div>
        
        `;

        $("#socm").append(layout);
    });


}

function liveProject(data) {
    //livepr
    var element = ``;
    data.forEach((element, index) => {
        let collapseId = "livedesc_" + index;  // unique ID

        let item = `
   <div class="card mt-3">
    <div class="card-header d-flex align-items-center">
        <div class="d-flex align-items-center flex-grow-1">
            <img loading="lazy" width="100px" alt="images" src="${element.img}" class="me-3">
            <h5 class="mb-0 me-auto">
                ${element.name}
            </h5>
            
            <button class="btn text-primary p-0" 
                data-bs-toggle="collapse" 
                data-bs-target="#${collapseId}">
                <i class="fa-solid fa-circle-info" data-bs-toggle="tooltip" data-bs-placement="right" title="Project information"></i>
            </button>
        </div>
    </div>
    
    <div id="${collapseId}" class="collapse card-body border-top p-3">
        <p class="mb-0">${element.description}</p>
    </div>
    
    <div class="card-body pt-0">
        <a class="btn btn-primary mt-2" href="${element.url}">
            Explore <i class="fa-solid fa-arrow-right"></i>
        </a>
    </div>
</div>
    `;

        $("#livepr").append(item);
    });


}

// Example usage:

