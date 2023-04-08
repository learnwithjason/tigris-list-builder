import { useLoaderData } from '@remix-run/react';
import { Tigris } from '@tigrisdata/core';
import type { SearchQuery } from '@tigrisdata/core/dist/search';
import type { Artist } from 'db/models/artists';

export async function loader() {
	const client = new Tigris();
	const db = client.getDatabase();
	const artists = db.getCollection<Artist>('artists');

	const query: SearchQuery<Artist> = {
		q: 'hip hop',
		searchFields: ['name', 'genres'],
		facets: ['genres'],
	};

	const results = await artists.search(query);

	for await (const result of results) {
		console.log(JSON.stringify(result, null, 2));
	}

	return results;
}

export default function Index() {
	const data = useLoaderData();

	return (
		<>
			<h1>Musical Artists</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	);
}
