/*!
 * 
 *  dialog package version 1.0.13
 *  (c) 2020 Ananda Masri
 *  Released under the MIT license
 *  auroraweb.ca/giving-back/dialog
 *  
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"open",(function(){return open})),__webpack_require__.d(__webpack_exports__,"closeAll",(function(){return closeAll})),__webpack_require__.d(__webpack_exports__,"closeLast",(function(){return closeLast})),__webpack_require__.d(__webpack_exports__,"close",(function(){return close}));var _dialog_styl__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),_dialog_styl__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_dialog_styl__WEBPACK_IMPORTED_MODULE_0__),_close_icon_svg__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(3),_close_icon_svg__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_close_icon_svg__WEBPACK_IMPORTED_MODULE_1__),_fullscreen_icon_svg__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(4),_fullscreen_icon_svg__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_fullscreen_icon_svg__WEBPACK_IMPORTED_MODULE_2__);const busy={start:()=>{},stop:()=>{}},debug=!1;let loadUrlBusy,dialogCount=0,$body,$window;async function open(e){e=e||{},debug&&console.debug("dialog.open invoked with options",e),void 0===window.jQuery&&(window.jQuery=await __webpack_require__.e(4).then(__webpack_require__.t.bind(null,5,7)),window.jQuery=window.jQuery.default),debug&&console.debug("jQuery loaded",typeof window.jQuery),void 0===window.anime&&(window.anime=await __webpack_require__.e(3).then(__webpack_require__.bind(null,6)),window.anime=window.anime.default),debug&&console.debug("animejs loaded",typeof window.anime);const o=await __webpack_require__.e(1).then(__webpack_require__.bind(null,7));debug&&console.debug("dom-utils loaded",typeof o),$body=$body||o.$cache().$body,$window=$window||o.$cache().$window,e.title||e.source||(e.title="Dialog Cheat Sheet",e.source=usageInstructions);let t,n="dialog-"+ ++dialogCount,l=e.title||"";const a="string"==typeof e.source&&(/^https?:\/\/[a-z]+/.test(e.source)||/^\/[a-z]+/.test(e.source));let c=e.iframe&&a||!1;if(c&&(t=`<iframe src="${e.source}"></iframe>`),!a){debug&&console.debug("not url");try{const o=document.querySelector(e.source);debug&&console.debug("source is an element"),o&&(t=o.innerHTML,l=l||elementTitle(o)||""),debug&&console.debug(`dialog title:${l} \n\n body:${t}`)}catch(o){debug&&console.debug(`source "${e.source}" is not a selector`)}t=t||e.source||""}e.replace=void 0===e.replace||!!e.replace,e.replace&&closeAll();const s=e.modal?`<div class="dialog-modal" data-for="${n}"></div>`:"",i=c?`data-url="${e.source}"`:"",d=`data-created="${Date.now()}"`,r=c?`<span class="icon-fullscreen" title="Fullscreen">${_fullscreen_icon_svg__WEBPACK_IMPORTED_MODULE_2___default.a}</span>`:"";let u=[];c&&u.push("has-iframe"),l||u.push("chromeless"),e.persistent&&u.push("persistent"),e.classes&&"string"==typeof e.classes&&u.push(e.classes);let _=jQuery(`${s}\n                            <div id="${n}" class="dialog-box ${u.join(" ")}" ${d} ${i}>\n                                <div class="dialog-header">\n                                    <div class="title">${l}</div>\n                                    <div class="icons">\n                                        ${r}\n                                        <span class="icon-close" title="Close">${_close_icon_svg__WEBPACK_IMPORTED_MODULE_1___default.a}</span>\n                                    </div>\n                                </div>\n                                \n                                <div class="dialog-body">\n                                    ${t||"Loading..."}\n                                </div>\n                            </div>`);_.appendTo($body),e.modal&&(_=$body.find("#"+n)),debug&&console.debug(`dialog ${n} appended to body`,_.length);const g=o.onTopZIndex();g&&_.css("z-index",g),initDialogListeners(),e.onClose&&bindCloseCallback(_,e.onClose);let b=openAnimateDialog(_);if(a&&!c){if(loadUrlBusy)throw"dialog cancelled because another dialog is busy loading";loadUrlBusy=window.setTimeout((function(){loadUrlBusy=!1}),5e3),busy.start("dialog.open "+n);try{t=await jQuery.get(e.source),t=e.fragment?jQuery(t).find(e.fragment).html():t,t.includes("<head")&&(t=`<iframe src="${e.source}"></iframe>`,_.addClass("has-iframe"),console.warn('package @aamasri/dialog recommends using the "iframe" or "fragment" options when the loading a full HTML document!'))}catch(o){t=o.responseText?o.responseText:o.statusText?`Loading url ${e.source} failed with "${o.statusText}"`:"Loading url ${options.source} failed!"}busy.stop("dialog.open "+n),loadUrlBusy=!1,_.find(".dialog-body").html(t),debug&&console.debug("replace content:",_.find(".dialog-body").html()),b.pause(),b=openAnimateDialog(_)}return await b.finished,_[0]}function openAnimateDialog(e){debug&&console.debug("openAnimateDialog ",e[0].id);const o=e.width(),t=e.height()*o,n=$window.width(),l=$window.height()*n,a=t/l>.3;a&&e.addClass("large"),debug&&console.debug("area",t/l);const c=document.querySelector(`#${e[0].id} .dialog-body input`);c&&(c.focus(),c.select());const s=o/n>.8,i=s||a?"cubicBezier(0.190, 1.000, 0.400, 1.000)":"easeOutElastic(1, 0.6)";debug&&console.debug("wide "+s,o/n);const d={targets:e[0],translateX:["-50%","-50%"],translateY:["-50%","-50%"],scale:[0,1],duration:500,easing:i};return anime(d)}function executeCallback(callback){switch(typeof callback){case"function":return void callback();case"string":try{eval(callback)}catch(e){console.error("close callback failed with",error)}}}function closeAll(){const e=getAllDialogs(),o=getAllModals();e.length&&e.forEach(e=>{e.remove()}),o.length&&o.forEach(e=>{e.remove()})}function closeLast(){const e=getAllDialogs();if(e.length){const o=e[e.length-1];o.classList.contains("persistent")||close(o)}}function close(e){const o=jQuery(e).closest(".dialog-box");if(!o.length)return;e=o[0],debug&&console.debug("  closing dialog",e.id);const t=e.getAttribute("data-created");if(Date.now()-t<1e3)return void(debug&&console.debug("    cancelled because it's less than a second old"));debug&&console.debug(`    dialog is ${Date.now()-t} mS old`);const n=getRelatedModal(e);anime({targets:e,translateX:[{value:["-50%","-50%"]}],translateY:[{value:["-50%","-50%"]}],scale:[{value:[1,0]}],opacity:[{value:[1,0]}],duration:300,easing:"linear"}).finished.then(()=>{e.remove(),n&&n.remove()})}function getAllDialogs(){return document.querySelectorAll(".dialog-box")}function getAllModals(){return document.querySelectorAll(".dialog-modal")}function getRelatedModal(e){return document.querySelector(`.dialog-modal[data-for="${e.id}"]`)}function getRelatedDialog(e){const o=e.getAttribute("data-for");return document.getElementById(o)}let blurHandlerBound=!1;function initDialogListeners(){blurHandlerBound||(blurHandlerBound=!0,jQuery(document).on("click",e=>{const o=jQuery(e.target);debug&&console.debug(`clicked on ${o[0].nodeName} "${o.text().substring(0,10)}.."`);const t=o.closest(".dialog-box");if(t.length){debug&&console.debug("  clicked on dialog",t[0].id);const e=t[0].getAttribute("data-created");if(getAllDialogs().forEach(o=>{o.getAttribute("data-created")>e&&close(o)}),o.closest(".icon-close").length&&(debug&&console.debug("  clicked on dialog close button"),close(t)),o.closest(".icon-fullscreen").length){const e=t.data("url");debug&&console.debug("  clicked on dialog fullscreen button",e),window.open(e,"_self")}return}const n=o.closest(".dialog-modal");if(n.length){const e=getRelatedDialog(n[0]);debug&&console.debug("  clicked on modal for dialog",e.id);const o=e.getAttribute("data-created");getAllDialogs().forEach(e=>{e.getAttribute("data-created")>=o&&(e.classList.contains("persistent")||close(e))})}else closeLast()}).on("keydown",e=>{debug&&console.debug("key pressed",e.key),"Escape"===e.key&&(document.activeElement&&"BODY"!==document.activeElement.nodeName?(debug&&console.debug("blurring",document.activeElement.nodeName),document.activeElement.blur()):closeLast())}))}function bindCloseCallback(e,o){new MutationObserver(t=>{t.forEach(t=>{t.removedNodes.forEach(t=>{e.is(jQuery(t))&&(debug&&console.debug("dialog removed:",t),executeCallback(o))})})}).observe(document.querySelector("body"),{childList:!0})}function elementTitle(e){return e instanceof jQuery?e[0].title||e.data("title")||"":e.title||jQuery(e).data("title")||""}const usageInstructions='Usage instructions for developers: \n<pre style="color:#888; font-size: 12px;">\noptions object {\n    title:      string              dialog title or source element title attribute\n    source:     string | object     the content source: html content, selector, url, or element\n    fragment:   selector            selector by which to isolate a portion of the source HTML\n    modal:      boolean             page background dimming\n    iframe:     boolean             if the source is a url, whether to load it in an iFrame\n    replace:    boolean             whether to close any existing dialogs or layer up\n    persistent: boolean             whether ESC/blur automatically closes the dialog\n    onClose:    function | string   callback function or eval(string) to execute after dialog dismissed\n    classes:    string              classes to apply to the dialog container element\n}\n</pre>\n\n<pre style="color: royalblue;  font-size: 12px;">\ndialog.open(options).then(function() {\n    console.log(\'dialog launched\');\n});\n</pre>'},function(e,o,t){},function(e,o){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="28 28 116 116"><path d="M35.76335,28.59668c-2.91628,0.00077 -5.54133,1.76841 -6.63871,4.47035c-1.09737,2.70194 -0.44825,5.79937 1.64164,7.83336l45.09961,45.09961l-45.09961,45.09961c-1.8722,1.79752 -2.62637,4.46674 -1.97164,6.97823c0.65473,2.51149 2.61604,4.4728 5.12753,5.12753c2.51149,0.65473 5.18071,-0.09944 6.97823,-1.97165l45.09961,-45.09961l45.09961,45.09961c1.79752,1.87223 4.46675,2.62641 6.97825,1.97168c2.5115,-0.65472 4.47282,-2.61605 5.12755,-5.12755c0.65472,-2.5115 -0.09946,-5.18073 -1.97168,-6.97825l-45.09961,-45.09961l45.09961,-45.09961c2.11962,-2.06035 2.75694,-5.21064 1.60486,-7.93287c-1.15207,-2.72224 -3.85719,-4.45797 -6.81189,-4.37084c-1.86189,0.05548 -3.62905,0.83363 -4.92708,2.1696l-45.09961,45.09961l-45.09961,-45.09961c-1.34928,-1.38698 -3.20203,-2.16948 -5.13704,-2.1696z"></path></svg>'},function(e,o){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="21 21 130 130"><path d="M35.83333,21.5c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v21.5c-0.03655,2.58456 1.32136,4.98858 3.55376,6.29153c2.2324,1.30295 4.99342,1.30295 7.22582,0c2.2324,-1.30295 3.59031,-3.70697 3.55376,-6.29153v-21.5h21.5c2.58456,0.03655 4.98858,-1.32136 6.29153,-3.55376c1.30295,-2.2324 1.30295,-4.99342 0,-7.22582c-1.30295,-2.2324 -3.70697,-3.59031 -6.29153,-3.55376zM114.66667,21.5c-2.58456,-0.03655 -4.98858,1.32136 -6.29153,3.55376c-1.30295,2.2324 -1.30295,4.99342 0,7.22582c1.30295,2.2324 3.70697,3.59031 6.29153,3.55376h21.5v21.5c-0.03655,2.58456 1.32136,4.98858 3.55376,6.29153c2.2324,1.30295 4.99342,1.30295 7.22582,0c2.2324,-1.30295 3.59031,-3.70697 3.55376,-6.29153v-21.5c0,-7.83362 -6.49972,-14.33333 -14.33333,-14.33333zM28.55469,107.40202c-3.95253,0.06178 -7.10882,3.312 -7.05469,7.26465v21.5c0,7.83362 6.49972,14.33333 14.33333,14.33333h21.5c2.58456,0.03655 4.98858,-1.32136 6.29153,-3.55376c1.30295,-2.2324 1.30295,-4.99342 0,-7.22582c-1.30295,-2.2324 -3.70697,-3.59031 -6.29153,-3.55376h-21.5v-21.5c0.02653,-1.93715 -0.73227,-3.80254 -2.10349,-5.17112c-1.37122,-1.36858 -3.23806,-2.12378 -5.17516,-2.09353zM143.22135,107.40202c-3.95253,0.06178 -7.10882,3.312 -7.05469,7.26465v21.5h-21.5c-2.58456,-0.03655 -4.98858,1.32136 -6.29153,3.55376c-1.30295,2.2324 -1.30295,4.99342 0,7.22582c1.30295,2.2324 3.70697,3.59031 6.29153,3.55376h21.5c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-21.5c0.02653,-1.93715 -0.73227,-3.80254 -2.10349,-5.17112c-1.37122,-1.36858 -3.23806,-2.12378 -5.17516,-2.09353z"></path></svg>'}]]);