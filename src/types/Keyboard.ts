export type TKeyboardKey = {
  key: string;
  blackKeyOverlap: boolean;
};

export type InputActiveKey = {
  // Value from input
  input: string;
  // id to uniquely identify input
  id: number;
}