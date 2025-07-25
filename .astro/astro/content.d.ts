declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"10-personajes-celebres-mexicanos.mdx": {
	id: "10-personajes-celebres-mexicanos.mdx";
  slug: "10-personajes-celebres-mexicanos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
};
"posts-temp": {
"8-curiosidades-sobre-coco.mdx": {
	id: "8-curiosidades-sobre-coco.mdx";
  slug: "8-curiosidades-sobre-coco";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"calumnia-de-apeles.mdx": {
	id: "calumnia-de-apeles.mdx";
  slug: "calumnia-de-apeles";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"covadonga-historica.mdx": {
	id: "covadonga-historica.mdx";
  slug: "covadonga-historica";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"jardin-de-las-delicias.mdx": {
	id: "jardin-de-las-delicias.mdx";
  slug: "jardin-de-las-delicias";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"la-playa-mas-pequena-de-espana.mdx": {
	id: "la-playa-mas-pequena-de-espana.mdx";
  slug: "la-playa-mas-pequena-de-espana";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"la-sensualidad-del-vuelo.mdx": {
	id: "la-sensualidad-del-vuelo.mdx";
  slug: "la-sensualidad-del-vuelo";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"la-sirenita-george-delatour.mdx": {
	id: "la-sirenita-george-delatour.mdx";
  slug: "la-sirenita-george-delatour";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"la-tragedia-del-naufragio.mdx": {
	id: "la-tragedia-del-naufragio.mdx";
  slug: "la-tragedia-del-naufragio";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"mayo-1808-en-madrid.mdx": {
	id: "mayo-1808-en-madrid.mdx";
  slug: "mayo-1808-en-madrid";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"paisajes-sublimes-y-personas-de-espaldas.mdx": {
	id: "paisajes-sublimes-y-personas-de-espaldas.mdx";
  slug: "paisajes-sublimes-y-personas-de-espaldas";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"ribadesella.mdx": {
	id: "ribadesella.mdx";
  slug: "ribadesella";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"ruta-del-cares.mdx": {
	id: "ruta-del-cares.mdx";
  slug: "ruta-del-cares";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
"vermer-hitler-y-la-astronomia.mdx": {
	id: "vermer-hitler-y-la-astronomia.mdx";
  slug: "vermer-hitler-y-la-astronomia";
  body: string;
  collection: "posts-temp";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
