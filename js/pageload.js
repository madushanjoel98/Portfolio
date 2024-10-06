let images = null;
var jsonloc = 'myprofile.json';
$(document).ready(function () {
    loadJson();
    loadAnimatiom();
   

});

function loadJson() {

    $.getJSON(jsonloc, function (data) {
        // Display the data
        images = data.image_f;
        console.log(images);
        $("#abut_text").html(data.about_me);
        loadExpriance(data);
        loadimages(data.image_f);
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



