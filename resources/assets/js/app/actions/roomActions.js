export const addRoom = (room) => {
  return { type: 'room/ADD', payload:{ room} };
};

export const updateRoom = (room) => {
  return { type: 'room/UPDATE', payload: { room} };
};

export const removeRoom = (room) => {
  return { type: 'room/REMOVE', payload:{ room} };
};