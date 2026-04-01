/**
 * Information about a piece of music
 */
class MusicInfo {
  // {string} the unprocessed string (e.g. "Accralate|IC KM APRC MRBA")
  raw;

  // {string} the title of the piece (e.g. "Accralate")
  title;

  // {string} the URL of a piece (e.g. "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Accralate.mp3")
  src;

  // {string} the website of a piece (e.g. "Incompetech")
  source;

  // {"Angry" | "Calm" | "Fearful" | "Happy" | "Neutral" | "Romantic" | "Sad"} the (maybe subjective) emotion of a piece (e.g. "Calm")
  emotion;

  // {string[]} the artists/composers of the piece (e.g. ["Kevin MacLeod"])
  artists;

  // {string[]} an array of instruments in a piece (e.g. ["Acoustic Percussion", "Marimba"])
  instruments;

  // {string} the rounded duration of the piece (e.g. "5:05")
  get duration() {
    return "0:00"; // TODO
  }

  // {Map<string, MusicInfo>} a set of all created and saved MusicInfo objects
  static #ALL = new Map();

  // {symbol} only permit private construction to prevent duplicates
  static #KEY = Symbol();

  // TODO: read the set logic file to build the maps below
  
  // {Map<string, string>} source abbreviation -> full name
  static SS = null;

  // {Map<string, string>} emotion abbreviation -> full name
  static ES = null;
  
  // {Map<string, string>} artist abbreviation -> full name
  static ATS = null;
  
  // {Map<string, string>} instrument abbreviation -> full name
  static INSTS = null;

  /**
   * All of the music file names on Silverman Sound Studios follow a predictable pattern given a title.
   * All letters are lowercased. All spaces are replaced with hyphens. Only hyphens and alphanumerics are kept.
   * @param {string} silvermanTitle the title of a piece on Silverman Sound Studios
   * @return {string} the formatted string as described above
   */
  static shine(silvermanTitle) {
    return silvermanTitle.toLowerCase().replaceAll(" ", "-").replaceAll(/[^-0-9a-z]/g, "");
  }

  /**
   * This constructor can only be called internally.
   * If the private KEY field is not passed, this throws an error.
   * This should only be called when a new piece of music needs info.
   */
  constructor(key, rawString) {
    if(key !== MusicInfo.#KEY) throw new Error("MusicInfo objects must be constructed internally.");
    let split = (this.raw = rawString).split("|");
    this.title = split[0];
    let parts = split[1].split(" ");
    // TODO
  }

  // TODO
  static makeNew(rawString, addToMap = true) {
    // TODO
  }

  /**
   * Get a MusicInfo object already in the map
   * @param shortString {string} Title|S (see the makeNew method)
   * @return {MusicInfo} the MusicInfo object in the map
   */
  static retrieve(shortString) {
    if(MusicInfo.#ALL.has(shortString)) return MusicInfo.#ALL.get(shortString);
    throw new Error("Map does not have " + shortString);
  }

  /**
   * Remove a MusicInfo object from the map
   * @param shortString {string} Title|S (see the makeNew method)
   * @return {boolean} true if the MusicInfo object was in the map
   */
  static delete(shortString) {
    return MusicInfo.#ALL.delete(shortString);
  }
}
