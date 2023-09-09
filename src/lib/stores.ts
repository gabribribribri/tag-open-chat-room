import { writable } from "svelte/store"

export const username = writable("")

export type Message = {
    username: string;
    content: string;
}

//export const messageMap = writable(new Map<string, string>());