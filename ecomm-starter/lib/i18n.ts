import en from "../messages/en.json";

export type MessageKeys = keyof typeof en;

export function getMessages(locale: string = "en") {
  // For now, always return English as the base structure
  return en;
}

export function t(key: string, messages: any = en) {
  const keys = key.split(".");
  let value = messages;
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}
