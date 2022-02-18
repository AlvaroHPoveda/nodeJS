const http = require('http');

const users = [
	{ name: 'Max', age: 23 },
	{ name: 'John', age: 22 },
	{ name: 'Jill', age: 21 },
];

const posts = [
	{ id: 1, title: 'Post 1', content: 'Some content' },
	{ id: 2, title: 'Post 2', content: 'Some content 2' },
	{ id: 3, title: 'Post 3', content: 'Some content 3' },
];

// Create HTTP server
const server = http.createServer((request, response) => {
	const url = request.url;
	const method = request.method;
	const paramsIndex = url.lastIndexOf('/');
	const hasId = paramsIndex > 0;

	// Endpoints
	if (method === 'GET' && url === '/users') {
		response.write(JSON.stringify(users));
	} else if (url === '/posts' && method === 'GET') {
		response.write(JSON.stringify(posts));
	} else if (url === '/posts' && method === 'POST') {
		// Save a new post

		// title=New post&content=This is a new post -> Buffer
		const postData = [];

		request.on('data', chunk => {
			postData.push(chunk);
		});

		let newPost;

		request.on('end', () => {
			const parsedData = Buffer.concat(postData).toString();

			// Split string by &
			const [id, title, content] = parsedData.split('&'); // ['title=New post', 'content=This is a new post']

			// Extract title and content value
			const idValue = id.split('=')[1]; // ['title', 'New post']
			const titleValue = title.split('=')[1]; // ['title', 'New post']
			const contentValue = content.split('=')[1];

			// Create new post (pass the title and the content)
			newPost = {
				id: idValue,
				title: titleValue,
				content: contentValue,
			};

			posts.push(newPost);
		});

		// Send the new post to the client
		response.write(JSON.stringify(posts));
	} else if (method === 'GET' && url.includes('/posts') && hasId) {
		const postId = url.slice(paramsIndex + 1);

		const post = posts.find(post => {
			return post.id === +postId;
		});

		if (!post) {
			response.write('No post found with the given id');
		} else {
			response.write(JSON.stringify(post));
		}
	} else {
		response.write('No data found!');
	}

	response.end();
});

// http://localhost:4000
server.listen(4000);