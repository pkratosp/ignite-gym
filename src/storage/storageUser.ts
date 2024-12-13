import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDto } from "../dto/UserDto";
import { USER_STORAGE } from "./storageConfig";

export async function storageUser(user: UserDto) {
  const userSave = JSON.stringify(user);

  await AsyncStorage.setItem(USER_STORAGE, userSave);
}

export async function storageSession() {
  const getSession = await AsyncStorage.getItem(USER_STORAGE);

  const user: UserDto = getSession ? JSON.parse(getSession) : {};

  return user;
}

export async function removeSession() {
  await AsyncStorage.removeItem(USER_STORAGE);
}
