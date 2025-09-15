class DisplayTable {
  // {HTMLTableElement} the table element (i.e. GUI component) that this class handles
  #htmlTable;

  // {MusicInfo[]} the pieces to display in the table
  pieces;

  /* {{label: string, handle: function}[]} the buttons shown for each piece in the table
     label {string} the text on the button
     handle: called when the button is clicked; the MusicInfo object, the index, and the DisplayTable object are passed
  */
  buttons;

  updateGUI() {
    // TODO
  }
}
