var puzzle = ["XOOXX", "OXXOX", "OXXOX", "OXXOX", "XOOXO"];

function makePuzzle() {
  $('.puzzle').html('');
  for (var i = 0; i < puzzle.length; i++) {
    var row = document.createElement('div');
    row.className = 'row';
    row.id = "row" + (i).toString();
    // row.id = 'row'+
    for (var j = 0; j < puzzle[i].length; j++) {
      var cell = document.createElement('div');
      cell.className = 'empty cell';
      cell.id = "c" + (i).toString() + "-" + (j).toString();
      $(row).append(cell);
    }
    $('.puzzle').append(row);
  }
}

$("#load-puzzle").click(function() {
  makePuzzle();
});

$(".puzzle").click(function(event) {
  var content = $(event.target).text();
  switch (content) {
    case "O":
      $(event.target).text("X");
      break;
    case "X":
      $(event.target).text(" ");
      break;
    default:
      $(event.target).text("O");
      break;
  }
});

$("#is-solved").click(function() {
  var solution = [];
  for (var i = 0; i < puzzle.length; i++) {
    var row_contents = "";
    for (var j = 0; j < puzzle[i].length; j++) {
      row_contents += $('#c'+i+'-'+j).text();
    }
    solution.push(row_contents);
  }
  console.log(solution);
  if (solution === puzzle) {
    alert("Good job. You figured it out.");
  } else {
    alert("You haven't gotten it quite right yet. Just keep on trying.");
  }
});

makePuzzle();
