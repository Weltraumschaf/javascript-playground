(function () {
    // constants
    var CANVAS_WIDTH = 640,
        CANVAS_HEIGHT = 360,
        RECTANGLE_WIDTH = 32,
        RECTANGLE_HEIGHT = 32;

    var context, controller, rectangle, loop;

    context = document.querySelector("canvas").getContext("2d");

    context.canvas.width = CANVAS_WIDTH;
    context.canvas.height = CANVAS_HEIGHT;

    rectangle = {
        width: RECTANGLE_WIDTH,
        height: RECTANGLE_HEIGHT,
        x: CANVAS_WIDTH / 2 - RECTANGLE_WIDTH / 2,
        x_velocity: 0,
        y: 0,
        y_velocity: 0,
        jumping: true
    };

    controller = {
        left: false,
        right: false,
        up: false,

        keyListener: function (event) {
            var key_state = (event.type == "keydown") ? true : false;

            switch (event.keyCode) {
                case 37: // left key
                    controller.left = key_state;
                    break;
                case 38: // key up
                    controller.up = key_state;
                    break;
                case 39: // right key
                    controller.right = key_state;
                    break;
            }
        }
    };

    loop = function () {
        if (controller.up && rectangle.jumping == false) {
            rectangle.y_velocity -= 20;
            rectangle.jumping = true;
        }

        if (controller.left) {
            rectangle.x_velocity -= 0.5;
        }

        if (controller.right) {
            rectangle.x_velocity += 0.5;
        }

        rectangle.y_velocity += 1.5; // gravity
        rectangle.x += rectangle.x_velocity;
        rectangle.y += rectangle.y_velocity;
        rectangle.x_velocity *= 0.9; // friction
        rectangle.y_velocity *= 0.9; // friction

        // If rectangle is faling below floor line.
        if (rectangle.y > CANVAS_HEIGHT - 16 - RECTANGLE_HEIGHT) {
            rectangle.jumping = false;
            rectangle.y = CANVAS_HEIGHT - 16 - RECTANGLE_HEIGHT;
            rectangle.y_velocity = 0;
        }

        // If rectangle is going off the left of the screen.
        if (rectangle.x < -RECTANGLE_WIDTH) {
            rectangle.x = CANVAS_WIDTH;
        } else if (rectangle.x > CANVAS_WIDTH) {
            rectangle.x = -RECTANGLE_WIDTH;
        }

        context.fillStyle = "#202020";
        context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        context.fillStyle = "#ff0000";
        context.beginPath();
        context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        context.fill();
        context.strokeStyle = "#202830";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(0, CANVAS_HEIGHT - 16);
        context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 16);
        context.stroke();

        // Call update when the browser is ready to draw again.
        window.requestAnimationFrame(loop);
    };

    window.addEventListener("keydown", controller.keyListener);
    window.addEventListener("keyup", controller.keyListener);
    window.requestAnimationFrame(loop);
}());
