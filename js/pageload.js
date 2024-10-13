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
    });

}

function loadExpriance(data) {
    //expriance
    data.expriance.forEach(element => {
        $(".expm").append(renderProject(element.companynme, element.role, element.startDate, element.enddate, element.des));

    });

}

function renderProject(compname, position, start, end, des) {
    let elo = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title"><b>${compname}</b></h5>
          <h6 class="card-subtitle mb-2 text-muted">${position}</h6>
          <p class="card-text">
            <small class="text-muted">${start} - ${end}</small><br>
            ${des}
          </p>
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

    data.forEach(element => {

        var layout = ` <div class="card mb-2">
      <div class="card-body">
        <b class="card-text text-wrap">${element.name}</b>
        </br>
         <small class="card-text text-wrap">${element.associated_with}</small>
         </br>
        <small>${element.start_date} - ${element.end_date} </small>
        <p class= "text-wrap">${element.description}</p>
      </div>
    </div>`;

        $("#projecter").append(layout);
    });


}

function skillCapus(data) {
    var darkColor = getRandomDarkColor();
    data.forEach(element => {
        var cap = `<span class="badge badge-pill skill-badge text-white" style="background-color: ${getRandomDarkColor()};">
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
// Example usage:

