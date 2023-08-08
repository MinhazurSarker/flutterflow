// "use client"
import axios from 'axios';


export default async function Home() {
  const fetch = async () => {
    console.log('hi')
    const username = process.env.NEXT_PUBLIC_USER_NAME;
    const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

    const authHeaderValue = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
    const userApiUrl = `https://api.github.com/users/${username}`;
    const reposApiUrl = `https://api.github.com/users/${username}/repos`;
    try {
      const userResponse = await axios.get(userApiUrl, {
        headers: {
          Authorization: authHeaderValue,
        },
      })
      const reposResponse = await axios.get(reposApiUrl, {
        headers: {
          Authorization: authHeaderValue,
        },
      })


      const user = userResponse?.data;
      const repos = reposResponse?.data?.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        html_url: repo.html_url,
        zipUrl: `${repo.html_url}/archive/refs/heads/${repo.default_branch}.zip`,
      }));



      return {
        user: user,
        repositories: repos,
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        user: {},
        repositories: [],
      };
    }
  }

  const { user, repositories } = await fetch()

  return (
    <div className="bg-slate-200 dark:bg-slate-950 text-gray-800 dark:text-gray-300 min-h-screen flex flex-col justify-center items-center">
      <div className="text-center p-8">
        <img src={user?.avatar_url} alt={`${user?.login} avatar`} className="w-36 h-36 rounded-full mx-auto mb-4 ring-2 dark:ring-0 ring-blue-600" />
        <a href={user?.html_url} target="_blank" rel="noopener noreferrer"><h1 className="text-3xl font-semibold mb-2">{user?.login}</h1></a>
        <p className="text-gray-700 dark:text-gray-400 mb-4">{user?.bio}</p>
        <p className="text-gray-700 dark:text-gray-400 mb-4">{user?.location}</p>
        <div className="flex justify-center items-center">
          <p className="text-gray-700 dark:text-gray-400 mr-2">Followers: {user?.followers} |</p>
          <p className="text-gray-700 dark:text-gray-400">Following: {user?.following}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold p-8">GitHub Repositories</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        {repositories.map(repo => (
          <li key={repo.id} className="border-2 p-4 min-h-36 rounded border-gray-600 dark:border-gray-300 relative">
            <h3 className="text-lg font-semibold mb-2">{repo?.name}</h3>
            <p className="text-gray-700 dark:text-gray-400 mb-4 mb-2">{repo?.description}</p>
            <p className="text-gray-700 dark:text-gray-400 mb-4 mb-10">⭐: {repo?.stargazers_count}</p>
            <div className="mt-2 absolute bottom-3 left-3 right-3 ">
              <a href={repo?.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-4">
                View on GitHub
              </a>
              <a href={repo?.zipUrl} download className="text-blue-500">
                Download ZIP
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

