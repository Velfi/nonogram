// State stuff
var puzzle = [
  "XXXXXXXXXXXX",
  "XXXOOOOOOXXX",
  "XXOXXXXXXOXX",
  "XOXXOXXOXXOX",
  "XOXXOXXOXXOO",
  "XOXXXXXXXXOO",
  "XOXOXXXXOXOO",
  "XOXOXXXXOXOO",
  "XOXXOOOOXXOO",
  "XXOXXXXXXOOX",
  "XXXOOOOOOOXX",
  "XXXXXXXXXXXX"
];
var easy_puzzle = ["XOOXX", "OXXOX", "OXXOX", "OXXOX", "XOOXO"];
var grid_marker = "full";

// Functions
function makePuzzle() {
  $('.puzzle').html('');
  for (var i = 0; i < puzzle.length; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    row.id = "row" + (i).toString();
    // row.id = 'row'+
    for (var j = 0; j < puzzle[i].length; j++) {
      var cell = document.createElement('div');
      cell.className = 'cell no-mark';
      $(cell).text(" ");
      cell.id = 'c' + (i).toString() + "-" + (j).toString();
      $(row).append(cell);
    }
    $('.puzzle').append(row);
  }
  hints.row();
  hints.column();
}

var hints = {
  "regex": /(O+)/g,
  "column": function() {
    for (var i = 0; i < puzzle.length; i++) {
      var hint_numbers = document.createElement('div');
      hint_numbers.className = 'hint-numbers';
      hintsmatcher = puzzle[i].match(hints.regex);
      for (var j = 0; j < hintsmatcher.length; j++) {
        var hint_number = document.createElement('p');
        hint_number.className = 'hint-number';
        $(hint_number).text((hintsmatcher[j].length));
        $(hint_numbers).append($(hint_number));
      }
      $('.hint-column').append($(hint_numbers));
    }
  },
  "row": function() {
    var rejiggered_array = hints.rowHelper();
    console.log(rejiggered_array.length);
    for (var i = 0; i < rejiggered_array.length; i++) {
      var hint_numbers = document.createElement('div');
      hint_numbers.className = 'hint-numbers';
      hintsmatcher = rejiggered_array[i].match(hints.regex);
      for (var j = 0; j < hintsmatcher.length; j++) {
        var hint_number = document.createElement('p');
        hint_number.className = 'hint-number';
        $(hint_number).text((hintsmatcher[j].length));
        $(hint_numbers).append($(hint_number));
      }
      $('.hint-row').append($(hint_numbers));
    }
  },
  "rowHelper": function() {
    var row_array = [];
    for (var i = 0; i < puzzle.length; i++) {
      for (var j = 0; j < puzzle[i].length; j++) {
        if (row_array[j] === undefined) {
          row_array[j] = puzzle[i].charAt(j);
        } else {
          row_array[j] += puzzle[i].charAt(j);
        }
      }
    }
    return row_array;
  }
};

$(".mark").click(function() {
  switch (event.target.id) {
    case "mark-full":
      grid_marker = "full";
      break;
    case "mark-x":
      grid_marker = "x";
      break;
    case "mark-erase":
      grid_marker = "erase";
      break;
    default:
      break;
  }
});

$(".puzzle").click(function(event) {
  if (event.target.className.split(" ")[0] !== "puzzle") {
    switch (grid_marker) {
      case "full":
        $(event.target).html("<p>&#11035;</p>");
        $(event.target).addClass("full-mark");
        $(event.target).removeClass("x-mark");
        $(event.target).removeClass("no-mark");
        break;
      case "x":
        $(event.target).html("<p style='color: red'>&#128473;</p>");
        $(event.target).removeClass("full-mark");
        $(event.target).addClass("x-mark");
        $(event.target).removeClass("no-mark");
        break;
      case "erase":
        $(event.target).text(" ");
        $(event.target).removeClass("full-mark");
        $(event.target).removeClass("x-mark");
        $(event.target).addClass("no-mark");
        break;
      default:
        break;
    }
  } else {
    console.log("You clicked on something that wasn't a cell.");
  }
});

$("#is-solved").click(function() {
  var solution = [];
  for (var i = 0; i < puzzle.length; i++) {
    var row_contents = "";
    for (var j = 0; j < puzzle[i].length; j++) {
      row_contents += $('#c' + i + '-' + j).text();
      row_contents = row_contents.replace(/\s|\uD83D/g, "X");
      row_contents = row_contents.replace(/\u2B1B/g, "O");
    }
    solution.push(row_contents);
  }
  if (solution.toString() == puzzle.toString()) {
    alert("Good job. You figured it out.");
  } else {
    alert("You haven't gotten it quite right yet. Just keep on trying.");
  }
});

QUnit.test("a basic test example", function(assert) {
  var value = "hello";
  assert.equal(value, "hello", "We expect value to be hello");
});

makePuzzle();
