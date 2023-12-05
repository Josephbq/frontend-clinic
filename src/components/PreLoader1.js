import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Logof from "../forms/Logoform";

function PreLoader1() {
  const [data, setData] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => {
          setData(json);
          setDone(true);
        });
    }, 2000);
  }, []);

  return (
    <>
    <div className="flex items-center justify-center h-screen">
      {!done ? (
        <>
            <ReactLoading
                type={"bars"}
                color={"#4b0082"}
                height={100}
                width={100}
            />
            <Logof />
        </>
      ) : (
        <ul>
          {data.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
      </div>
    </>
  );
}

export default PreLoader1;