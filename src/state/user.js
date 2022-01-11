
import { atom } from 'recoil';

export const userState = new atom({
  key: 'User',
  default: null,  
});

export const completeLoadUserState = new atom({
  key: 'LoadUser',
  default: false,
});

export const editorState = new atom({
  key: 'EditorUser',
  default: null,
})