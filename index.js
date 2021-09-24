let displayNavigation = true;
let periodic_scroll = true;

$(document).ready(function () {

    $(".toggle-navigation").click(function () {
        $(this).toggleClass("change");
        toggleDisabled(true, ".toggle-navigation");
        $(".navigation-menu li:not(.title)").slideToggle(500, () => toggleDisabled(false, ".toggle-navigation"));
    });

    $(".panel-toggle").click(function () {
        $(this).toggleClass("panel-toggled");
        toggleDisabled(true, ".panel-toggle");
        $(this).siblings(".panel-info").slideToggle(500, () => { toggleDisabled(false, ".panel-toggle") })
    });

    $('div.slide:not(.active)').css({ display: 'none' });

    $('.next').click(function () {
        var rem_slide = $(this).parent().siblings(".slide.active").removeClass("active");
        var add_slide = $(rem_slide).next(".slide").length ? $(rem_slide).next(".slide") : $(rem_slide).siblings(".slide").first();

        setTimeout(() => {
            $(rem_slide).hide();
            $(add_slide).show().addClass('active');
        }, 500);
    });

    $('.back').click(function () {
        var rem_slide = $(this).parent().siblings(".slide.active").removeClass("active");
        var add_slide = $(rem_slide).prev(".slide").length ? $(rem_slide).prev(".slide") : $(rem_slide).siblings(".slide").last();

        setTimeout(() => {
            $(rem_slide).hide();
            $(add_slide).show().addClass('active');
        }, 500);
    });

    $('.field').focus(function() {
        $(this).addClass('selected');
        $(this).siblings('.icon').addClass('selected');
        $(this).parent().addClass('selected');
    });

    $('.field').blur(function() {
        $(this).removeClass('selected');
        $(this).siblings('.icon').removeClass('selected');
        $(this).parent().removeClass('selected');
    });

    $('.modal-toggle').click(function() {
        let id_str = ($(this).attr('id')).slice(0, -7);
        console.log(id_str);
        $(`#${id_str}`).show();
    });

    $('.modal-close').click(function() {
        $(this).parents('.modal').hide();
    })

    $(document).click(function(e) {
        if (e.target.classList.contains('modal')) {
            $(e.target).hide();
            console.log('true');
        }
    })

    $(document).scroll(function () {

        if (!periodic_scroll) return;
        periodic_scroll = false;

        setTimeout(() => {
            periodic_scroll = true;

            var banner = $(".banner");

            banner.each((i, e) => {
                if (e.getBoundingClientRect().top < window.innerHeight - $(e).height() / 2) {

                    $(e).addClass("active");
                    $(e).children(".banner-line").addClass("active");
                    $(e).children(".banner-text").addClass("active");
                }
                else {
                    console.log("Removing classes...");
                    $(e).removeClass("active");
                    $(e).children(".banner-line").removeClass("active");
                    $(e).children(".banner-text").removeClass("active");
                }
            });
        }, 250);
    });
});

const toggleDisabled = function (val, selector) {
    $(selector).prop("disabled", val);
}