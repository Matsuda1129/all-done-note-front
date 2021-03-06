import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Layout } from '../../components/Home';
import { Loader, PostView } from '../../components/parts';
import { commentRepository, postsRepository } from '../../repositories';
import Styles from '../../styles/postDetail.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from '../../components/utils';
import { useForm } from 'react-hook-form';
import { setFalse, setTrue } from '../../redux/isUseEffect';
import { DeleteBtn } from '../../components/PostDetail';

type FormValuse = {
  comment: string;
};

export default function PostDetail() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [pageId, setPageId] = useState(Number);
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(2);
  const loginUser = useSelector((state: RootState) => state.users.user);
  const isUseEffect = useSelector(
    (state: RootState) => state.isUseEffect.isUseEffect
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuse>();
  useEffect(() => {
    setPageId(Number(router.query.id));
  }, [router.query]);

  useEffect(() => {
    if (pageId) {
      const firstFetch = async () => {
        try {
          await dispatch(setFalse());
          const postData = await postsRepository.findPostById(pageId);
          await setPost(postData);
          const commentsData = await commentRepository.fetchComment(pageId, 1);
          await setComments(commentsData);
          await setPage(2);
          await setHasMore(true);
        } catch (error) {
          console.log(error);
        }
      };
      firstFetch();
    }
  }, [pageId, isUseEffect, dispatch]);

  const fetchData = async () => {
    const componentsFormServer = await commentRepository.fetchComment(
      pageId,
      page
    );
    setComments([...comments, ...componentsFormServer]);
    if (componentsFormServer.length === 0 || componentsFormServer.length < 20) {
      setHasMore(false);
    }
    setPage(page + 1);
  };

  const onSubmit = async (data) => {
    await commentRepository.create(loginUser.id, pageId, data.comment);
    await dispatch(setTrue());
  };

  return (
    <>
      {post ? (
        <Layout>
          <div>
            <div className={Styles.margin_bar}></div>
            <PostView post={post} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.comment && (
              <div style={{ color: 'red' }}>{errors.comment.message}</div>
            )}
            <div className={Styles.flex_container_row}>
              <div className={Styles.icon_margin}>
                <Image
                  className={Styles.triming}
                  priority
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}` + loginUser.icon}
                  height={50}
                  width={50}
                  alt={'????????????'}
                  layout={'fixed'}
                />
              </div>
              <textarea
                {...register('comment', {
                  required: '???????????????????????????????????????',
                  maxLength: {
                    value: 50,
                    message: '50??????????????????????????????',
                  },
                })}
                // rows={1}
                placeholder='??????????????????'
                className={Styles.textarea}
              ></textarea>
              <div className={Styles.comment_btn}>
                <Button type='submit'>??????????????????</Button>
              </div>
            </div>
          </form>
          <div style={{ border: ' 1px solid gray' }}></div>
          <h2 style={{ margin: ' 2rem' }}>??????????????????</h2>
          <div style={{ border: ' 1px solid gray' }}></div>

          <InfiniteScroll
            dataLength={comments.length}
            next={fetchData}
            hasMore={hasMore}
            loader={<Loader posts={comments} />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {comments.map((comment) => {
              return (
                <div className={Styles.border} key={comment.id}>
                  <div className={Styles.flex_container}>
                    <div className={Styles.namebar}>
                      <Image
                        className={Styles.triming}
                        priority
                        src={
                          `${process.env.NEXT_PUBLIC_IMAGE_URL}` +
                          comment.user.icon
                        }
                        height={50}
                        width={50}
                        alt={'????????????'}
                      />
                      <div className={Styles.name}>
                        <Link href={`../users/${comment.user.name}`}>
                          <a href=''>{comment.user.name}</a>
                        </Link>
                      </div>
                      <DeleteBtn comment={comment} />
                    </div>
                    <div className={Styles.content}>{comment.comment}</div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        </Layout>
      ) : (
        <Layout>
          <div>???????????????????????????</div>
        </Layout>
      )}
    </>
  );
}
