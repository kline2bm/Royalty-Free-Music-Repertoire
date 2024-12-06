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
}
// Title\sArtist\eINST
