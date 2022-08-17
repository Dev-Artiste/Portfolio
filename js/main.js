/* Preloader */
$(window).on('load', function () {
    setTimeout(function () {
        // Animate loader off screen
        $(".site-loader").fadeOut("slow");
    }, 1000);
});

/* Link to #Portfolio section */
$("#portfolio-link").click(function () {
    $('html,body').animate({
        scrollTop: $("#portfolio").offset().top
    }, 'slow');
});

/* Home Slideshow */
// https://codepen.io/seanfree/pen/LxPBZy
let $slides, interval, $selectors, $btns, currentIndex, nextIndex;

let cycle = index => {
    let $currentSlide, $nextSlide, $currentSelector, $nextSelector;

    nextIndex = index !== undefined ? index : nextIndex;

    $currentSlide = $($slides.get(currentIndex));
    $currentSelector = $($selectors.get(currentIndex));

    $nextSlide = $($slides.get(nextIndex));
    $nextSelector = $($selectors.get(nextIndex));

    $currentSlide.removeClass("active").css("z-index", "0");

    $nextSlide.addClass("active").css("z-index", "1");

    $currentSelector.removeClass("current");
    $nextSelector.addClass("current");

    currentIndex = index !== undefined ?
        nextIndex :
        currentIndex < $slides.length - 1 ?
            currentIndex + 1 :
            0;

    nextIndex = currentIndex + 1 < $slides.length ? currentIndex + 1 : 0;
};

$(() => {
    currentIndex = 0;
    nextIndex = 1;

    $slides = $(".slide");
    $selectors = $(".selector");
    $btns = $(".btn");

    $slides.first().addClass("active");
    $selectors.first().addClass("current");

    interval = window.setInterval(cycle, 6000);

    $selectors.on("click", e => {
        let target = $selectors.index(e.target);
        if (target !== currentIndex) {
            window.clearInterval(interval);
            cycle(target);
            interval = window.setInterval(cycle, 6000);
        }
    });

    $btns.on("click", e => {
        window.clearInterval(interval);
        if ($(e.target).hasClass("prev")) {
            let target = currentIndex > 0 ? currentIndex - 1 : $slides.length - 1;
            cycle(target);
        } else if ($(e.target).hasClass("next")) {
            cycle();
        }
        interval = window.setInterval(cycle, 6000);
    });
});

/* Porfolio Menu */
(function ($, window, document) {

    $('[data-toggle]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        target.toggle();
    });

    // Cache selectors
    var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight() + 15,
        // All list items
        menuItems = topMenu.find("a"),
        // Anchors corresponding to menu items
        scrollItems = menuItems.map(function () {
            var item = $(this).attr("href");
            if (item != '#') { return $(item) }
        });

    console.log(scrollItems)


    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });

    // Bind to scroll
    $(window).scroll(function () {
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight;

        // Get id of current scroll item
        var cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                // console.log(this)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length - 1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active-pf-item")
                .end().filter("[href='#" + id + "']").parent().addClass("active-pf-item");
        }
    });
})(jQuery, window, document);
