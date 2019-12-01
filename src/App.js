import React from 'react';
import './App.css';
import Position17 from './components/position17';
import Codeview1 from './components/codeview1';
import Codeview2 from './components/codeview2';
import $ from 'jquery';
window.$ = $;

export default class App extends React.Component {
  /*
  constructor(props) {
    super(props);
    this.state = {
      // track state
    }
    // bind functions
  }
  */

  componentDidMount() {
    function appendCode(parent, child) {
      parent.insertAdjacentElement('afterend', child);
    }

    function eventPos(e) {
      if (e.type.match(/^touch/)) {
        e = e.originalEvent.changedTouches[0];
      }
      return {
        pageX: e.pageX,
        pageY: e.pageY
      };
    }

    var Map = function ($map) {
      var $servImg = $('#server-images');
      var imageDropdown = $('#image-dropdown');
      var size = [14, 48, 25, 33];
      var tilesize = 2048;
      var scroll_delta = null;
      var serverImages = [[], [], [], [], [], [], [], [], []];

      $map.css({
        position: 'absolute'
      });

      var position = [-(size[3] + 0.03) * tilesize, -(size[0] - 0.55) * tilesize];
      $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
      $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
      var centre = [-1, 0];

      var update = function () {
        $('#position-0')[0].innerHTML = `<b>position</b> = [${position}]`; // CONSOLE HELP
        $map.css({
          left: position[0],
          top: position[1]
        });

        var centre_last = centre;
        centre = [Math.floor(-position[0] / tilesize), Math.floor(-position[1] / tilesize)];

        const tile_name = function (x, y) {
          x -= size[3];
          y -= size[0];

          return (y >= 0 ? (y + 1) + 's' : -y + 'n') + (x >= 0 ? (x + 1) + 'e' : -x + 'w');
        };

        if (centre[0] !== centre_last[0] || centre[1] !== centre_last[1]) {

          var $remove = $map.children();
          var $removeServerImgs = $servImg.children();
          var $removeImageDropdowns = imageDropdown.children().not(":first-child");

          let allNames = [];
          let ctr = 0;
          for (var y = -1; y <= +1; y++) {
            for (var x = -1; x <= +1; x++) {
              var name = tile_name(centre[0] + x, centre[1] + y);
              allNames.push(name);
              var tile = $map.find('.tile' + name);
              if (tile.length) {
                $remove = $remove.not(tile);
              } 
              else {
                let $image;
                $image = $('<img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" style="display:none" />');

                $image.on('load', function () {
                  $(this).show()
                })
                $image.on('error', function () {
                  $(this).remove();
                })
                $map.append($image);
              }
              serverImages[ctr].push(name);

/***************************************/
/***************************************/
/* BELOW: creating img elements to be added to area showing "loaded" items + information about the $image var instances to show/be inspected in the change console */
/***************************************/
/***************************************/

              // for sub-outcome 0: small image loaded without any label/decoration
              var serverImg = '<img alt="img not found"class="server-img-tile server-' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" />'

              // for sub-outcome 1: small image loaded with elem tag + class name
              var serverImgWithName = '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">&lt;img class="img-tile tile' + name + '"/&gt;</span>' + serverImg + '</div>';

              // for sub-outcome 2: small image loaded with elem tag + class name + css inline with html 
              var serverImgWithCSS = '<div class="serv-img-container"><span class="var-name var-name-txt var-name-2">style="top:' + ((centre[1] + y) * tilesize) + 'px; left:' + ((centre[0] + x) * tilesize) + 'px;"</span>' + serverImg + '</div>';

              // ALWAYS: append image (optionally labeled depending on sub-outcome) to the container
              $servImg.append(serverImgWithCSS);

              // for sub-outcome 2: create image instance dropdown menu with inspectable variable values
              var imageDropdownElem = document.createElement('p');
              imageDropdownElem.classList.add('image-dropdown-elem')
              imageDropdownElem.id = `server-${name}-code`;
              imageDropdownElem.innerHTML = `&lt;img <br>&nbsp;class="img-tile tile${name}" <br>&nbsp;src="http://imgs.xkcd.com/clickdrag/${name}.png" <br>&nbsp;style="top:<span class="var-value-code-inspect" data-clicks="0" data-val=${(centre[1] + y) * tilesize} data-centre[1]=${centre[1]} data-y=${y} data-tilesize=${tilesize}>${(centre[1] + y) * tilesize}</span>px;\n left:<span data-clicks="0" data-centre[0]=${centre[0]} data-x=${x} data-tilesize=${tilesize}>${(centre[0] + x) * tilesize}</span>px;\n z-index: -1; position: absolute;;" /&gt;`;

              /* 3 states of this:
                - rendered value
                - variable names
                - variable values
                
                keep track of which state you are in with a custom data attribute and just cycle to the next one with each click
              */
              $('.var-value-code-inspect').click((e) => {
                console.log('clicked yep')
                let customData = e.target.dataset;
                console.log('custom data', customData)
                // let state = customData.clicks;
                let state = e.target.innerHTML;

                const centre1 = customData["centre[1]"];
                const yHere = customData["y"];
                const tilesize = customData["tilesize"];

                // `<span className="tutorons-code-inspect">(${centre1} + ${y}) * ${tilesize}<span className="tutorons-text">(centre[1] + y) * tilesize</span></span>`

                if (state === customData.val) {
                  e.target.innerHTML = `(${centre1} + ${yHere}) * ${tilesize}`;
                  e.target.dataset.clicks = "1";
                  return;
                }
                else if (state === `(${centre1} + ${yHere}) * ${tilesize}`) {
                  e.target.innerHTML = `(centre[1] + y) * tilesize`;
                  e.target.dataset.clicks = "2";
                  return;
                }
                else { // state = `(centre[1] + y) * tilesize`
                  e.target.innerHTML = customData.val;
                  e.target.dataset.clicks = "0";
                  return;
                }
              })

/* 
Problem: the span onclick events ^above conflict with this event listener.              
              imageDropdownElem.addEventListener('click', (e) => {
                let elem = e.target;
                // change colors of code snippet + image display
                var instances = Array.from($(`.${e.target.id}`))
                instances.forEach((i) => {
                  console.log(i)
                  if (i.style.borderColor === 'lightgreen') {
                    i.style.border = '1px lightblue solid';
                    elem.style.backgroundColor = '#f8f8ff73';
                  } else {
                    i.style.border = '4px lightgreen solid';
                    elem.style.backgroundColor = 'lightgreen';
                  };
                })
              })

              // this should be appending a Codeview component
              // let imageCodeDisplay = document.createElement('div');
              // imageCodeDisplay.classList.add('code-editor-window');
              // imageCodeDisplay.innerHTML = '<div className="window-body">HEYYYYYY </div>' 
              // console.log(imageCodeDisplay)


              // fIX THIS TO BE ACT IMAGE CODE ONCE LOADED (bc display isn't none once it's loaded even tho it is in original code generation)
              imageDropdownElem.innerHTML = '&lt;img class="img-tile tile' + name + '" src="http://imgs.xkcd.com/clickdrag/' + name + '.png" style="top:' + ((centre[1] + y) * tilesize) + 'px;left:' + ((centre[0] + x) * tilesize) + 'px; z-index: -1; position: absolute;;" /&gt;';

              imageDropdown.append(imageDropdownElem);
              // this should be appending a Codeview component
              // imageDropdownElem.appendChild(imageCodeDisplay);

              var imageCodeDisplay = document.createElement('div');
              imageCodeDisplay.classList.add('image-dropdown-elem-code', 'code-editor-window')
              imageCodeDisplay.id = `server-${name}-code`;
              imageCodeDisplay.innerHTML = `&lt;img class="img-tile tile${name}" src="http://imgs.xkcd.com/clickdrag/${name}.png" style="top:<span data-centre=${centre} data-x=${x} data-y=${y}>${(centre[1] + y) * tilesize}</span>px; left:<span data-centre=${centre} data-x=${x} data-y=${y}>${(centre[0] + x) * tilesize}</span>px; z-index: -1; position: absolute;;" /&gt;`

              imageDropdownElem.addEventListener('click', appendCode(imageDropdownElem, imageCodeDisplay));

              ctr++
            }
            $remove.remove();
            $removeServerImgs.remove();
            $removeImageDropdowns.remove();
          }
        }
      }

      update();

      function drag(e) {
        if (scroll_delta) {
          var pos = eventPos(e);
          position[0] = Math.round(pos.pageX + scroll_delta[0])
          position[1] = Math.round(pos.pageY + scroll_delta[1])
          $('#modified-position0-code-1')[0].innerHTML = `position[0] = Math.round(${pos.pageX} + ${scroll_delta[0]})`
          $('#modified-position1-code-1')[0].innerHTML = `position[1] = Math.round(${pos.pageY} + ${scroll_delta[1]})`
          $('#map-elem-val')[0].innerText = $map[0].outerHTML.match(/.+?(?=>)/) + '>';
          $('#display-pane-map-code')[0].innerText = $map[0].outerHTML.match(/.+?(?=>)/) + '>';
          update();
        }
      }

      $(".map")
        .on('mousedown touchstart', function (e) {
          var pos = eventPos(e);
          scroll_delta = [position[0] - pos.pageX, position[1] - pos.pageY];
          $(document).on(e.type === 'mousedown' ? 'mousemove' : 'touchmove', drag);
          e.preventDefault();
        });
      $(document)
        .on('mouseup touchend', function (e) {
          $(document).off('mousemove touchmove', drag)
          scroll_delta = null;
          $('#modified-position0-code-1')[0].innerHTML = `position[0] = ${position[0]}`
          $('#modified-position1-code-1')[0].innerHTML = `position[1] = ${position[1]}`
          $('#map-elem-val')[0].innerText = $map[0].outerHTML.match(/.+?(?=>)/);
        });
    };

    $(function () {
      // eslint-disable-next-line
      var map = new Map($('.map'));
    });

    /* opens/closes the Scaffolded Exercises pane */
    $('#toggle-console').click(() => {
      let consoleDisplay = $('#change-demos-wrapper')[0].style.display;
      if (consoleDisplay === "flex") {
        consoleDisplay = "none" 
        $('#toggle-console')[0].innerText = 'Show'
      } else {
        consoleDisplay = "flex";
        $('#toggle-console')[0].innerText = 'Hide';
      }
      $('#change-demos-wrapper')[0].style.display = consoleDisplay;
    })

    /* opens/closes the "more info" modals that extend off the main console. NOTE: need to connect the chevrons and the open modals more intuitively / automatically */
    $('#position-nested-lvl-1-chevron').click(() => {
      let modalDisplay = $('#position-1')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#position-1')[0].style.display = modalDisplay;
    })

    /* Opens code related to reflection questions */
    $('#reflection-q-code-chevron').click(() => {
      let modalDisplay = $('#codeview1')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#codeview1')[0].style.display = modalDisplay;
    })

    /* Opens map div source code */
    $('#map-elem-code-chevron').click(() => {
      let modalDisplay = $('#codeview0')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#codeview0')[0].style.display = modalDisplay;
    })

    $('#image-instances-dropdown-chevron').click(() => {
      let modalDisplay = $('#image-dropdown')[0].style.display;
      (modalDisplay === "none" || modalDisplay === "") ? modalDisplay = "block" : modalDisplay = "none";
      $('#image-dropdown')[0].style.display = modalDisplay;
    })

    // $('#change-console').on('scroll', (() => {
    //   // let codeEditorWindows = Array.from($('.code-editor-window'));
    //   // codeEditorWindows.forEach((window) => {
    //   //   let currTop = window.style.top;
    //   //   window.style.top = currTop + $('#change-console').scrollTop();
    //   // })
    //   $('.code-editor-window').css('top', 0 - $('#change-console').scrollTop())
    // }))
  }
  
  displayQuestions() {
    let questions = Array.from($('.ref-question'));

    for (let q = 1; q < questions.length; q++) {
      if (questions[q].style.display === 'none' || questions[q].style.display === '') {
        questions[q].style.display = 'block';
        return;
      }
    }

    // if there are no more questions to show,
    // disable "next" button and download responses
    $('#show-reflection-question')[0].disabled = true;
    $('#save-responses')[0].style.display = 'inline';
  }

  downloadResponses() {
    const reflections = Array.from($('.reflection'));
    let data = '';

    // Get the data from each element on the form.
    reflections.forEach((r) => {
      if (r.innerHTML !== undefined) {
        data += ' \r\n ' + r.innerHTML;
      }
      if (r.value !== undefined) {
        data += ' \r\n ' + r.value;
      }
    })

    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'part1reflections.txt'; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
      newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
      newLink.href = window.URL.createObjectURL(textToBLOB);
      newLink.style.display = "none";
      document.body.appendChild(newLink);
    }

    newLink.click();
  }

  render() {
    return (
      <div className="App">
        <div id="app-title">Scaffolded Exercises <button id="toggle-console">Show</button></div>
        <div id="change-demos-wrapper">
          <div id="display-pane">
            <div className="content-descriptions">Below: Showing all elements currently loaded on page.</div>
            <div id="server-images-wrapper">
              <span id="map-div-wrapper">
                <div className="var-name-txt" id="display-pane-map-elem">
                  <span className="var-name-1">{`<div class="map">`}</span>
                  <span className="more-chevron" id="map-elem-code-chevron"><b>></b></span>
                  <div className="code-editor code-editor-window" id="codeview0">
                    <div className="window-body" id="display-pane-map-code">
                      {`<div class="map" style="position: absolute; left: -67645.4px; top: -27545.6px;">`}
                    </div>
                  </div>
                </div> 
                <div id="server-images"></div>
              </span>
            </div>
          </div>
          <div id="change-console">
            {/* Step 1 */}
            <div className="content-descriptions">Below: showing program variables and their values given current state of page.</div>
            <hr></hr>
            <p><b>Interact with screen!</b></p>
            <hr></hr>
            {/* <div className="var-defns">
              <div className="var-def">var name</div>
              <div className="var-def">var value</div>
            </div> */}
            <div className="value-def">
              <p id="position-0"></p>
              <p className="more-chevron" style={{display: 'none'}}id="position-nested-lvl-1-chevron">></p>
              <Position17 id="position-1" />
            </div>
            <div id="map-elem"><b>$map</b> = <span id="map-elem-val">{`<div class="map" style="position: absolute; left: -67645.4px; top: -27545.6px;">`}</span></div>
            <div id="image-elem">
              <p><b>$image</b> = <span id="image-elem-val">9 instances</span><span className="more-chevron" id="image-instances-dropdown-chevron"><b>></b></span></p>
              <div id="image-dropdown">
                <p><i>Click to inspect</i></p>
              </div>
            </div>
            <hr></hr>
            <div>
              <b>Reflection Questions</b>
            </div>
            <div className="reflection-questions">
              <div className="ref-question first-question">
                <div className="question-txt reflection">As you interact with the screen, what is happening visually? What is happening to the variable values shown above?</div>
                <textarea className="response-area reflection" id="p1q1"></textarea>
              </div>
              <div className="ref-question">
                <div id="code-question">
                  <span className="question-txt p1q2 reflection">What is happening in the code?</span>
                  <span className="more-chevron" id="reflection-q-code-chevron"><b>></b></span>
                  <Codeview2 id="codeview1" />
                </div>
                <textarea className="response-area p1q2 reflection"></textarea>
              </div>
              <div className="ref-question">
                <div className="question-txt reflection">What is the relationship between $map and $image?</div>
                <textarea className="response-area reflection" id="p1q3"></textarea>
              </div>
              <button id="show-reflection-question" onClick={this.displayQuestions}>Next question</button>
              <button id="save-responses" onClick={this.downloadResponses}>Save responses</button>
            </div>
            <br></br>
          </div>
        </div> {/* closes div that wraps the entire information pane */}
        <div className="map"></div>
      </div>
    )
  }
}