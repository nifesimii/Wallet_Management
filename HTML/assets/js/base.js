const Finapp = {
    //-------------------------------------------------------------------
    // PWA Settings
    PWA: {
        enable: true, // Enable or disable PWA
    },
    //-------------------------------------------------------------------
    // Dark Mode Settings
    Dark_Mode: {
        default: false, // Set dark mode as main theme
        local_mode: { // Activate dark mode between certain times of the day
            enable: false, // Enable or disable local dark mode
            start_time: 20, // Start at 20:00
            end_time: 7, // End at 07:00
        },
        auto_detect: { // Auto detect user's preferences and activate dark mode
            enable: false,
        }
    },
    // Animations
    Animation: {
        goBack: true, // Go back page animation
    },
    //-------------------------------------------------------------------
    // Test Mode
    Test: {
        enable: true, // Enable or disable test mode
        word: "testmode", // The word that needs to be typed to activate test mode
        alert: true, // Enable or disable alert when test mode is activated
        alertMessage: "Test mode activated. Look at the developer console!" // Alert message
    }
    //-------------------------------------------------------------------
}
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Elements
//-----------------------------------------------------------------------
let pageBody = document.querySelector("body");
let appSidebar = document.getElementById("sidebarPanel")
let loader = document.getElementById('loader');
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Service Workers
//-----------------------------------------------------------------------
if (Finapp.PWA.enable) {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('__service-worker.js')
            .then(reg => console.log('service worker registered'))
            .catch(err => console.log('service worker not registered - there is an error.', err));
    }
}
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Page Loader with preload
//----------------------------------------------------------------------
setTimeout(() => {
    loader.setAttribute("style", "pointer-events: none; opacity: 0; transition: 0.2s ease-in-out;");
    setTimeout(() => {
        loader.setAttribute("style", "display: none;")
    }, 1000);
}, 450);
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Go Back Animation
function goBackAnimation() {
    pageBody.classList.add("animationGoBack")
    setTimeout(() => {
        window.history.go(-1);
    }, 300);
}
// Go Back Button
let goBackButton = document.querySelectorAll(".goBack");
goBackButton.forEach(function (el) {
    el.addEventListener("click", function () {
        if (Finapp.Animation.goBack) {
            goBackAnimation();
        }
        else {
            window.history.go(-1);
        }

    })
})
//-----------------------------------------------------------------------

//-----------------------------------------------------------------------
// Fix for # href
//-----------------------------------------------------------------------
let aWithHref = document.querySelectorAll('a[href*="#"]');
aWithHref.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
    })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Input
// Clear input
let clearInput = document.querySelectorAll(".clear-input");
clearInput.forEach(function (el) {
    el.addEventListener("click", function () {
        let parent = this.parentElement
        let input = parent.querySelector(".form-control")
        input.focus();
        input.value = "";
        parent.classList.remove("not-empty");
    })
})
// active
let formControl = document.querySelectorAll(".form-group .form-control");
formControl.forEach(function (el) {
    // active
    el.addEventListener("focus", () => {
        let parent = el.parentElement
        parent.classList.add("active")
    });
    el.addEventListener("blur", () => {
        let parent = el.parentElement
        parent.classList.remove("active")
    });
    // empty check
    el.addEventListener("keyup", log);
    function log(e) {
        let inputCheck = this.value.length;
        if (inputCheck > 0) {
            this.parentElement.classList.add("not-empty")
        }
        else {
            this.parentElement.classList.remove("not-empty")
        }
    }
})
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Searchbox Toggle
let searchboxToggle = document.querySelectorAll(".toggle-searchbox")
searchboxToggle.forEach(function (el) {
    el.addEventListener("click", function () {
        let search = document.getElementById("search")
        let a = search.classList.contains("show")
        if (a) {
            search.classList.remove("show")
        }
        else {
            search.classList.add("show")
            search.querySelector(".form-control").focus();
        }
    })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Carousel
// Splide Carousel
document.addEventListener('DOMContentLoaded', function () {

    // Full Carousel
    document.querySelectorAll('.carousel-full').forEach(carousel => new Splide(carousel, {
        perPage: 1,
        rewind: true,
        type: "loop",
        gap: 0,
        arrows: false,
        pagination: false,
    }).mount());

    // Single Carousel
    document.querySelectorAll('.carousel-single').forEach(carousel => new Splide(carousel, {
        perPage: 3,
        rewind: true,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 1
            },
            991: {
                perPage: 2
            }
        }
    }).mount());

    // Multiple Carousel
    document.querySelectorAll('.carousel-multiple').forEach(carousel => new Splide(carousel, {
        perPage: 4,
        rewind: true,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 2
            },
            991: {
                perPage: 3
            }
        }
    }).mount());

    // Small Carousel
    document.querySelectorAll('.carousel-small').forEach(carousel => new Splide(carousel, {
        perPage: 9,
        rewind: false,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            768: {
                perPage: 4
            },
            991: {
                perPage: 7
            }
        }
    }).mount());

    // Slider Carousel
    document.querySelectorAll('.carousel-slider').forEach(carousel => new Splide(carousel, {
        perPage: 1,
        rewind: false,
        type: "loop",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: true
    }).mount());

    // Stories Carousel
    document.querySelectorAll('.story-block').forEach(carousel => new Splide(carousel, {
        perPage: 16,
        rewind: false,
        type: "slide",
        gap: 16,
        padding: 16,
        arrows: false,
        pagination: false,
        breakpoints: {
            500: {
                perPage: 4
            },
            768: {
                perPage: 7
            },
            1200: {
                perPage: 11
            }
        }
    }).mount());
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Upload Input
let uploadComponent = document.querySelectorAll('.custom-file-upload');
uploadComponent.forEach(function (el) {
    let fileUploadParent = '#' + el.id;
    let fileInput = document.querySelector(fileUploadParent + ' input[type="file"]')
    let fileLabel = document.querySelector(fileUploadParent + ' label')
    let fileLabelText = document.querySelector(fileUploadParent + ' label span')
    let filelabelDefault = fileLabelText.innerHTML;
    fileInput.addEventListener('change', function (event) {
        let name = this.value.split('\\').pop()
        tmppath = URL.createObjectURL(event.target.files[0]);
        if (name) {
            fileLabel.classList.add('file-uploaded');
            fileLabel.style.backgroundImage = "url(" + tmppath + ")";
            fileLabelText.innerHTML = name;
        }
        else {
            fileLabel.classList.remove("file-uploaded")
            fileLabelText.innerHTML = filelabelDefault;
        }
    })
})
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Notification
// trigger notification
let notificationCloseButton = document.querySelectorAll(".notification-box .close-button");
let notificationTaptoClose = document.querySelectorAll(".tap-to-close .notification-dialog");
let notificationBox = document.querySelectorAll(".notification-box");

function closeNotificationBox() {
    notificationBox.forEach(function (el) {
        el.classList.remove("show")
    })
}
function notification(target, time) {
    let a = document.getElementById(target);
    closeNotificationBox()
    setTimeout(() => {
        a.classList.add("show")
    }, 250);
    if (time) {
        time = time + 250;
        setTimeout(() => {
            closeNotificationBox()
        }, time);
    }
}
// close notification
notificationCloseButton.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.preventDefault();
        closeNotificationBox();
    })
});

// tap to close notification
notificationTaptoClose.forEach(function (el) {
    el.addEventListener("click", function (e) {
        closeNotificationBox();
    })
});
//-----------------------------------------------------------------------


//-----------------------------------------------------------------------
// Dark Mode
let checkDarkModeStatus = localStorage.getItem("FinappDarkmode");
let switchDarkMode = document.querySelectorAll(".dark-mode-switch");
let pageBodyActive = pageBody.classList.contains("dark-mode");

// Check if enable as default
if (Finapp.Dark_Mode.default) {
    pageBody.classList.add("dark-mode");
}

// Local Dark Mode
if (Finapp.Dark_Mode.local_mode.enable) {
    let nightStart = Finapp.Dark_Mode.local_mode.start_time;
    let nightEnd = Finapp.Dark_Mode.local_mode.end_time;
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    if (currentHour >= nightStart || currentHour < nightEnd) {
        // It is night time
        pageBody.classList.add("dark-mode");
    }
}

// Auto Detect Dark Mode
if (Finapp.Dark_Mode.auto_detect.enable)
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        pageBody.classList.add("dark-mode");
    }

function switchDarkModeCheck(value) {
    switchDarkMode.forEach(function (el) {
        el.checked = value
    })
}
// if dark mode on
if (checkDarkModeStatus === 1 || checkDarkModeStatus === "1" || pageBody.classList.contains('dark-mode')) {
    switchDarkModeCheck(true);
    if (pageBodyActive) {
        // dark mode already activated
    }
    else {
        pageBody.classList.add("dark-mode")
    }
}
else {
    switchDarkModeCheck(false);
}
switchDarkMode.forEach(function (el) {
    el.addEventListener("click", function () {
        let darkmodeCheck = localStorage.getItem("FinappDarkmode");
        let bodyCheck = pageBody.classList.contains('dark-mode');
        if (darkmodeCheck === 1 || darkmodeCheck === "1" || bodyCheck) {
            pageBody.classList.remove("dark-mode");
            localStorage.setItem("FinappDarkmode", "0");
            switchDarkModeCheck(false);
        }
        else {
            pageBody.classList.add("dark-mode")
            switchDarkModeCheck(true);
            localStorage.setItem("FinappDarkmode", "1");
        }
    })
})
//-----------------------------------------------------------------------



