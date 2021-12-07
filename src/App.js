// Import Our Components
import AllPosts from "./pages/AllPosts"
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// Import Hooks from React
import {useState, useEffect} from "react"

// Import Router 6 Component (Route -> Route, Switch -> Routes)
import { Route, Routes, Link, useNavigate } from "react-router-dom";

//////////////////
// Style Object
//////////////////
const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto"
}

function App() {

  /////////////////////////////
  // State and Other Variables
  /////////////////////////////

  const navigate = useNavigate()

  const url = "https://penguin-mason-blog-backend.herokuapp.com/blogs/"

  // State to hold list of todos
  const [posts, setPosts] = useState([])

  // an empty todo for initializing the create form
  const nullBlog = {
    subject: "",
    details: ""
  }

  const [targetBlog, setTargetBlog] = useState(nullBlog)

   //////////////
  // Functions
  //////////////

  // function to get list of blogs from API
  const getBlogs = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  // function to add blogs
  const addBlogs = async (newBlog) => {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    });

    // update the list of blogs
    getBlogs()
  }

  // to select a blog to edit
  const getTargetBlog = (blog) => {
    setTargetBlog(blog);
    navigate("/edit");
  };

  // update blog for our handlesubmit prop
  const updateBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });

    // update our blogs
    getBlogs();
  };

  const deleteBlog = async (blog) => {
    await fetch(url + blog.id, {
      method: "delete"
    })

    getBlogs()
    navigate("/")
  }

  //////////////
  // useEffects
  //////////////

  useEffect(() => {
    getBlogs()
  }, [])

  /////////////////
  // Returned JSX
  /////////////////

  return (
    <div className="App">
      <h1 style={h1}>My Blog</h1>
      <Link to="/new"><button style={button}>Create New Blog</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
        <Route path="/post/:id" element={<SinglePost 
        posts={posts}
        edit={getTargetBlog}
        deleteBlog={deleteBlog}
        />}/>
        <Route path="/new" element={<Form
          initialBlog={nullBlog}
          handleSubmit={addBlogs}
          buttonLabel="Create Blog"
        />}/>
        <Route path="/edit" element={<Form
          initialBlog={targetBlog}
          handleSubmit={updateBlog}
          buttonLabel="Update Blog"
        />}/>
      </Routes>
    </div>
  );
}

export default App;
