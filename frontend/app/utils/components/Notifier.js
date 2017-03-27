export const Notifier = (function() {
    const apply_styles = function(element, style_object) {
        for (const prop in style_object)
            if (style_object.hasOwnProperty(prop))
                element.style[prop] = style_object[prop];
    };

    const fade_out = function(element) {
        if (element.style.opacity && element.style.opacity > 0.05) {
            element.style.opacity = element.style.opacity - 0.05;
        } else if (element.style.opacity && element.style.opacity <= 0.1) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        } else {
            element.style.opacity = 0.9;
        }
        setTimeout(function() {
            fade_out.apply(this, [element]);
        }, 1000 / 30);
    };

    const config = { /* How long the notification stays visible */
        default_timeout: 15000,
        /* container for the notifications */
        container: document.createElement('div'),
        /* container styles for notifications */
        container_styles: {
            position: "fixed",
            zIndex: 99999,
            right: "12px",
            bottom: "40px"
        },
        /* individual notification box styles */
        box_styles: {
            cursor: "pointer",
            padding: "18px 18px",
            margin: "0 0 6px 0",
            backgroundColor: "#000",
            opacity: 0.8,
            color: "#fff",
            font: "normal 13px 'Lucida Sans Unicode', 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif",
            borderRadius: "3px",
            boxShadow: "#999 0 0 12px",
            width: "300px"
        },
        /* individual notification box hover styles */
        box_styles_hover: {
            opacity: 1,
            boxShadow: "#000 0 0 12px"
        },
        /* notification title text styles */
        title_styles: {
            fontWeight: "700"
        },
        /* notification body text styles */
        text_styles: {
            wordWrap: 'break-word'
        },
        /* notification icon styles */
        icon_styles: {
            display: "inline-block",
            verticalAlign: "middle",
            height: "36px",
            width: "36px"
        }
    };

    apply_styles(config.container, config.container_styles);

    document.body.appendChild(config.container);

    return {
        notify: function(message, title, image, backgroundColor) {
            let notification = document.createElement('div');
            notification.className = 'row';

            if (backgroundColor)
                config.box_styles.backgroundColor = backgroundColor;

            apply_styles(notification, config.box_styles);

            notification.onmouseover = function() {
                apply_styles(this, config.box_styles_hover);
            };

            notification.onmouseout = function() {
                apply_styles(this, config.box_styles);
            };

            notification.onclick = function() {
                this.style.display = 'none';
            };

            let iconContainer = document.createElement('div');
            iconContainer.className = 'col-xs-2 no-padding';

            let icon = document.createElement('img');
            icon.src = image;
            apply_styles(icon, config.icon_styles);

            iconContainer.appendChild(icon);

            notification.appendChild(iconContainer);

            let text = document.createElement('div');
            text.className = 'col-xs-10 no-padding';

            notification.appendChild(text);

            if (title) {
                let title_text = document.createElement('div');
                apply_styles(title_text, config.title_styles);
                title_text.appendChild(document.createTextNode(title));
                text.appendChild(title_text);
            }

            if (message) {
                let message_text = document.createElement('span');
                message_text.appendChild(document.createTextNode(message));
                message_text.innerHTML = message;
                apply_styles(message_text, config.text_styles);
                text.appendChild(message_text);
            }

            config.container.insertBefore(notification, config.container.firstChild);

            setTimeout(function() {
                fade_out(notification);
            }, config.default_timeout);
        },
        info: function(message, title) {
            this.notify(message, title, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=", '#2f96b4');
        },
        warning: function(message, title) {
            this.notify(message, title, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=", '#f89406');
        },
        success: function(message, title) {
            this.notify(message, title, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==", '#1ab394');
        },
        error: function(message, title) {
            this.notify(message, title, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=", '#bd362f');
        }
    };
}());