import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedChat: {},
  },
  reducers: {
    addChats: (state, action) => {
      const payloadArray = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const existingIds = new Set(state.chats.map((chat) => chat._id));
      const newChats = payloadArray.filter(
        (newChat) => !existingIds.has(newChat._id)
      );
      state.chats.push(...newChats);
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    removeSelectedChat: (state) => {
      state.selectedChat = {};
    },
    updateMemberSelectedChat: (state, action) => {
      state.selectedChat.members = [...action.payload.members];
    },
    deleteMemberSelectedChat: (state, action) => {
      state.selectedChat.members = [...action.payload.members];
    },
    updateSelectedChat:(state,action) => {
        state.selectedChat.chatName=action.payload
    }
  },
});

export const {
  addChats,
  setSelectedChat,
  removeSelectedChat,
  updateMemberSelectedChat,
  deleteMemberSelectedChat,
  updateSelectedChat
} = chatSlice.actions;

export default chatSlice.reducer;
