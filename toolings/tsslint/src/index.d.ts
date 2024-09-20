import type { Config } from '@tsslint/config'

declare module '@toolings/tsslint-config' {
	export default async function linter(): Config | Config[]
}
