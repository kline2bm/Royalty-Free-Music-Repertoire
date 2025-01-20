/**
 * Used for managing HTML tables representing a list of MusicInfo objects
 * Just construct a DisplayTable object and pass in an empty HTML table element.
 */
class DisplayTable {
  // {MusicInfo[]} used for holding MusicInfo objects, e.g. for resetting the display
  storage;

  // {MusicInfo[]} the MusicInfo objects that are visually represented in the GUI (filtered/sorted)
  displayed;

  // {HTMLTableElement} the HTML table to visually represent the displayed objects (should only be mutated by this class)
  #table;

  /**
   * Construct a DisplayTable object
   * @param table {HTMLTableElement} an empty HTML table; not checked
   */
  constructor(table) {
    this.#table = DisplayTable.initTable(table);
  }

  /**
   * Initialize an empty HTML table with the properties of a MusicInfo object
   * Should be run once
   * @param table {HTMLTableElement} an empty HTML element
   * @return {HTMLTableElement} the passed-in table but now initialized
   */
  static #initTable(table) {
    // TODO
  }
}
