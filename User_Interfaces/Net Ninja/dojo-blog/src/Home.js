import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);

  const [name, setName] = useState('mario');
  const [isPending, setIsPending] = useState(true);

//   const handleDelete = (id) => {
//     const newBlogs = blogs.filter(blog => blog.id !== id);
//     setBlogs(newBlogs);
//   }

  useEffect(() => { 
    fetch('http://localhost:8000/blogs')
        .then(response => {
            return response.json()
        })
        .then((data) => {
            console.log(data)
            setBlogs(data)
            setIsPending(false);
        })
  }, [])

  return (
    <div className="home">
        {isPending && <div>Loading...</div>}
        {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
    </div>
  );
}
 
export default Home;