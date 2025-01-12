/**
 * Information about a piece of music
 */
class MusicInfo {
  // {string} the unprocessed string (e.g. "Accralate\\iKevin MacLeod\\cAPRC MRBA")
  raw;

  // {string} the title of the piece (e.g. "Accralate")
  title;

  // {string} the URL of a piece (e.g. "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Accralate.mp3")
  src;

  // {string} the artist/composer of the piece (e.g. "Kevin MacLeod")
  artist;

  // {"angry"|"calm"|"fearful"|"happy"|"neutral"|"romantic"|"sad"} the (maybe subjective) emotion of a piece (e.g. "calm")
  emotion;

  // {string[]} an array of instruments in a piece (e.g. ["Acoustic Percussion", "Marimba"])
  instruments;

  // {Set<MusicInfo>} a set of all created MusicInfo objects
  static #ALL = new Set();

  // {symbol} only permit private construction to prevent duplicates
  static #KEY = Symbol();

  // {Map<string, string>} instrument abbreviation -> full name
  static INSTS = new Object.freeze(new Map([
    ["ACDN", "Accordion/Harmonium"],    ["AGTR", "Acoustic Guitar"],
    ["APNO", "Acoustic Piano"],         ["APRC", "Acoustic Percussion"],
    ["BAGP", "Bagpipes/Uillean"],       ["BASN", "Bassoon"],
    ["BASS", "Bass"],                   ["BELL", "Bells"],
    ["BNJO", "Banjo"],                  ["CLST", "Celesta"],
    ["CLNT", "Clarinet"],               ["DGOO", "Didgeridoo"],
    ["DULC", "Dulcimer/Zither"],        ["EFFX", "Sound Effects"],
    ["EGTR", "Electric Guitar"],        ["ENST", "Ethnic Strings"],
    ["ENWD", "Ethnic Winds"],           ["EPNO", "Electric Piano"],
    ["EPRC", "Electric Percussion"],    ["FLUT", "Flute/Piccolo"],
    ["GLCK", "Glockenspiel"],           ["HARP", "Harp"],
    ["HMCA", "Harmonica"],              ["HORN", "French Horn/Misc. Horn"],
    ["HPCH", "Harpsichord"],            ["HPRC", "Human Percussion"],
    ["JORG", "Jazz/Rock Organ"],        ["KLBA", "Kalimba"],
    ["MDLN", "Mandolin/Bouzouki"],      ["MRBA", "Marimba"],
    ["MUTE", "Muted Brass"],            ["MUBX", "Music Box"],
    ["OBOE", "Oboe/Cor Anglais"],       ["PFLT", "Pan Flute/Ocarina"],
    ["PIZZ", "Pizzicato Strings"],      ["PORG", "Pipe/Church Organ"],
    ["TIMP", "Timpani"],                ["TRBN", "Trombone"],
    ["TRPT", "Trumpet/Cornet"],         ["TUBA", "Tuba"],
    ["SAXO", "Saxophone"],              ["SITR", "Sitar"],
    ["STDR", "Steel/Tongue Drum"],      ["STRS", "Bowed Strings"],
    ["SYNZ", "Synthesizer"],            ["UKLE", "Ukulele"],
    ["VIBE", "Vibraphone"],             ["VOCL", "Vocals"],
    ["WHSL", "Whistle/Recorder"],       ["XYLO", "Xylophone"]
  ]));

  /**
   * Given a title and a src code, this returns the URL of the music.
   * b = Bryce Kline's CC: By music (not yet implemented)
   * f = FreePD (not yet implemented)
   * i = Incompetech
   * s = Silverman Sound Studios (not yet implemented)
   * u = URL for another website (not yet implemented)
   * w = Wayback Machine for FreePD Page 2 (not yet implemented)
   * y = Bryce Kline's CC: Zero music (not yet implemented)
   * @param title {string} the title (file name without extension)
   * @param s {"i"} the src code
   * @return {string} the URL of the music
   */
  static getSrc(title, s) {
    switch(s) {
      case "i": return `https://incompetech.com/music/royalty-free/mp3-royaltyfree/${title}.mp3`;
      default: throw new Error("Invalid src code " + s);
    }
  }

  /**
   * This constructor can only be called internally.
   * If the private KEY field is not passed, this throws an error.
   * This should only be called when a new piece of music needs info.
   */
  constructor(key, rawString) {
    if(key != MusicInfo.#KEY) throw new Error("MusicInfo objects must be constructed internally.");
    this.raw = rawString;
    const SPLIT = rawString.split("\\");
    this.title = SPLIT[0];
    this.src = MusicInfo.getSrc(this.title, SPLIT[1][0]);
    this.artist = SPLIT[1].substring(1);
    switch(SPLIT[2][0]) {
      case "a": this.emotion = "angry"; break;
      case "c": this.emotion = "calm"; break;
      case "f": this.emotion = "fearful"; break;
      case "h": this.emotion = "happy"; break;
      case "n": this.emotion = "neutral"; break;
      case "r": this.emotion = "romantic"; break;
      case "s": this.emotion = "sad"; break;
      default: throw new Error("Invalid emtion code in " + rawString);
    }
    this.instruments = SPLIT[2].substring(1).split(" ").map(INST => {
      if(MusicInfo.has(INST)) return MusicInfo.get(INST);
      throw new Error("Invalid instrument code " + INST);
    });
    Object.freeze(Object.freeze(this).instruments);
  }

  /**
   * Make a new MusicInfo object, optionally putting it in the internal map
   * @param rawString {string} Title\sArtist\eINST
   * Title: the title of the piece
   * s: the src code of the piece (see the getSrc method)
   * Artist: the artist/composer of the piece
   * e: the first letter of the emotion (angry, calm, fearful, happy, neutral, romantic, sad)
   * INST: the space-separated list of instrument codes in the piece (see the ISNTS property)
   * @param addToMap {boolean} if true: Title\s cannot already be in the map, and this object will be added
   * @return {MusicInfo} the newly-created MusicInfo object
   */
  static makeNew(rawString, addToMap = true) {
    let shortString = rawString.substring(0, rawString.indexOf("\\") + 2);
    if(addToMap && MusicInfo.#ALL.has(shortString))
      throw new Error("Map already has " + shortString);
    let newObject = new MusicInfo(MusicInfo.#KEY, rawString);
    if(addToMap) MusicInfo.#ALL.set(shortString, newObject);
    return newObject;
  }

  /**
   * Get a MusicInfo object already in the map
   * @param shortString {string} Title\s (see the makeNew method)
   * @return {MusicInfo} the MusicInfo object in the map
   */
  static retrieve(shortString) {
    if(MusicInfo.#ALL.has(shortString)) return MusicInfo.#ALL.get(shortString);
    throw new Error("Map does not have " + shortString);
  }

  /**
   * Remove a MusicInfo object from the map
   * @param shortString {string} Title\s (see the makeNew method)
   * @return {boolean} true if the MusicInfo object was in the map
   */
  static delete(shortString) {
    return MusicInfo.#ALL.delete(shortString);
  }
}
