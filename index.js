// State stuff
var puzzle = [
  'XXXOOOOOOXXX',
  'XXOXXXXXXOXX',
  'XOXXOXXOXXOX',
  'XOXXOXXOXXOO',
  'XOXXXXXXXXOO',
  'XOXOXXXXOXOO',
  'XOXOXXXXOXOO',
  'XOXXOOOOXXOO',
  'XXOXXXXXXOOX',
  'XXXOOOOOOOXX'
]
var easyPuzzle = ['XOOXX', 'OXXOX', 'OXXOX', 'OXXOX', 'XOOXO']
var gridMarker = 'full'
// *************** ***Functions*** ***************  Test puzzle array is
// formatted correctly.
function puzzleValidityChecker (puzzle_array) {
  puzzle_array.length
  var i = 0
  while (i < puzzle_array.length) {
    if (puzzle_array[i].length !== puzzle_array.length) {
      return false
    } else {
      i++
    }
  }
  return true
}
puzzleValidityChecker(puzzle)
// Assemble the puzzle grid and append it to the puzzle div. Also call functions
// to create the hint row and hint column.
function makePuzzle (puzzle_array) {
  $('.puzzle').html('')
  for (var i = 0; i < puzzle_array.length; i++) {
    var row = document.createElement('div')
    row.className = 'row'
    row.id = 'row' + (i).toString()
    // row.id = 'row'+
    for (var j = 0; j < puzzle_array[i].length; j++) {
      var cell = document.createElement('div')
      cell.className = 'cell no-mark'
      $(cell).text(' ')
      cell.id = 'c' + (i).toString() + '-' + (j).toString()
      $(row).append(cell)
    }
    $('.puzzle').append(row)
  }
  hints.row(puzzle_array)
  hints.column(puzzle_array)
}
// Container of the logic for generating the hint numbers and placing them to
// the top and the left of the puzzle.
var hints = {
  // Use for finding groups of filled squares in a puzzle array.
  hintRegex: /(O+)/g,
  // Generate the hint column and append to hint-column div..
  column: function (puzzle_array) {
    for (var i = 0; i < puzzle_array.length; i++) {
      var hintNumbers = document.createElement('div')
      hintNumbers.className = 'hint-numbers'
      var hintColumnMatches = puzzle_array[i].match(hints.hintRegex)
      console.log(puzzle[i].match(this.hintRegex))
      if (hintColumnMatches == null) {
        var hintNumber = document.createElement('p')
        hintNumber.className = 'hint-number'
        $(hintNumber).text(' ')
        $(hintNumbers).append($(hintNumber))
      } else {
        for (var j = 0; j < hintColumnMatches.length; j++) {
          hintNumber = document.createElement('p')
          hintNumber.className = 'hint-number'
          $(hintNumber).text((hintColumnMatches[j].length))
          $(hintNumbers).append($(hintNumber))
        }
      }
      $('.hint-column').append($(hintNumbers))
    }
  },
  // Generate the hint row and append to hint-row div..
  row: function (puzzle_array) {
    var hintRowArray = this.rowHelper(puzzle_array)
    for (var i = 0; i < hintRowArray.length; i++) {
      var hintNumbers = document.createElement('div')
      hintNumbers.className = 'hint-numbers'
      var hintRowMatches = hintRowArray[i].match(this.hintRegex)
      if (hintRowMatches == null) {
        var hintNumber = document.createElement('p')
        hintNumber.className = 'hint-number'
        $(hintNumber).text(' ')
        $(hintNumbers).append($(hintNumber))
      } else {
        for (var j = 0; j < hintRowMatches.length; j++) {
          hintNumber = document.createElement('p')
          hintNumber.className = 'hint-number'
          $(hintNumber).text((hintRowMatches[j].length))
          $(hintNumbers).append($(hintNumber))
        }
      }
      $('.hint-row').append($(hintNumbers))
    }
  },
  // Convert puzzle array into array usable by the hint row generator.
  rowHelper: function (puzzle_array) {
    var rowArray = []
    for (var i = 0; i < puzzle_array.length; i++) {
      for (var j = 0; j < puzzle_array[i].length; j++) {
        if (rowArray[j] === undefined) {
          rowArray[j] = puzzle_array[i].charAt(j)
        } else {
          rowArray[j] += puzzle_array[i].charAt(j)
        }
      }
    }
    return rowArray
  }
}
// Set grid marker based on which button is pressed
$('.mark').click(function () {
  switch (event.target.id) {
    case 'mark-full':
      gridMarker = 'full'
      break
    case 'mark-x':
      gridMarker = 'x'
      break
    case 'mark-erase':
      gridMarker = 'erase'
      break
    default:
      break
  }
})
// Mark grid with appropriate symbol on click
$('.puzzle').click(function (event) {
  if (event.target.className.split(' ')[0] !== 'puzzle') {
    switch (gridMarker) {
      case 'full':
        $(event.target).html('<p>&#11035;</p>')
        $(event.target).addClass('full-mark')
        $(event.target).removeClass('x-mark')
        $(event.target).removeClass('no-mark')
        break
      case 'x':
        $(event.target).html('<p style="color: red">&#128473;</p>')
        $(event.target).removeClass('full-mark')
        $(event.target).addClass('x-mark')
        $(event.target).removeClass('no-mark')
        break
      case 'erase':
        $(event.target).text(' ')
        $(event.target).removeClass('full-mark')
        $(event.target).removeClass('x-mark')
        $(event.target).addClass('no-mark')
        break
      default:
        break
    }
  } else {
    console.log("You clicked on something that wasn't a cell.")
  }
})
// Check player solution against puzzle. If match, win, else, keep trying.
$('#is-solved').click(function () {
  var solution = []
  for (var i = 0; i < puzzle.length; i++) {
    var rowContents = ''
    for (var j = 0; j < puzzle[i].length; j++) {
      rowContents += $('#c' + i + '-' + j).text()
      rowContents = rowContents.replace(/\s|\uD83D/g, 'X')
      rowContents = rowContents.replace(/\u2B1B/g, 'O')
    }
    solution.push(rowContents)
  }
  if (solution.toString() === puzzle.toString()) {
    alert('Good job. You figured it out.')
  } else {
    alert("You haven't gotten it quite right yet. Just keep on trying.")
  }
})
makePuzzle(easyPuzzle)
