/**
 * Information about a piece of music
 */
class MusicInfo {
  // {string} the unprocessed string (e.g. "Accralate|i@KM|cAPRC MRBA")
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

  // {Map<string, MusicInfo>} a set of all created MusicInfo objects
  static #ALL = new Map();

  // {symbol} only permit private construction to prevent duplicates
  static #KEY = Symbol();

  // {Map<string, string>} instrument abbreviation -> full name
  static INSTS = Object.freeze(new Map([
    ["ACDN", "Accordion/Harmonium"],    ["AGTR", "Acoustic Guitar"],
    ["APNO", "Acoustic Piano"],         ["APRC", "Acoustic Percussion"],
    ["BAGP", "Bagpipes/Uillean"],       ["BASN", "Bassoon"],
    ["BASS", "Bass"],                   ["BELL", "Bells"],
    ["BNJO", "Banjo"],                  ["CLNT", "Clarinet"],
    ["CLST", "Celesta"],                ["DGOO", "Didgeridoo"],
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
   * All of the music file names on Silverman Sound Studios follow a predictable pattern given a title.
   * All letters are lowercased. All spaces are replaced with hyphens. Only hyphens and alphanumerics are kept.
   * @param silvermanTitle {string} the title of a piece on Silverman Sound Studios
   * @return {string} the formatted string as described above
   */
  static shine(silvermanTitle) {
    return silvermanTitle.toLowerCase().replaceAll(" ", "-").replaceAll(/[^-0-9a-z]/g, "");
  }
  
  /**
   * Given a title and a src code, this returns the URL of the music.
   * b = Bryce Kline's CC: By music (not yet implemented)
   * f = FreePD
   * i = Incompetech
   * s = Silverman Sound Studios
   * u = URL for another website (not yet implemented)
   * w = Wayback Machine for FreePD Page 2
   * z = Bryce Kline's CC: Zero music (not yet implemented)
   * @param title {string} the title (file name without extension)
   * @param s {"f" | "i" | "s" | "w"} the src code
   * @return {string} the URL of the music
   */
  static getSrc(title, s) {
    switch(s) {
      case "f": return `https://freepd.com/music/${title}.mp3`;
      case "i": return `https://incompetech.com/music/royalty-free/mp3-royaltyfree/${title}.mp3`;
      case "s": return `https://www.silvermansound.com/wp-content/uploads/${MusicInfo.shine(title)}.mp3`;
      case "w": return `https://web.archive.org/web/20231215120257/https://freepd.com/Page2/music/${title}.mp3`;
      default: throw new Error("Invalid src code " + s);
    }
  }

  /**
   * Make like Houdini and get out of a seemingly impossible bondage situation
   * Or replace an artist code of the form @XY with the artist name
   * The artist codes reduce the size of the repertoire file by replacing common artists with fewer chars
   * \@AA Adolphe C. Adam      \@AN Alexander Nakarada    \@AF Arthur Fordsworthy                   \@AG Alice Goodworth
   * \@AY Anonymous            \@BB Brian Boyko           \@BD Brett Van Donsel                     \@BK Bryce M. Kline
   * \@BT Bryan Teoh           \@BX Bix L. B. Beiderbecke \@CL Calixa Lavallée                      \@CS Charles-Camille Saint-Saëns
   * \@DR Dom Raven            \@DS dogsounds             \@EG Edvard H. Grieg                      \@ES Erik A. Satie
   * \@FC Frédéric F. Chopin   \@FG Fake Music Generator  \@FH F. Joseph Haydn                      \@FN Frank Nora
   * \@GG George Gershwin      \@GH Gustav T. Holst       \@GR Gioachino A. Rossini                 \@JB Johann S. Bach
   * \@JC John M. Cage         \@JG John Gavins           \@JN John Newton                          \@JP Johann Pachelbel
   * \@JS James Scott          \@KF Knight of Fire        \@KK Komiku                               \@KM Kevin MacLeod
   * \@LB Ludwig van Beethoven \@LV LibriVox              \@MF Max Fedorov                          \@MM Modest P. Mussorgsky
   * \@MO MusOpen              \@PB Pixabay               \@PG Peter Gresser                        \@PS Phase Shift
   * \@PT Pyotr I. Tchaikovsky \@RB R. Luigi Boccherini   \@RE Radio Kilimanjaro Automaton Ensemble \@RK Rafael Krux
   * \@SA Suno AI              \@SB Samuel O. Barber      \@SI Shane Ivers                          \@SJ Scott Joplin
   * \@TM Thundermine          \@TR Traditional           \@WM Wolfgang A. Mozart                   \@WY William B. Yeats
   * \@YS Johannes Schroll
   * param string {string} a string that may contain an artist code
   * return {string} a string with artist codes replaced with their corresponding names
   */
  static escapeArtists(string) {
    return string
      .replaceAll("@AA", "Adolphe C. Adam")                      .replaceAll("@AN", "Alexander Nakarada")   .replaceAll("@AF", "Arthur Fordsworthy")
      .replaceAll("@AG", "Alice Goodworth")                      .replaceAll("@AY", "Anonymous")            .replaceAll("@BB", "Brian Boyko")
      .replaceAll("@BD", "Brett Van Donsel")                     .replaceAll("@BK", "Bryce M. Kline")       .replaceAll("@BT", "Bryan Teoh")
      .replaceAll("@BX", "Bix L. B. Beiderbecke")                .replaceAll("@CL", "Calixa Lavallée")      .replaceAll("@CS", "Charles-Camille Saint-Saëns")
      .replaceAll("@DR", "Dom Raven")                            .replaceAll("@DS", "dogsounds")            .replaceAll("@EG", "Edvard H. Grieg")
      .replaceAll("@ES", "Erik A. Satie")                        .replaceAll("@FC", "Frédéric F. Chopin")   .replaceAll("@FG", "Fake Music Generator")
      .replaceAll("@FH", "F. Joseph Haydn")                      .replaceAll("@FN", "Frank Nora")           .replaceAll("@GG", "George Gershwin")
      .replaceAll("@GH", "Gustav T. Holst")                      .replaceAll("@GR", "Gioachino A. Rossini") .replaceAll("@JB", "Johann S. Bach")
      .replaceAll("@JC", "John M. Cage")                         .replaceAll("@JG", "John Gavins")          .replaceAll("@JN", "John Newton")
      .replaceAll("@JP", "Johann Pachelbel")                     .replaceAll("@JS", "James Scott")          .replaceAll("@KF", "Knight of Fire")
      .replaceAll("@KK", "Komiku")                               .replaceAll("@KM", "Kevin MacLeod")        .replaceAll("@LB", "Ludwig van Beethoven")
      .replaceAll("@LV", "LibriVox")                             .replaceAll("@MF", "Max Fedorov")          .replaceAll("@MM", "Modest P. Mussorgsky")
      .replaceAll("@MO", "MusOpen")                              .replaceAll("@PB", "Pixabay")              .replaceAll("@PG", "Peter Gresser")
      .replaceAll("@PS", "Phase Shift")                          .replaceAll("@PT", "Pyotr I. Tchaikovsky") .replaceAll("@RB", "R. Luigi Bocherini")
      .replaceAll("@RE", "Radio Kilimanjaro Automaton Ensemble") .replaceAll("@RK", "Rafael Krux")          .replaceAll("@SA", "Suno AI")
      .replaceAll("@SB", "Samuel O. Barber")                     .replaceAll("@SI", "Shane Ivers")          .replaceAll("@SJ", "Scott Joplin")
      .replaceAll("@TM", "Thundermine")                          .replaceAll("@TR", "Traditional")          .replaceAll("@WM", "Wolfgang A. Mozart")
      .replaceAll("@WY", "William B. Yeats")                     .replaceAll("@YS", "Johannes Schroll")
  }

  /**
   * This constructor can only be called internally.
   * If the private KEY field is not passed, this throws an error.
   * This should only be called when a new piece of music needs info.
   */
  constructor(key, rawString) {
    if(key != MusicInfo.#KEY) throw new Error("MusicInfo objects must be constructed internally.");
    this.raw = rawString;
    const SPLIT = MusicInfo.escapeArtists(rawString).split("|");
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
      if(MusicInfo.INSTS.has(INST)) return MusicInfo.INSTS.get(INST);
      throw new Error("Invalid instrument code " + INST);
    });
    Object.freeze(Object.freeze(this).instruments);
  }

  /**
   * Make a new MusicInfo object, optionally putting it in the internal map
   * @param rawString {string} Title|sArtist|eINST
   * Title: the title of the piece
   * s: the src code of the piece (see the getSrc method)
   * Artist: the artist/composer of the piece
   * e: the first letter of the emotion (angry, calm, fearful, happy, neutral, romantic, sad)
   * INST: the space-separated list of instrument codes in the piece (see the ISNTS property)
   * @param addToMap {boolean} if true: Title|s cannot already be in the map, and this object will be added
   * @return {MusicInfo} the newly-created MusicInfo object
   */
  static makeNew(rawString, addToMap = true) {
    let shortString = rawString.substring(0, rawString.indexOf("|") + 2);
    if(addToMap && MusicInfo.#ALL.has(shortString))
      throw new Error("Map already has " + shortString);
    let newObject = new MusicInfo(MusicInfo.#KEY, rawString);
    if(addToMap) MusicInfo.#ALL.set(shortString, newObject);
    return newObject;
  }

  /**
   * Get a MusicInfo object already in the map
   * @param shortString {string} Title|s (see the makeNew method)
   * @return {MusicInfo} the MusicInfo object in the map
   */
  static retrieve(shortString) {
    if(MusicInfo.#ALL.has(shortString)) return MusicInfo.#ALL.get(shortString);
    throw new Error("Map does not have " + shortString);
  }

  /**
   * Remove a MusicInfo object from the map
   * @param shortString {string} Title|s (see the makeNew method)
   * @return {boolean} true if the MusicInfo object was in the map
   */
  static delete(shortString) {
    return MusicInfo.#ALL.delete(shortString);
  }
}
