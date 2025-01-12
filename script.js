console.group("Testing MusicInfo.makeNew");
let ACCR = MusicInfo.makeNew("Accralate\\iKevin MacLeod\\cAPRC MRBA");
try {
  MusicInfo.makeNew("Accralate\\iKevin MacLeod\\cAPRC");
  console.error("duplicate MusicInfo in map");
} catch(e) {
  console.assert(e.message.includes("Map already has"));
}
let ABC = MusicInfo.makeNew("A\\iB\\nEFFX", false), XYZ = MusicInfo.makeNew("A\\iB\\nHPRC", false);
console.log("ACCR", ACCR); console.log("ABC", ABC); console.log("XYZ", XYZ);
console.groupEnd();

console.group("Testing MusicInfo.retrieve");
console.log("ACCR-retrieved", MusicInfo.retrieve("Accralate\\i"));
try {
  console.error(MusicInfo.retrieve("Does not exist\\i"));
} finally {
  MusicInfo.makeNew("Odyssey\\iKevin MacLeod\\hSYNZ");
  console.log("ODYS-retrieved", MusicInfo.retrieve("Odyssey\\i"));
}
console.groupEnd();

// TODO: test delete method
