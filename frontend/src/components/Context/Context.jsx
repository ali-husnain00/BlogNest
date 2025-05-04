import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export const BlogContext = createContext(null);

const BlogContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const [allBlogs, setAllBlogs] = useState([]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:3000/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.log("An error occurred while getting user details");
                }
            } catch (error) {
                console.log(error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchUser();
    }, []);

    const fetchAllBlogs = async () => {
        try {
            const res = await fetch("http://localhost:3000/getAllBlogs");
            if (res.ok) {
                const data = await res.json();
                setAllBlogs(data);
            } else {
                console.log("Error fetching all blogs");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAllBlogs();
    }, []);

    const value = {
        user,
        setUser,
        loading,
        setLoading,
        allBlogs,
        fetchAllBlogs,
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
