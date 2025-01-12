// TODO: test delete method
console.group("testing MusicInfo.delete method");
let ABC = MusicInfo.makeNew("ABC\\iXYZ\\nAPNO");
console.log("ABC", ABC);
console.assert(MusicInfo.delete("ABC\\i"));
console.assert(!(MusicInfo.delete("Does not exist")));
console.assert(!(MusicInfo.delete("ABC\\i")));
console.groupEnd();
