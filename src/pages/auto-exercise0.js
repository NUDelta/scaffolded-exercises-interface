import React from 'react';
import { useState } from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

const selectors = {};

function addNewlines(str, variable_name) {
    // this runs every time a DOM element is shown as a variable on the page, so we should update the selectors at this stage
    // we do it by classes for now
    let class_loc = str.indexOf('class="') + 'class="'.length;
    let end_class_loc = str.substring(class_loc).indexOf('"');
    let class_name = str.substring(class_loc, class_loc + end_class_loc);
    console.log("in addNewLines class_name:", class_name);
    if (selectors[variable_name]) {
        if (!selectors[variable_name].includes(class_name)) {
            selectors[variable_name].push(class_name);
        }
    }
    else {
        selectors[variable_name] = [];
    }

    var result = '';
    while (str.length > 0) {
        result += str.substring(0, 80) + '\n';
        str = str.substring(80);
    }
    let dotdotdot = "...";
    if (result.length < 150) 
        dotdotdot = " ";
    return result.substring(0,150) + dotdotdot;
}

function h2t(src) { // html to text
    return src.replaceAll("<", "&lt;").replaceAll(">", "&gt;"); //.replace("&", " &amp; "); 
}

function HAButton(props) {
    const [toggle, setToggle] = useState(true);
  
    function handleClick() {
        console.log("in handleClick", toggle, props.id);
        let element_to_a_h = props.id.split("_")[0];
        console.log("element_to_a_h", element_to_a_h);
        console.log("selectors[", element_to_a_h, "]", selectors[element_to_a_h]);
        for (var selector of selectors[element_to_a_h]) {
            let element_to_a_h_html = document.getElementsByClassName(selector);
            console.log("selector", selector, "element_to_a_h_html", element_to_a_h_html);
        }
        setToggle(!toggle);
    }

    function buttonText(t) {
        if (t) return "Annotate / Highlight";
        else return "Unannotate / Unhighlight";
    }
    
    return (
      <button onClick={handleClick}>
          {buttonText(toggle)}
      </button>
    );
}

export default class ExerciseAG0 extends React.Component {

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
    var tilesize = 2048;
    var visible = [];
    var container_size = [$container.width(), $container.height()];
    var scroll_delta = null;

    var $map = $container.children(".map");

    var map_size = [(size[1] + size[3]) * tilesize, (size[0] + size[2]) * tilesize];
    $map.css({
        width: map_size[0],
        height: map_size[1],
        position: "absolute",
        zIndex: -1
    });

    var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];

    $map.find(".ground").css({
        top: size[0] * tilesize,
        height: size[2] * tilesize,
        position: "absolute",
        width: "100%",
        zIndex: -1,
        background: "#000"
    });

    var centre = [-1, 0];

    var update = function () {
        $map.css({
            left: position[0],
            top: position[1]
        });

        var centre_last = centre;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        var tile_name = function (x, y) {
            x -= size[3];
            y -= size[0];
            return (y >= 0 ? y + 1 + "s" : -y + "n") + (x >= 0 ? x + 1 + "e" : -x + "w");
        };

        if (centre[0] != centre_last[0] || centre[1] != centre_last[1]) {
            var $remove = $map.children().not(".ground");


            // console.log('$remove', $remove);
            if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                $('#dremove')[0].innerHTML = `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
            }
            else {
                if ($remove && $remove.selector) {
                    $('#dremove')[0].innerHTML = `${$remove.selector} (we output the selector when length is 0)`;
                }
                else if ($remove && $remove.originalEvent) {
                    $('#dremove')[0].innerHTML = `${$remove.type}`;
                }
                else if (typeof($remove) == 'object') {
                    try {
                        $('#dremove')[0].innerHTML = JSON.stringify($remove);
                    }
                    catch {
                        $('#dremove')[0].innerHTML = `${$remove}`;
                    }
                }
                else {
                    $('#dremove')[0].innerHTML = `${$remove}`;
                }
            }
        
try { $('#name')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#tile')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dremove')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }try { $('#dimage')[0].innerHTML = ''; } catch { console.log('1 unfurlable not on this page.'); }selectors['dremove'] = [];selectors['tile'] = [];selectors['dimage'] = [];selectors['dmap'] = [];
            for (var y = -1; y <= +1; y++) {
                for (var x = -1; x <= +1; x++) {
                    var name = tile_name(centre[0] + x, centre[1] + y);
                    var tile = $map.find(".tile" + name);
                    if (tile.length) {
                        $remove = $remove.not(tile);

            // console.log('$remove', $remove);
            if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                $('#dremove')[0].innerHTML += ' <br> ' + `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
            }
            else {
                if ($remove && $remove.selector) {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${$remove.selector} (we output the selector when length is 0)`;
                }
                else if ($remove && $remove.originalEvent) {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${$remove.type}`;
                }
                else if (typeof($remove) == 'object') {
                    try {
                        $('#dremove')[0].innerHTML += ' <br> ' + JSON.stringify($remove);
                    }
                    catch {
                        $('#dremove')[0].innerHTML += ' <br> ' + `${$remove}`;
                    }
                }
                else {
                    $('#dremove')[0].innerHTML += ' <br> ' + `${$remove}`;
                }
            }
        
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
                        $image
                            .load(function () {
                                $(this).show();
                            })
                            .error(function () {
                                $(this).remove();
                            });
                        $map.append($image);
                    }
                }
            }

            $remove.remove();

            // console.log('$remove', $remove);
            if (JSON.stringify(`${$remove}`).includes("object") && $remove[0]) {
                $('#dremove')[0].innerHTML = `${h2t(addNewlines($remove[0].outerHTML, 'dremove'))}`;
            }
            else {
                if ($remove && $remove.selector) {
                    $('#dremove')[0].innerHTML = `${$remove.selector} (we output the selector when length is 0)`;
                }
                else if ($remove && $remove.originalEvent) {
                    $('#dremove')[0].innerHTML = `${$remove.type}`;
                }
                else if (typeof($remove) == 'object') {
                    try {
                        $('#dremove')[0].innerHTML = JSON.stringify($remove);
                    }
                    catch {
                        $('#dremove')[0].innerHTML = `${$remove}`;
                    }
                }
                else {
                    $('#dremove')[0].innerHTML = `${$remove}`;
                }
            }
        
        }
    };

    update();

    function drag(e) {
        if (scroll_delta) {
            var pos = eventPos(e);
            position[0] = Math.round(
                clamp(pos.pageX + scroll_delta[0], -(size[1] + size[3]) * tilesize + container_size[0], 0)
            );
            position[1] = Math.round(
                clamp(pos.pageY + scroll_delta[1], -(size[0] + size[2]) * tilesize + container_size[1], 0)
            );
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
        let codeToShow = '"/* $remove.remove();:112:112 */\n            $remove.remove();"'
        codeToShow = codeToShow.substring(1, codeToShow.length - 2)
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
                    <p id='dremove_p'>$remove = <span className ="pt" id='dremove'> </span> </p><HAButton id="dremove_button"/>

                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <pre>{codeToShow}</pre>
                        <p>What is happening in the code?</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                        <p>What is the relationship between the following variables: $remove? (Give the meaning of the variable if there is only one.)</p>
                        <textarea className="reflection-textarea" rows="6"></textarea>
                    </div>
                    <a href='/exercise-auto1'>Next Exercise</a>
                </div>
            </div>
        )
    }
}
    