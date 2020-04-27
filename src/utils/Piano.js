import { KEYBOARD_KEYS } from "../constants/Piano";

/**
* Function to check if a single key is a valid keyboard key
* Returns an boolean of whether key is a valid keyboard key or not
* @param {string} searchKey - A key to check if it is a valid keyboard key
*/
export function isCorrectKeyboardKey(searchKey) {
  const pianoKeys = KEYBOARD_KEYS;
  const keyFound = pianoKeys.find((pianoKey) => {
    return pianoKey.key === searchKey;
  });

  if(keyFound) return true;

  return false;
}

/**
* Function to get all invalid piano letters
* Returns an array of invalid keys
* @param {string[]} searchKeys - An array of keys to sift through
*/
export function getInvalidKeys(searchKeys) {
  const pianoKeys = KEYBOARD_KEYS;
  let invalidKeys = [];
  searchKeys.forEach((elem) => {
    if(elem){
      let found = pianoKeys.find((item) => item.key === elem.toLocaleUpperCase());
      if(!found) invalidKeys.push(elem);
    }
  });
  return invalidKeys;
}