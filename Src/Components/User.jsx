import { useEffect, useState } from "react";

const Contact = () => {
  const [githubUser, setGithubUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      const res = await fetch("https://api.github.com/users/atif-afsar");
      if (!res.ok) throw new Error("Failed to fetch GitHub data");
      const data = await res.json();
      setGithubUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        Contact Me
      </h1>

      {loading && (
        <p className="text-center text-lg text-gray-500">Loading GitHub data...</p>
      )}

      {error && (
        <p className="text-center text-red-500 text-lg">{error}</p>
      )}

      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {/* GitHub Card */}
        {githubUser && (
          <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
            <img
              src={githubUser.avatar_url}
              alt="GitHub avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">{githubUser.name}</h2>
            <p className="text-gray-500 mb-3">@{githubUser.login}</p>
            <div className="text-sm text-left text-gray-600 mb-4 space-y-1">
              <p><strong>Followers:</strong> {githubUser.followers}</p>
              <p><strong>Public Repos:</strong> {githubUser.public_repos}</p>
              <p><strong>Location:</strong> {githubUser.location || "Not specified"}</p>
              <p><strong>Email:</strong> atifafsar648@gmail.com</p>
            </div>
            <a
              href={githubUser.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
            >
              Visit GitHub Profile
            </a>
          </div>
        )}

        {/* LinkedIn Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md text-center">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E03AQEca3UZGC_Qfg/profile-displayphoto-shrink_800_800/B4EZXIliSWHgAc-/0/1742827039416?e=1751500800&v=beta&t=rGaOQdHsowmI_A-nt21CGXo_JLt16ehUAs40ut36sf4" 
            alt="LinkedIn avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 object-cover"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">Atif Afsar</h2>
          <p className="text-gray-500 mb-3">Frontend Developer | B.Tech CSE</p>
          <div className="text-sm text-left text-gray-600 mb-4 space-y-1">
            <p><strong>Followers:</strong> 500+ connections</p>
            <p><strong>Title:</strong> Software Developer (LinkedIn)</p>
            <p><strong>Location:</strong> India</p>
            <p><strong>Email:</strong> atifafsar648@gmail.com</p>
          </div>
          <a
            href="https://www.linkedin.com/in/atif-afsar-64903b33a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition"
          >
            Visit LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
