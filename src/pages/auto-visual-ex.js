import React from 'react';
import { useState } from 'react';
import './../App.css';
import $ from 'jquery';
window.$ = $;

$(document).on("ready", function(){
    // store variable notes in exercises
    $('textarea').on("change keyup paste", function(){
        // console.log("text area has changed 2", $(this).val(), $(this).prop("id"), window.location.href.at(-1));
        // console.log("going to set", $(this).prop("id") + "_ex" + window.location.href.at(-1), "to", $(this).val());
        localStorage.setItem($(this).prop("id") + "_ex" + window.location.href.at(-1), $(this).val());
    });
});

function getPrevNotes() {
    var prev_notes = "<ul style='position: fixed; left: 100px;'>";
    var prev_ex = parseInt(window.location.href.at(-1)) - 1;
    if (prev_ex > -1) {
        for (var i = 0; i < localStorage.length; i++){
            var k = localStorage.key(i);
            if (k.includes("_ex" + prev_ex)) {
                console.log("prev ex notes: ", localStorage.getItem(k));
                prev_notes += "<li style='text-align:left; margin:20px;'>" + k + ": " + localStorage.getItem(k) + " <br></li>";
            }
        }
    }
    prev_notes += "</ul>";
    return prev_notes;
}

export default class ExerciseAGV extends React.Component {

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
        
                    for (var y = -1; y <= +1; y++) {
                        for (var x = -1; x <= +1; x++) {
                            var name = tile_name(centre[0] + x, centre[1] + y);
                            var tile = $map.find(".tile" + name);
                            if (tile.length) {
                                $remove = $remove.not(tile);
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
        
        return (
            <div className="App">
                <div id="app-title">Scaffolded Exercises</div>
                <br/><br/><br/>
                DOM
                <div id="comic"><div className="map"><div className="ground"></div></div></div>
                <br/>
                <p id="prev_notes"></p>
                <div className="exercises">
                    Variables:
                    <br/><br/>
                    <div className="reflection-area">
                        <p>As you interact with the screen, what is happening visually?</p>
                        <textarea id="visualreflect" className="reflection-textarea" rows="6"></textarea>
                    </div>
                    <a href='/exercise-auto0'>Next Exercise</a>
                </div>
            </div>
        )
    }
}
    