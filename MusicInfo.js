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
    ["BASS", "Bass"],                   ["BELL", "Bells/Celesta"],
    ["BNJO", "Banjo"],                  ["CLNT", "Clarinet"],
    ["DGOO", "Didgeridoo"],             ["DULC", "Dulcimer/Zither"],
    ["EFFX", "Sound Effects"],          ["EGTR", "Electric Guitar"],
    ["ENST", "Ethnic Strings"],         ["ENWD", "Ethnic Winds"],
    ["EPNO", "Electric Piano"],         ["EPRC", "Electric Percussion"],
    ["FLUT", "Flute/Piccolo"],          ["GLCK", "Glockenspiel"],
    ["HARP", "Harp"],                   ["HMCA", "Harmonica"],
    ["HORN", "French Horn/Misc. Horn"], ["HPCH", "Harpsichord"],
    ["HPRC", "Human Percussion"],       ["JORG", "Jazz/Rock Organ"],
    ["KLBA", "Kalimba"],                ["MDLN", "Mandolin/Bouzouki"],
    ["MRBA", "Marimba"],                ["MUTE", "Muted Brass"],
    ["MUBX", "Music Box"],              ["OBOE", "Oboe/Cor Anglais"],
    ["PFLT", "Pan Flute/Ocarina"],      ["PIZZ", "Pizzicato Strings"],
    ["PORG", "Pipe/Church Organ"],      ["TIMP", "Timpani"],
    ["TRBN", "Trombone"],               ["TRPT", "Trumpet/Cornet"],
    ["TUBA", "Tuba"],                   ["SAXO", "Saxophone"],
    ["SITR", "Sitar"],                  ["STDR", "Steel/Tongue Drum"],
    ["STRS", "Bowed Strings"],          ["SYNZ", "Synthesizer"],
    ["VIBE", "Vibraphone"],             ["VOCL", "Vocals"],
    ["WHSL", "Whistle/Recorder"],       ["XYLO", "Xylophone"]
  ]));

  /**
   * Given a title and a src code, this returns the URL of the music.
   * i = Incompetech
   * (more to come)
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
    MusicInfo.add(this);
  }
}
// Title\sArtist\eINST
