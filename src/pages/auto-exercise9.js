import React from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

function addNewlines(str) {
    var result = '';
    while (str.length > 0) {
        result += str.substring(0, 40) + '\n';
        str = str.substring(40);
    }
    return result;
}

export default class ExerciseAG9 extends React.Component {

    componentDidMount() {
        function eventPos(e) {
    if (e.type.match(/^touch/)) {
        e = e.originalEvent.changedTouches[0];
    }
    return {
        pageX: e.pageX,
        pageY: e.pageY
    };
} // here is a comment

var Map = function ($container) {
    $container.css({
        "z-index": 1,
        overflow: "hidden",
        width: "740px",
        height: "694px",
        margin: "0px auto 0",
        background: "#fff",
        position: "relative"
    }); /** another comment */

    var $overlay = $container.children("img");
    $overlay.css({
        background: "transparent",
        position: "relative"
    });

    var sign = function (x) {
        return x > 0 ? +1 : x < 0 ? -1 : 0;
    };
    var pow = function (x, y) {
        return Math.pow(Math.abs(x), y) * sign(x);
    };
    var clamp = function (x, min, max) {
        return Math.max(Math.min(x, max), min);
    };

    var offset = $container.offset();

    var padding_top = 200;
    var size = [14, 48, 25, 33];

            console.log('size', size);
            if (typeof(size.length) == 'number' && size.length < 1) {
                console.log('skipping because size has length and its 0');
                document.getElementById('size_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${size}`).includes("object") && size[0]) {
                    $('#size')[0].innerHTML = `<plaintext class="pt">${addNewlines(size[0].outerHTML)}`
                }
                else {
                    if (size.selector) {
                        $('#size')[0].innerHTML = `${size.selector}`
                    }
                    else {
                        $('#size')[0].innerHTML = `${size}`
                    }
                }
            }
            //}
        
    var tilesize = 2048;

            console.log('tilesize', tilesize);
            if (typeof(tilesize.length) == 'number' && tilesize.length < 1) {
                console.log('skipping because tilesize has length and its 0');
                document.getElementById('tilesize_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${tilesize}`).includes("object") && tilesize[0]) {
                    $('#tilesize')[0].innerHTML = `<plaintext class="pt">${addNewlines(tilesize[0].outerHTML)}`
                }
                else {
                    if (tilesize.selector) {
                        $('#tilesize')[0].innerHTML = `${tilesize.selector}`
                    }
                    else {
                        $('#tilesize')[0].innerHTML = `${tilesize}`
                    }
                }
            }
            //}
        
    var visible = [];
    var container_size = [$container.width(), $container.height()];
    var scroll_delta = null;

    var $map = $container.children(".map");

            console.log('$map', $map);
            if (typeof($map.length) == 'number' && $map.length < 1) {
                console.log('skipping because $map has length and its 0');
                document.getElementById('dmap_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `<plaintext class="pt">${addNewlines($map[0].outerHTML)}`
                }
                else {
                    if ($map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector}`
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`
                    }
                }
            }
            //}
        

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });

            console.log('$map', $map);
            if (typeof($map.length) == 'number' && $map.length < 1) {
                console.log('skipping because $map has length and its 0');
                document.getElementById('dmap_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `<plaintext class="pt">${addNewlines($map[0].outerHTML)}`
                }
                else {
                    if ($map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector}`
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`
                    }
                }
            }
            //}
        

    var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];

            console.log('position', position);
            if (typeof(position.length) == 'number' && position.length < 1) {
                console.log('skipping because position has length and its 0');
                document.getElementById('position_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                    $('#position')[0].innerHTML = `<plaintext class="pt">${addNewlines(position[0].outerHTML)}`
                }
                else {
                    if (position.selector) {
                        $('#position')[0].innerHTML = `${position.selector}`
                    }
                    else {
                        $('#position')[0].innerHTML = `${position}`
                    }
                }
            }
            //}
        

    $map.find(".ground").css({
        top: size[0] * tilesize,
        height: size[2] * tilesize,
        position: "absolute",
        width: "100%",
        zIndex: -1,
        background: "#000"
    });

    var centre = [-1, 0];

            console.log('centre', centre);
            if (typeof(centre.length) == 'number' && centre.length < 1) {
                console.log('skipping because centre has length and its 0');
                document.getElementById('centre_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${centre}`).includes("object") && centre[0]) {
                    $('#centre')[0].innerHTML = `<plaintext class="pt">${addNewlines(centre[0].outerHTML)}`
                }
                else {
                    if (centre.selector) {
                        $('#centre')[0].innerHTML = `${centre.selector}`
                    }
                    else {
                        $('#centre')[0].innerHTML = `${centre}`
                    }
                }
            }
            //}
        

    var update = function () {
        $map.css({
            left: position[0],
            top: position[1]
        });

            console.log('$map', $map);
            if (typeof($map.length) == 'number' && $map.length < 1) {
                console.log('skipping because $map has length and its 0');
                document.getElementById('dmap_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `<plaintext class="pt">${addNewlines($map[0].outerHTML)}`
                }
                else {
                    if ($map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector}`
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`
                    }
                }
            }
            //}
        

        var centre_last = centre;

            console.log('centre_last', centre_last);
            if (typeof(centre_last.length) == 'number' && centre_last.length < 1) {
                console.log('skipping because centre_last has length and its 0');
                document.getElementById('centre_last_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${centre_last}`).includes("object") && centre_last[0]) {
                    $('#centre_last')[0].innerHTML = `<plaintext class="pt">${addNewlines(centre_last[0].outerHTML)}`
                }
                else {
                    if (centre_last.selector) {
                        $('#centre_last')[0].innerHTML = `${centre_last.selector}`
                    }
                    else {
                        $('#centre_last')[0].innerHTML = `${centre_last}`
                    }
                }
            }
            //}
        
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

            console.log('centre', centre);
            if (typeof(centre.length) == 'number' && centre.length < 1) {
                console.log('skipping because centre has length and its 0');
                document.getElementById('centre_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${centre}`).includes("object") && centre[0]) {
                    $('#centre')[0].innerHTML = `<plaintext class="pt">${addNewlines(centre[0].outerHTML)}`
                }
                else {
                    if (centre.selector) {
                        $('#centre')[0].innerHTML = `${centre.selector}`
                    }
                    else {
                        $('#centre')[0].innerHTML = `${centre}`
                    }
                }
            }
            //}
        

        var tile_name = function (x, y) {
            x -= size[3];

            console.log('x', x);
            if (typeof(x.length) == 'number' && x.length < 1) {
                console.log('skipping because x has length and its 0');
                document.getElementById('x_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${x}`).includes("object") && x[0]) {
                    $('#x')[0].innerHTML = `<plaintext class="pt">${addNewlines(x[0].outerHTML)}`
                }
                else {
                    if (x.selector) {
                        $('#x')[0].innerHTML = `${x.selector}`
                    }
                    else {
                        $('#x')[0].innerHTML = `${x}`
                    }
                }
            }
            //}
        
            y -= size[0];

            console.log('y', y);
            if (typeof(y.length) == 'number' && y.length < 1) {
                console.log('skipping because y has length and its 0');
                document.getElementById('y_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${y}`).includes("object") && y[0]) {
                    $('#y')[0].innerHTML = `<plaintext class="pt">${addNewlines(y[0].outerHTML)}`
                }
                else {
                    if (y.selector) {
                        $('#y')[0].innerHTML = `${y.selector}`
                    }
                    else {
                        $('#y')[0].innerHTML = `${y}`
                    }
                }
            }
            //}
        
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");

            console.log('$remove', $remove);
            if (typeof($remove.length) == 'number' && $remove.length < 1) {
                console.log('skipping because $remove has length and its 0');
                document.getElementById('dremove_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                    $('#dremove')[0].innerHTML = `<plaintext class="pt">${addNewlines($remove[0].outerHTML)}`
                }
                else {
                    if ($remove.selector) {
                        $('#dremove')[0].innerHTML = `${$remove.selector}`
                    }
                    else {
                        $('#dremove')[0].innerHTML = `${$remove}`
                    }
                }
            }
            //}
        

            for (var y = -1; y <= +1; y++) {
                for (var x = -1; x <= +1; x++) {
                    var name = tile_name(centre[0] + x, centre[1] + y);

            console.log('name', name);
            if (typeof(name.length) == 'number' && name.length < 1) {
                console.log('skipping because name has length and its 0');
                document.getElementById('name_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${name}`).includes("object") && name[0]) {
                    $('#name')[0].innerHTML = `<plaintext class="pt">${addNewlines(name[0].outerHTML)}`
                }
                else {
                    if (name.selector) {
                        $('#name')[0].innerHTML = `${name.selector}`
                    }
                    else {
                        $('#name')[0].innerHTML = `${name}`
                    }
                }
            }
            //}
        
                    var tile = $map.find(".tile" + name);

            console.log('tile', tile);
            if (typeof(tile.length) == 'number' && tile.length < 1) {
                console.log('skipping because tile has length and its 0');
                document.getElementById('tile_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${tile}`).includes("object") && tile[0]) {
                    $('#tile')[0].innerHTML = `<plaintext class="pt">${addNewlines(tile[0].outerHTML)}`
                }
                else {
                    if (tile.selector) {
                        $('#tile')[0].innerHTML = `${tile.selector}`
                    }
                    else {
                        $('#tile')[0].innerHTML = `${tile}`
                    }
                }
            }
            //}
        
                    if (tile.length) {
                        $remove = $remove.not(tile);

            console.log('$remove', $remove);
            if (typeof($remove.length) == 'number' && $remove.length < 1) {
                console.log('skipping because $remove has length and its 0');
                document.getElementById('dremove_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                    $('#dremove')[0].innerHTML = `<plaintext class="pt">${addNewlines($remove[0].outerHTML)}`
                }
                else {
                    if ($remove.selector) {
                        $('#dremove')[0].innerHTML = `${$remove.selector}`
                    }
                    else {
                        $('#dremove')[0].innerHTML = `${$remove}`
                    }
                }
            }
            //}
        
                    } else {
                        var $image = $(
                            '<img class="tile' +
                                name +
                                '" src="http://imgs.xkcd.com/clickdrag/' +
                                name +
                                '.png" style="top:' +
                                (centre[1] + y) * tilesize +
                                "px;left:" +
                                (centre[0] + x) * tilesize +
                                'px; z-index: -1; position: absolute;;" style="display:none" />'
                        );

            console.log('$image', $image);
            if (typeof($image.length) == 'number' && $image.length < 1) {
                console.log('skipping because $image has length and its 0');
                document.getElementById('dimage_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$image}`).includes("object") && $image[0]) {
                    $('#dimage')[0].innerHTML = `<plaintext class="pt">${addNewlines($image[0].outerHTML)}`
                }
                else {
                    if ($image.selector) {
                        $('#dimage')[0].innerHTML = `${$image.selector}`
                    }
                    else {
                        $('#dimage')[0].innerHTML = `${$image}`
                    }
                }
            }
            //}
        
                        $image
                            .load(function () {
                                $(this).show();
                            })
                            .error(function () {
                                $(this).remove();
                            });
                        $map.append($image);

            console.log('$map', $map);
            if (typeof($map.length) == 'number' && $map.length < 1) {
                console.log('skipping because $map has length and its 0');
                document.getElementById('dmap_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$map}`).includes("object") && $map[0]) {
                    $('#dmap')[0].innerHTML = `<plaintext class="pt">${addNewlines($map[0].outerHTML)}`
                }
                else {
                    if ($map.selector) {
                        $('#dmap')[0].innerHTML = `${$map.selector}`
                    }
                    else {
                        $('#dmap')[0].innerHTML = `${$map}`
                    }
                }
            }
            //}
        
                    }
                }

            console.log('x', x);
            if (typeof(x.length) == 'number' && x.length < 1) {
                console.log('skipping because x has length and its 0');
                document.getElementById('x_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${x}`).includes("object") && x[0]) {
                    $('#x')[0].innerHTML = `<plaintext class="pt">${addNewlines(x[0].outerHTML)}`
                }
                else {
                    if (x.selector) {
                        $('#x')[0].innerHTML = `${x.selector}`
                    }
                    else {
                        $('#x')[0].innerHTML = `${x}`
                    }
                }
            }
            //}
        
            }

            console.log('y', y);
            if (typeof(y.length) == 'number' && y.length < 1) {
                console.log('skipping because y has length and its 0');
                document.getElementById('y_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${y}`).includes("object") && y[0]) {
                    $('#y')[0].innerHTML = `<plaintext class="pt">${addNewlines(y[0].outerHTML)}`
                }
                else {
                    if (y.selector) {
                        $('#y')[0].innerHTML = `${y.selector}`
                    }
                    else {
                        $('#y')[0].innerHTML = `${y}`
                    }
                }
            }
            //}
        

            $remove.remove();

            console.log('$remove', $remove);
            if (typeof($remove.length) == 'number' && $remove.length < 1) {
                console.log('skipping because $remove has length and its 0');
                document.getElementById('dremove_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                    $('#dremove')[0].innerHTML = `<plaintext class="pt">${addNewlines($remove[0].outerHTML)}`
                }
                else {
                    if ($remove.selector) {
                        $('#dremove')[0].innerHTML = `${$remove.selector}`
                    }
                    else {
                        $('#dremove')[0].innerHTML = `${$remove}`
                    }
                }
            }
            //}
        
        }
    };

    update();

    function drag(e) {
        if (scroll_delta) {
            var pos = eventPos(e);
            position[0] = Math.round(
                clamp(pos.pageX + scroll_delta[0], -(size[1] + size[3]) * tilesize + container_size[0], 0)
            );

            console.log('position', position);
            if (typeof(position.length) == 'number' && position.length < 1) {
                console.log('skipping because position has length and its 0');
                document.getElementById('position_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                    $('#position')[0].innerHTML = `<plaintext class="pt">${addNewlines(position[0].outerHTML)}`
                }
                else {
                    if (position.selector) {
                        $('#position')[0].innerHTML = `${position.selector}`
                    }
                    else {
                        $('#position')[0].innerHTML = `${position}`
                    }
                }
            }
            //}
        
            position[1] = Math.round(
                clamp(pos.pageY + scroll_delta[1], -(size[0] + size[2]) * tilesize + container_size[1], 0)
            );

            console.log('position', position);
            if (typeof(position.length) == 'number' && position.length < 1) {
                console.log('skipping because position has length and its 0');
                document.getElementById('position_p').style.display = "none";
            }
            else {
                if (JSON.stringify(`${position}`).includes("object") && position[0]) {
                    $('#position')[0].innerHTML = `<plaintext class="pt">${addNewlines(position[0].outerHTML)}`
                }
                else {
                    if (position.selector) {
                        $('#position')[0].innerHTML = `${position.selector}`
                    }
                    else {
                        $('#position')[0].innerHTML = `${position}`
                    }
                }
            }
            //}
        
            update();
        }
    }

    $container.on("mousedown touchstart", function (e) {
        if (e.button && e.button >= 2) {
            return;
        }
        var pos = eventPos(e);
        scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
        $(document).on(e.type == "mousedown" ? "mousemove" : "touchmove", drag);
        e.preventDefault();
    });
    $(document).on("mouseup touchend", function (e) {
        $(document).off("mousemove touchmove", drag);
        scroll_delta = null;
    });
};

/* 50:72:6f:50:75:6b:65:20:69:73:20:61:77:65:73:6f:6d:65 */

$(function () {
    var map = new Map($("#comic"));
});

    }

    render() {
        return (
            <div className="App">
                <div id="app-title">Scaffolded Exercises</div>
                <br/><br/><br/>
                DOM
                <div id="comic"><div className="map"><div className="ground"></div></div></div>
                <br/>
                <div className="exercises">
                    Variables:
                    <br/><br/>
                    <p id='dmap_p'>$map = <span id='dmap'> </span> </p>
<p id='position_p'>position = <span id='position'> </span> </p>
<p id='centre_last_p'>centre_last = <span id='centre_last'> </span> </p>
<p id='centre_p'>centre = <span id='centre'> </span> </p>
<p id='tilesize_p'>tilesize = <span id='tilesize'> </span> </p>
<p id='x_p'>x = <span id='x'> </span> </p>
<p id='y_p'>y = <span id='y'> </span> </p>
<p id='size_p'>size = <span id='size'> </span> </p>
<p id='dremove_p'>$remove = <span id='dremove'> </span> </p>
<p id='name_p'>name = <span id='name'> </span> </p>
<p id='tile_p'>tile = <span id='tile'> </span> </p>
<p id='dimage_p'>$image = <span id='dimage'> </span> </p>

                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is happening in the code?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is the relationship between the following variables: $map?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                    </div>
                </div>
                <a href='/exercise-auto10'>Next Exercise</a>
            </div>
        )
    }
}
    