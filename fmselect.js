/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
	$.fn.fmSelect = function (options) {
		var widgetCount = 1;
		var settings = $.extend({
			// Default Values
			title: "Select Values"
		}, options);
		return this.each(function () {
			var count = 0;
			var widgetId = "";
			if ($(this).prop("id") != "") {
				widgetId = $(this).prop("id");
			} else {
				widgetId = "fmselect-" + widgetCount;
			}
			var widgetName = $(this).prop("name") + "[]";
			if ($(this).data("title") !== undefined) {
				settings.title = $(this).data("title");
			}
			var html = '<div class="fmselect" id="' + widgetId + '"><div class="fmselect-head"><a href="#" class="fmselect-all">All</a><div class="fmselect-head-text">' + settings.title + '</div><a href="#" class="fmselect-clear">Clear</a></div><div class="fmselect-search-container"><input type="text" class="fmselect-search" autocomplete="off" /></div><div class="fmselect-list"><ul>';
			$(this).children("option").each(function () {
				++count;
				html += "<li><input type='checkbox' name='" + widgetName + "' id='fmselect-val-" + widgetId + "-" + count + "' value='" + $(this).val() + "' data-text='" + $(this).text() + "'/> <label for='fmselect-val-" + widgetId + "-" + count + "'>" + $(this).text() + "</label></li>";

			});
			html += '</ul></div><div class="fmselect-selected">Selected (<span class="fmselect-count">0</span>): <span class="fmselect-selected-text"></span></div>';
			$(this).replaceWith(html);
			attachEvents(widgetId);
			++widgetCount;
		});
	};

	function attachEvents(ID) {
		$("#" + ID).on("change", ".fmselect-list ul li input", function () {
			updateSelected(ID)
		});
		$("#" + ID).on("click", ".fmselect-all", function (e) {
			e.preventDefault();
			$("#" + ID + " .fmselect-list ul li input").prop("checked", true);
			updateSelected(ID);
		});
		$("#" + ID).on("click", ".fmselect-clear", function (e) {
			e.preventDefault();
			$("#" + ID + " .fmselect-list ul li input").prop("checked", false);
			updateSelected(ID);
		});
		$("#" + ID).on("keyup", "input.fmselect-search", function (e) {
			performSearch(ID, $(this).val());
		});
	}

	function updateSelected(ID) {
		var count = 0;
		var selected = "";
		$("#" + ID + " .fmselect-list li > input:checked").each(function () {
			++count;
			$(this).parent().addClass("selected");
			selected += $(this).data("text") + ", ";
		});
		$("#" + ID + " .fmselect-list li > input:not(:checked)").parent().removeClass("selected");
		$("#" + ID + " .fmselect-count").html(count);
		$("#" + ID + " .fmselect-selected-text").html(selected);
	}

	function performSearch(ID, term) {
		if (term !== "") {
			$("#" + ID + " li label").filter(function () {
				return quickCompare($(this).text(), term) < 0;
			}).parent().hide();
			$("#" + ID + " li label").filter(function () {
				return quickCompare($(this).text(), term) >= 0;
			}).parent().show();
		} else {
			$("#" + ID + " li label").parent().show();
		}
	}

	function quickCompare(haystack, needle) {
		return haystack.toLowerCase().indexOf(needle.toLowerCase());
	}

}(jQuery));
