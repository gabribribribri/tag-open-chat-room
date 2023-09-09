import type { PageLoad } from "./$types"
import { username } from "$lib/stores"
import { get } from "svelte/store"
import { goto } from "$app/navigation"

export const ssr = false

export const load: PageLoad = () => {
	const id = get(username)
	if (id == "") goto("/")
}