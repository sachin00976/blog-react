import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const status = useSelector((state) => state.auth.status);
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(true); // Add loading state

    const text = status === false ? "Login to read posts" : "Create to view Post";

    useEffect(() => {
        if (userData && userData["$id"]) { // Ensure userData is available
            setLoading(true);
            appwriteService.getUserPosts(userData["$id"]).then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
                setLoading(false); // Stop loading after fetching posts
            }).catch((error) => {
                console.log("Error fetching posts:", error);
                setLoading(false); // Stop loading on error
            });
        }
    }, [userData]); // Run useEffect when userData changes

    const [counter, setCounter] = useState(4);

    useEffect(() => {
        if (status && loading) {
            const intervalId = setInterval(() => {
                setCounter((prevCounter) => {
                    if (prevCounter > 1) {
                        return prevCounter - 1;
                    } else {
                        clearInterval(intervalId);
                        return 0;
                    }
                });
            }, 1000);
        }
    }, [status, loading]);

    if (status && loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                    {counter > 0 ? (
                        <p>Please reload in {counter} seconds...</p>
                    ) : (
                        <p>Reload the page, something went wrong.</p>
                    )}
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                               {text}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
