function fn() {
    // categories nav
    (function() {
        var toggle = document.querySelector('.js-toggle');
        var labels = document.querySelectorAll('.acc label');

        if(toggle !== null) {
            toggle.addEventListener('click', function(e) {
                e.target.parentNode.classList.toggle('visible')
            })
        }

        if(labels.length) {
            labels = Array.prototype.slice.call(labels);

            labels.forEach(function(item) {
                item.addEventListener('click', function(e) {
                    var target = e.target;
                    var input = target.parentNode.querySelector('input[type="radio"]');

                    if(input !== null) {
                        e.preventDefault();
                        input.checked = !input.checked;
                    }

                })
            })
        }
    })();

    // Slider: swiperjs https://idangero.us/swiper/
    (function() {
        var slider = new Swiper('.swiper-container', {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation: {
                prevEl: '.swiper-container .prev',
                nextEl: '.swiper-container .next',
            },
            breakpoints: {
                960: {
                    slidesPerView: 2,
                },
                630: {
                    slidesPerView: 'auto'
                }
            }
        })
    })();

    // TODO: remove // temp not-helpful
    (function() {
        var notHelpful = document.querySelector('input[name="not-helpful"]');
        var helpful = document.querySelector('input[name="helpful"]');
        var notHelpfulContainer = document.querySelector('#not-helpful-container');
        var helpfulContainer = document.querySelector('#helpful-container');

        function clear() {
            [notHelpfulContainer, helpfulContainer]
                .filter(Boolean)
                .forEach(function(item) {
                    item.classList.remove('visible');
                })
        }

        function listener(e, container) {
            e.preventDefault();
            clear();
            container.classList.add('visible');
        }

        if(notHelpful !== null && notHelpfulContainer !== null) {
            notHelpful.addEventListener('click', function(e) {
                listener(e, notHelpfulContainer)
            }, false)
        }

        if(helpful !== null && helpfulContainer !== null) {
            helpful.addEventListener('click', function(e) {
                listener(e, helpfulContainer)
            }, false)
        }
    })();

    // TODO: remove // temp search related articles
    (function() {
        var search = document.getElementById('search-q2');
        var results = document.querySelector('.search-form-large .search-results');
        var visible = 'visible';

        if(search !== null && results !== null) {
            search.setAttribute('autocomplete', 'off');
            search.addEventListener('input', listener);
            document.addEventListener('click', hideResults, false);

            function hideResults() {
                results.classList.remove(visible)
            }

            function listener(e) {
                var target = e.target;

                if(target.value.length > 0) {
                    results.classList.add(visible)
                } else {
                    hideResults()
                }
            }
        }

    })();

    // Breadcrumbs dropdown
    (function(){
        var el = document.querySelectorAll('.breadcrumbs .step');
        var liWidth = 250;
        var columnLength = 4;
        var dropMenuSelector = '.drop-menu';
        var stepSelector = 'step';

        if(el.length) {
            init(el)
        }

        var state = {
            columns: 1,
            direction: false,
            transformLeft: 0
        };

        function toLeft(data) {
            return window.innerWidth - data.left < liWidth
        }

        function setState(data, target) {
            var list = target.parentNode.querySelectorAll('.drop-menu ul li').length;
            var rightColumns = Math.floor((window.innerWidth - (data.left + liWidth))/liWidth) + 1;
            var leftColumns = Math.floor(data.left/liWidth);

            state.direction = leftColumns > rightColumns || toLeft(data);

            state.columns = Math.min(Math.max(leftColumns, rightColumns), Math.floor(list / columnLength));

            if(data.right < liWidth && toLeft(data)) {
                state.transformLeft = liWidth - data.right + 10
            } else {
                state.transformLeft = 0
            }
        }

        function hoverListener(e) {
            var t = e.target;
            var wrap = t.parentNode;
            var dropMenu = t.parentNode.querySelector(dropMenuSelector);

            if(t.classList.contains(stepSelector) && dropMenu !== null) {
                var targetPos = t.getBoundingClientRect();

                setState(targetPos, t);

                wrap.setAttribute('data-columns', state.columns);
                wrap.setAttribute('data-direction', state.direction ? 'left' : 'right');
                dropMenu.style.transform = 'translateX(' + state.transformLeft + 'px)'
            }
        }

        function init(list) {
            list = Array.prototype.slice.call(list);

            if(!list.length) return;

            list.forEach(function(item) {
                item.addEventListener('mouseover', hoverListener, false);
                item.addEventListener('touch', hoverListener, false)
            })
        }
    })();
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(fn);
