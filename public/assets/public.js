!function(e,t){var n=function(){var t=e(document).data("events");return t&&t.click&&e.grep(t.click,function(e){return"rails"===e.namespace}).length};n()&&e.error("jquery-ujs has already been loaded!");var r;e.rails=r={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",disableSelector:"input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input:file",linkDisableSelector:"a[data-disable-with]",CSRFProtection:function(t){var n=e('meta[name="csrf-token"]').attr("content");n&&t.setRequestHeader("X-CSRF-Token",n)},fire:function(t,n,r){var a=e.Event(n);return t.trigger(a,r),a.result!==!1},confirm:function(e){return confirm(e)},ajax:function(t){return e.ajax(t)},href:function(e){return e.attr("href")},handleRemote:function(n){var a,i,o,s,l,c,u,d;if(r.fire(n,"ajax:before")){if(s=n.data("cross-domain"),l=s===t?null:s,c=n.data("with-credentials")||null,u=n.data("type")||e.ajaxSettings&&e.ajaxSettings.dataType,n.is("form")){a=n.attr("method"),i=n.attr("action"),o=n.serializeArray();var f=n.data("ujs:submit-button");f&&(o.push(f),n.data("ujs:submit-button",null))}else n.is(r.inputChangeSelector)?(a=n.data("method"),i=n.data("url"),o=n.serialize(),n.data("params")&&(o=o+"&"+n.data("params"))):(a=n.data("method"),i=r.href(n),o=n.data("params")||null);d={type:a||"GET",data:o,dataType:u,beforeSend:function(e,a){return a.dataType===t&&e.setRequestHeader("accept","*/*;q=0.5, "+a.accepts.script),r.fire(n,"ajax:beforeSend",[e,a])},success:function(e,t,r){n.trigger("ajax:success",[e,t,r])},complete:function(e,t){n.trigger("ajax:complete",[e,t])},error:function(e,t,r){n.trigger("ajax:error",[e,t,r])},xhrFields:{withCredentials:c},crossDomain:l},i&&(d.url=i);var p=r.ajax(d);return n.trigger("ajax:send",p),p}return!1},handleMethod:function(n){var a=r.href(n),i=n.data("method"),o=n.attr("target"),s=e("meta[name=csrf-token]").attr("content"),l=e("meta[name=csrf-param]").attr("content"),c=e('<form method="post" action="'+a+'"></form>'),u='<input name="_method" value="'+i+'" type="hidden" />';l!==t&&s!==t&&(u+='<input name="'+l+'" value="'+s+'" type="hidden" />'),o&&c.attr("target",o),c.hide().append(u).appendTo("body"),c.submit()},disableFormElements:function(t){t.find(r.disableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with",t[n]()),t[n](t.data("disable-with")),t.prop("disabled",!0)})},enableFormElements:function(t){t.find(r.enableSelector).each(function(){var t=e(this),n=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[n](t.data("ujs:enable-with")),t.prop("disabled",!1)})},allowAction:function(e){var t,n=e.data("confirm"),a=!1;return n?(r.fire(e,"confirm")&&(a=r.confirm(n),t=r.fire(e,"confirm:complete",[a])),a&&t):!0},blankInputs:function(t,n,r){var a,i,o=e(),s=n||"input,textarea";return t.find(s).each(function(){a=e(this),i=a.is(":checkbox,:radio")?a.is(":checked"):a.val(),i==!!r&&(o=o.add(a))}),o.length?o:!1},nonBlankInputs:function(e,t){return r.blankInputs(e,t,!0)},stopEverything:function(t){return e(t.target).trigger("ujs:everythingStopped"),t.stopImmediatePropagation(),!1},callFormSubmitBindings:function(n,r){var a=n.data("events"),i=!0;return a!==t&&a.submit!==t&&e.each(a.submit,function(e,t){return"function"==typeof t.handler?i=t.handler(r):void 0}),i},disableElement:function(e){e.data("ujs:enable-with",e.html()),e.html(e.data("disable-with")),e.bind("click.railsDisable",function(e){return r.stopEverything(e)})},enableElement:function(e){e.data("ujs:enable-with")!==t&&(e.html(e.data("ujs:enable-with")),e.data("ujs:enable-with",!1)),e.unbind("click.railsDisable")}},r.fire(e(document),"rails:attachBindings")&&(e.ajaxPrefilter(function(e,t,n){e.crossDomain||r.CSRFProtection(n)}),e(document).delegate(r.linkDisableSelector,"ajax:complete",function(){r.enableElement(e(this))}),e(document).delegate(r.linkClickSelector,"click.rails",function(n){var a=e(this),i=a.data("method"),o=a.data("params");return r.allowAction(a)?(a.is(r.linkDisableSelector)&&r.disableElement(a),a.data("remote")!==t?!n.metaKey&&!n.ctrlKey||i&&"GET"!==i||o?(r.handleRemote(a)===!1&&r.enableElement(a),!1):!0:a.data("method")?(r.handleMethod(a),!1):void 0):r.stopEverything(n)}),e(document).delegate(r.inputChangeSelector,"change.rails",function(t){var n=e(this);return r.allowAction(n)?(r.handleRemote(n),!1):r.stopEverything(t)}),e(document).delegate(r.formSubmitSelector,"submit.rails",function(n){var a=e(this),i=a.data("remote")!==t,o=r.blankInputs(a,r.requiredInputSelector),s=r.nonBlankInputs(a,r.fileInputSelector);return r.allowAction(a)?o&&a.attr("novalidate")==t&&r.fire(a,"ajax:aborted:required",[o])?r.stopEverything(n):i?s?(setTimeout(function(){r.disableFormElements(a)},13),r.fire(a,"ajax:aborted:file",[s])):!e.support.submitBubbles&&e().jquery<"1.7"&&r.callFormSubmitBindings(a,n)===!1?r.stopEverything(n):(r.handleRemote(a),!1):(setTimeout(function(){r.disableFormElements(a)},13),void 0):r.stopEverything(n)}),e(document).delegate(r.formInputClickSelector,"click.rails",function(t){var n=e(this);if(!r.allowAction(n))return r.stopEverything(t);var a=n.attr("name"),i=a?{name:a,value:n.val()}:null;n.closest("form").data("ujs:submit-button",i)}),e(document).delegate(r.formSubmitSelector,"ajax:beforeSend.rails",function(t){this==t.target&&r.disableFormElements(e(this))}),e(document).delegate(r.formSubmitSelector,"ajax:complete.rails",function(t){this==t.target&&r.enableFormElements(e(this))}),e(function(){csrf_token=e("meta[name=csrf-token]").attr("content"),csrf_param=e("meta[name=csrf-param]").attr("content"),e('form input[name="'+csrf_param+'"]').val(csrf_token)}))}(jQuery),jQuery(document).ready(function(){jQuery("input").bind("input propertychange",function(){if(jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),"email"==jQuery(this).attr("id")){var e=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):e.test(jQuery(this).val())?(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow")):(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow"))}else""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("textarea").bind("input propertychange",function(){jQuery(this).parent().find(".error").remove(),jQuery(this).parent().find(".valid").remove(),""==jQuery(this).val()||" "==jQuery(this).val()?(jQuery(this).after("<span class='error'></span>"),jQuery(this).parent().find(".error").fadeIn("slow")):(jQuery(this).after("<span class='valid'></span>"),jQuery(this).parent().find(".valid").fadeIn("slow"))}),jQuery("#contact-form").on("ajax:beforeSend",function(){jQuery("span.error").fadeOut("slow"),jQuery("span.valid").fadeOut("slow"),jQuery("#thanks").hide(),jQuery("#error").hide(),jQuery("#timedout").hide(),jQuery("#state").hide();var e=!1,t=jQuery("#inquiry_name").val();""==t||" "==t?(jQuery("#inquiry_name").after("<span class='error'></span>"),jQuery("#inquiry_name").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_name").after("<span class='valid'></span>"),jQuery("#inquiry_name").parent().find(".valid").fadeIn("slow"));var n=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,r=jQuery("#inquiry_email").val();""==r||" "==r?(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0):n.test(r)?(jQuery("#inquiry_email").after("<span class='valid'></span>"),jQuery("#inquiry_email").parent().find(".valid").fadeIn("slow")):(jQuery("#inquiry_email").after("<span class='error'></span>"),jQuery("#inquiry_email").parent().find(".error").fadeIn("slow"),e=!0);var a=jQuery("#inquiry_message").val();return""==a||" "==a?(jQuery("#inquiry_message").after("<span class='error'></span>"),jQuery("#inquiry_message").parent().find(".error").fadeIn("slow"),e=!0):(jQuery("#inquiry_message").after("<span class='valid'></span>"),jQuery("#inquiry_message").parent().find(".valid").fadeIn("slow")),1==e?(jQuery("#error").fadeIn("slow"),setTimeout(function(){jQuery("#error").fadeOut("slow")},3e3),!1):void 0}).on("ajax:error",function(e,t,n,r){"timeout"==r?(jQuery("#timedout").fadeIn("slow"),setTimeout(function(){jQuery("#timedout").fadeOut("slow")},3e3)):(jQuery("#state").fadeIn("slow"),jQuery("#state").html("The following error occured: "+r),setTimeout(function(){jQuery("#state").fadeOut("slow")},3e3))}).on("ajax:success",function(){jQuery("span.valid").remove(),jQuery("#thanks").fadeIn("slow"),jQuery("input").val(""),jQuery("textarea").val(""),setTimeout(function(){jQuery("#thanks").fadeOut("slow")},3e3)})}),function(e,t,n){function r(e){var t={},r=/^jQuery\d+$/;return n.each(e.attributes,function(e,n){n.specified&&!r.test(n.name)&&(t[n.name]=n.value)}),t}function a(e,r){var a=this,i=n(a);if(a.value==i.attr("placeholder")&&i.hasClass("placeholder"))if(i.data("placeholder-password")){if(i=i.hide().next().show().attr("id",i.removeAttr("id").data("placeholder-id")),e===!0)return i[0].value=r;i.focus()}else a.value="",i.removeClass("placeholder"),a==t.activeElement&&a.select()}function i(){var e,t=this,i=n(t),o=this.id;if(""==t.value){if("password"==t.type){if(!i.data("placeholder-textinput")){try{e=i.clone().attr({type:"text"})}catch(s){e=n("<input>").attr(n.extend(r(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":i,"placeholder-id":o}).bind("focus.placeholder",a),i.data({"placeholder-textinput":e,"placeholder-id":o}).before(e)}i=i.removeAttr("id").hide().prev().attr("id",o).show()}i.addClass("placeholder"),i[0].value=i.attr("placeholder")}else i.removeClass("placeholder")}var o,s,l="placeholder"in t.createElement("input"),c="placeholder"in t.createElement("textarea"),u=n.fn,d=n.valHooks,f=n.propHooks;l&&c?(s=u.placeholder=function(){return this},s.input=s.textarea=!0):(s=u.placeholder=function(){var e=this;return e.filter((l?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":a,"blur.placeholder":i}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},s.input=l,s.textarea=c,o={get:function(e){var t=n(e),r=t.data("placeholder-password");return r?r[0].value:t.data("placeholder-enabled")&&t.hasClass("placeholder")?"":e.value},set:function(e,r){var o=n(e),s=o.data("placeholder-password");return s?s[0].value=r:o.data("placeholder-enabled")?(""==r?(e.value=r,e!=t.activeElement&&i.call(e)):o.hasClass("placeholder")?a.call(e,!0,r)||(e.value=r):e.value=r,o):e.value=r}},l||(d.input=o,f.value=o),c||(d.textarea=o,f.value=o),n(function(){n(t).delegate("form","submit.placeholder",function(){var e=n(".placeholder",this).each(a);setTimeout(function(){e.each(i)},10)})}),n(e).bind("beforeunload.placeholder",function(){n(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery),window.console||(console={log:function(){}}),jQuery(function(e){"use strict";var t=window.THEME||{};t.fix=function(){if(navigator.userAgent.match(/IEMobile\/10\.0/)){var e=document.createElement("style");e.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),document.getElementsByTagName("head")[0].appendChild(e)}},t.placeholder=function(){e("input, textarea").placeholder()},t.carousel=function(){e(".carousel").each(function(){var t=e(this);t.find(".item").length>1?t.carousel({interval:3e3}):(t.find(".carousel-control").each(function(){e(this).css({display:"none"})}),t.find(".carousel-indicators").each(function(){e(this).css({display:"none"})}))})},e(document).ready(function(){t.fix(),t.placeholder(),t.carousel()})});