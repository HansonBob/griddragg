var clickdummy = {
  "defaultclasses" : {
    "xs" : {
      "size": 12,
      "type": "xs"
    },
    /*"sm" : {
      "size": 4,
      "type": "sm"
    },*/
    "md" : {
      "size": 4,
      "type": "md"
    },
    /*"lg" : {
      "size": 4,
      "type": "lg"
    },*/
  },
  "defaultdevice" : "md",
  "defaultcolumns" : 12,
  "placed" : {

  }
};

$(function(){
  var $dummy_con = $(".d_container");
  var $dummy_area = $(".d_area");
  var $dummy_menu = $(".d_menu");
  var device = "xs";

  device = check_device($dummy_con);


  // check for container, if empty create one
  if ($dummy_area.children(".container").size()===0) {
    var $container = $('<div class="container"></div>');

    $dummy_area.append($container);
  }

  if ($container.children(".row").size()===0) {
    create_row($container, true);
  }

  
  $(".d_entry").draggable({
    helper: 'clone',
  });

  
  make_dropable_sortable( $(".d_area > .container > .row > [class*='col-']") );



  function check_device(container) {
    var device = "";

    if (typeof $("> .visible-xs:visible", container)[0]!=="undefined") {
      device = "xs";
    }

    if (typeof $("> .visible-sm:visible", container)[0]!=="undefined") {
      device = "sm";
    }

    if (typeof $("> .visible-md:visible", container)[0]!=="undefined") {
      device = "md";
    }

    if (typeof $("> .visible-lg:visible", container)[0]!=="undefined") {
      device = "lg";
    }

    return device;
  }


  function make_dropable_sortable($element, callback) {
    $element.droppable({
      "containment": 'html',
      "drop": function(event, ui) {

        var $this = $(this);

        if ($(ui.helper).hasClass('ui-draggable')) {
          var new_bootstrap_element = $('<div></div>');
          var new_dragg_bar = $('<div class="draggbar"><a class="dragg">dragg</a><a class="decrease">-</a><a class="increase">+</a><a class="remove">x</a></div>');
          var new_element_holder = $('<div class="element-holder"></div>');

          new_bootstrap_element.addClass("d_entry_placed")
            .appendTo($this);

          // set default col classes
          //set_col_classes_default($this);

          var new_content = $(ui.helper).clone(true);

          new_content.removeClass("d_entry")
            .removeClass("ui-draggable ui-draggable-dragging ui-draggable-handle")
            .removeAttr("style");

          new_bootstrap_element.append(new_dragg_bar);
          new_bootstrap_element.append(new_element_holder);
          new_element_holder.append(new_content);
          set_draggbar_events($this);
        }

        // create new row as soon as the first is filled
        create_row($this, false);

        if (typeof callback!=="undefined") {
          callback;
        }
      }
    });

    $element.parent(".row").sortable({
      //"connectWith": "[class*='col-']",
      "update": function(event, ui) {
        //var check_cols = check_columns($element);

        // set default col classes
        //set_col_classes_default($element);

        if ($(ui.item).hasClass("ui-sortable-handle")) {
          $(ui.item).removeAttr("style");
        }
      }
    });
  }


  /*function check_columns($row) {
    var colsize = 12;
    var cols = 0;

    if (typeof clickdummy!=="undefined"
      && typeof clickdummy.defaultcolumns!=="undefined"
    ) {
      colsize = clickdummy.defaultcolumns;
    }

    $row.children().each(function(){
      var $this = $(this);
      cols = cols + parseInt($this.attr("data-col-"+clickdummy.defaultdevice));
    });

    if (cols >= colsize) {
      return false;
    }

    if (colsize > cols) {
      return (colsize-cols);
    }
  }*/


  function set_draggbar_events($element) {
    $(".decrease:not(.event-added)", $element).on("click", function(){
      var $this = $(this);
      $this.closest("col");

      $this.addClass("event-added");
    });

    $(".increase:not(.event-added)", $element).on("click", function(){
      var $this = $(this);
      $this.addClass("event-added");
    });

    $(".remove:not(.event-added)", $element).on("click", function(){
      var $this = $(this);
      $this.closest(".d_entry_placed").remove();
      $this.addClass("event-added");
    });
  }


  function create_row($element, isFirst) {
    if (isFirst===true || typeof $element.parent(".row").next(".row")[0]==="undefined") {
      var $new_row = $('<div class="row"></div>');
      if (isFirst===true) {
        $element.append($new_row);
      } else {
        $element.closest(".container").append($new_row);
      }

      for (var i=0; i<clickdummy.defaultcolumns; i++) {
        var $new_col = $("<div></div>");
        var col_classes = "col ";

        for (var k in clickdummy.defaultclasses) {
          col_classes += "col-"+k+"-1 ";
        }

        $new_col.addClass(col_classes);
        $new_row.append($new_col);
      }

      make_dropable_sortable($("[class*='col-']", $new_row));
    }
  }


  function set_col_classes_default($element) {
    var new_default_col_classes = "";
    var $current_row = $($element).parent(".row");

    for (var i in clickdummy.defaultclasses) {
      $element.removeClass("col-"+i+"-1");
      $element.addClass("col-"+i+"-"+clickdummy.defaultclasses[i].size);
    }
  }
});
