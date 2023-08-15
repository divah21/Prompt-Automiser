"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter()
  const [prompts, setPrompts] = useState([]);
  const [copied, setCopied] = useState("");


  const handleCopy =() => {
    setCopied(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);
    setTimeout(() => setCopied(""), 3000);
  }
 // const { data: session } = useSession();
  // Check if post and post.creator are defined before accessing properties
 /* if (!post || !post.creator) {
    return null; // You can also render an appropriate loading/error component here
  }*/
  useEffect(() => {
    fetch("/api/prompt") // Replace with your actual API route
      .then((response) => response.json())
      .then((data) => setPrompts(data))
      .catch((error) => console.error("Error fetching prompts:", error));
  }, []);

  return (
    <div className="prompt_card">
    <div className="flex justify-between items-start gap-5">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        
        <ul>
          {prompts.map((post) => (
            <li key={post._id} className="flex items-center space-x-4 mb-4">
              <img
                src={post.creator.image}
                alt="User"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h2 className=" text-gray-900 font-satoshi font-semibold">{post.creator.username}</h2>
                <p className="text-gray-500 font-inter text-sm ">{post.creator.email}</p>
                
              </div>
            </li>
          ))}
        </ul>
      </div>
        <div className="copy_btn" onClick={handleCopy}>
        <Image
          src={copied === post.prompt? '/assets/icons/tick.svg':
          '/assets/icons/copy.svg'
        }
        width ={12}
        height={12}
        />
      </div>
      
     
    </div>
    <ul>
    {prompts.map((post) => (
      <li key={post._id}>
        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p className="font-inter text-sm blue_gradient cursor-pointer"
           onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>
      </li>
    ))}
    </ul>
    <ul>
    {prompts.map((post) => (
      <li key={post.id}>
         {session?.user.id === post.creator._id && pathName === '/profile' && (
      <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3 ">
        <p className="font-inter text-sm green_gradient cursor-pointer"
        onClick={handleEdit}
        >
          Edit
        </p>
        <p className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={handleDelete}
        >
          Delete
        </p>
      </div>
    )}
      </li>
    ))}
    </ul>
   
    </div> 
    /*
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          
          <Image
            src={session.user.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className=" flex flex-col">
            <h3>{session.user.username}</h3>
            <p>{session.user.email}</p>
          </div> 
        </div>
      </div>
        </div>*/
        
  );
};

export default PromptCard;
