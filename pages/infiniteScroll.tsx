import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
export default function Index() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        'http://localhost:3004/comments?_page=1&_limit=20'
      );

      const data = await res.json();
      setItems(data);
    };
    getComments();
  }, []);

  const fetchComments = async () => {
    const res = await fetch(
      `http://localhost:3004/comments?_page=${page}&_limit=20`
    );

    const data = await res.json();

    return data;
  };

  const fetchData = async () => {
    const componentsFormServer = await fetchComments();
    setItems([...items, ...componentsFormServer]);

    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <div>
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((item) => {
          return (
            <div key={item.id}>
              <div>id:{item.id}</div>
              <div>email:{item.email}</div>
              <div>comment:{item.body}</div>
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
