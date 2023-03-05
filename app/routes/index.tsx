import { useLoaderData } from '@remix-run/react';
import { Order, Tigris } from '@tigrisdata/core';
import type { Movie } from 'db/models/movies';

export async function loader() {
	const db = new Tigris().getDatabase();
	const movies = db.getCollection<Movie>('movies');

	const result = await movies.search(
		{
			q: 'day',
			searchFields: ['title', 'cast', 'genres'],
			facets: ['year'],
			sort: [
				{
					field: 'year',
					order: Order.DESC,
				},
			],
			hitsPerPage: 50,
		},
		1,
	);

	return result.hits;
}

export default function Index() {
	const movies: Movie[] = useLoaderData();

	return (
		<>
			<h1>Movie Night Playlist Builder</h1>
			<pre>{JSON.stringify(movies, null, 2)}</pre>
			{/* {movies.map((movie) => (
				<li key={movie.id}>
					<strong>{movie.title}</strong> ({movie.year})
				</li>
			))} */}
		</>
	);
}
