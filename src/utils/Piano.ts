import { KEYBOARD_KEYS } from "../constants/Piano";

export function isCorrentKeyboardKey(searchKey: string) {
  const pianoKeys = KEYBOARD_KEYS;
  const keyFound = pianoKeys.find((pianoKey) => {
    return pianoKey.key === searchKey;
  });

  if(keyFound) return true;

  return false;
}