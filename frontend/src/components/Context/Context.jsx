import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export const BlogContext = createContext(null);

const BlogContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const [allBlogs, setAllBlogs] = useState([]);

    const BASE_URL = import.meta.env.VITE_API_URL;


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${BASE_URL}/profile`, {
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
            const res = await fetch(`${BASE_URL}/getAllBlogs`);
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
        BASE_URL,
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
