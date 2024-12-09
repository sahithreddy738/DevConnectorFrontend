import BACKGROUND_IMAGE1 from "../assets/chat-background.jpg";
import BACKGROUND_IMAGE2 from "../assets/chat-background2.jpg";
import BACKGROUND_IMAGE3 from "../assets/chat-background3.jpg";
import BACKGROUND_IMAGE4 from "../assets/chat-background4.jpg";
import BACKGROUND_IMAGE5 from "../assets/chat-background5.webp";
import BACKGROUND_IMAGE6 from "../assets/chat-background6.jpg";
import BACKGROUND_IMAGE7 from "../assets/chat-background7.jpg";
import BACKGROUND_IMAGE8 from "../assets/chat-background7.webp";
import BACKGROUND_IMAGE9 from "../assets/chat-background8.jpg";
import BACKGROUND_IMAGE10 from "../assets/chat-background6.webp";
export const BASE_URL = "http://localhost:3000/";
export const LOGIN_URL = BASE_URL + "login";
export const LOGOUT_URL = BASE_URL + "logout";
export const GET_PROFILE_URL = BASE_URL + "profile/view";
export const UPDATE_PROFILE_URL = BASE_URL + "profile/edit";
export const FEED_URL = BASE_URL + "user/feed";
export const CONNECTIONS_URL = BASE_URL + "user/connections";
export const CONNECTION_REQUEST_URL = BASE_URL + "user/requests/received";
export const REVIEW_REQUEST_URL = BASE_URL + "request/review/";
export const REQUEST_SENT_URL = BASE_URL + "request/";
export const SIGNUP_URL = BASE_URL + "signup";
export const UPDATE_URL = BASE_URL + "profile/password";
export const GET_USER_PROFILE = BASE_URL + "profile/";
export const GET_CHATS = BASE_URL + "chat";
export const POST_GROUPCHAT = BASE_URL + "groupChat";
export const GET_MESSAGES = BASE_URL + "message/";
export const GET_CHAT_DETAILS = BASE_URL + "chat/";
export const POST_MESSAGE = BASE_URL + "message";
export const ADD_MEMBER = BASE_URL + "groupChat/addMember";
export const DELETE_MEMBER = BASE_URL + "groupChat/deleteMember";
export const ADD_CHAT = BASE_URL + "chat/";
export const UPDATE_CHAT_NAME = BASE_URL + "chat/rename";
export const background_images = [
  BACKGROUND_IMAGE1,
  BACKGROUND_IMAGE2,
  BACKGROUND_IMAGE3,
  BACKGROUND_IMAGE4,
  BACKGROUND_IMAGE5,
  BACKGROUND_IMAGE6,
  BACKGROUND_IMAGE7,
  BACKGROUND_IMAGE8,
  BACKGROUND_IMAGE9,
  BACKGROUND_IMAGE10,
];
export const DATE_OPTIONS = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZone: "IST",
};
