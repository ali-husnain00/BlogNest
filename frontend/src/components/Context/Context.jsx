import { createContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

export const BlogContext = createContext(null);

const BlogContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

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
            finally{
                setLoading(false)
            }
        };

        fetchUser();
    }, []);

    const value = {
        user,
        setUser,
        loading,
        setLoading,
    };

    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
