var clickdummy = {
  "defaultclasses" : {
    "xs" : {
      "size": 12,
      "type": "xs"
    },
    "sm" : {
      "size": 4,
      "type": "sm"
    },
    "md" : {
      "size": 4,
      "type": "md"
    },
    "lg" : {
      "size": 4,
      "type": "lg"
    },
  },
  "defaultdevice" : "sm",
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
    $container.append($('<div class="row"></div>'));
  }

  
  $(".d_entry").draggable({
    helper: 'clone',
  });

  
  make_dropable_sortable( $(".d_area > .container > .row") );



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
        var check_cols = check_columns($element);

        if (check_cols!==false) {
          if (check_cols >= clickdummy.defaultclasses[clickdummy.defaultdevice]["size"]) {
            var new_bootstrap_class = "col-"
              + clickdummy.defaultclasses[clickdummy.defaultdevice]["type"]
              + "-" + clickdummy.defaultclasses[clickdummy.defaultdevice]["size"];

            var new_bootstrap_data = new Array(
              clickdummy.defaultclasses[clickdummy.defaultdevice]["type"],
              clickdummy.defaultclasses[clickdummy.defaultdevice]["size"]
            );
          } else {
            var new_bootstrap_class = "col-"
              + clickdummy.defaultclasses[clickdummy.defaultdevice]["type"]
              + "-" + check_cols;

            var new_bootstrap_data = new Array(
              clickdummy.defaultclasses[clickdummy.defaultdevice]["type"],
              check_cols
            );
          }

          var $this = $(this);

          if ($(ui.helper).hasClass('ui-draggable')) {
            var new_bootstrap_element = $('<div></div>');
            var new_dragg_bar = $('<div class="draggbar"><a class="dragg">dragg</a><a class="decrease">-</a><a class="increase">+</a><a class="remove">x</a></div>');
            var new_element_holder = $('<div class="element-holder"></div>');

            new_bootstrap_element.addClass("d_entry_placed")
              .addClass(new_bootstrap_class)
              .attr("data-col-"+new_bootstrap_data[0], new_bootstrap_data[1])
              .appendTo($this);

            var new_content = $(ui.helper).clone(true);

            new_content.removeClass("d_entry")
              .removeClass("ui-draggable ui-draggable-dragging ui-draggable-handle")
              .removeAttr("style");

            new_bootstrap_element.append(new_dragg_bar);
            new_bootstrap_element.append(new_element_holder);
            new_element_holder.append(new_content);
          }

          // create new row as soon as the first is filled
          if (typeof $this.next(".row")[0]==="undefined") {
            var $new_row = $('<div class="row"></div>');
            $this.parent().append($new_row);
            make_dropable_sortable($new_row);
          }

          if (typeof callback!=="undefined") {
            callback;
          }
        } else {
          // ToDo: ether make new row and drop ist there or show error
        }
      }
    }).sortable({
      "connectWith": ".row",
      "over": function(event, ui) {
        var check_cols = check_columns($element);

        if (check_cols!==false) {
        }
      }
    });
  }


  function check_columns($row) {
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
  }


  // draggbar events
  $(".decrease").on("click", function(){

  });

  $(".increase").on("click", function(){

  });

  $(".remove").on("click", function(){
    
  });
});
