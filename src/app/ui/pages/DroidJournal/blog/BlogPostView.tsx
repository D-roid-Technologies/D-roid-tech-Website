import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./BlogPostView.module.css";
import { allPosts, generateSlug } from "../../../../utils/blogpost";
import ChessRegistration from "../chessR/ChessRegistration";

const BlogPostView: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate();

  if (!title) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Post Not Found</h2>
        <a href="/more/blog" className={styles.backLink}>
          ← Back to Blog
        </a>
      </div>
    );
  }

  const post = allPosts.find(
    (p) => generateSlug(p.title) === title.toLowerCase()
  );

  if (!post) {
    return (
      <div className={styles.notFoundContainer}>
        <h2>Post Not Found</h2>
        <p>
          The article you're looking for doesn't exist or may have been moved.
        </p>
        <a href="/more/blog" className={styles.backLink}>
          ← Back to Blog
        </a>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 4);

  return (
    <>
      <div className="wrapper">
        <div className="group justify-content-center">
          <div
            style={{
              marginTop: "40px",
              marginBottom: "60px",
              justifyContent: "space-between",
              textAlign: "center",
              display: "flex",
            }}
          >
            <span className="title_span">D'ROID BLOG</span>
            {/* <h1>{post.title}</h1> */}
            <div>
              <button
                onClick={() => navigate(-1)}
                className="back-btn"
                style={{ marginTop: "30px" }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.blogContainer}>
        <main className={styles.blogMain}>
          <article className={styles.blogArticle}>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className={styles.postHeroImage}
              />
            )}

            <h1 className={styles.blogPostTitle}>{post.title}</h1>

            <div className={styles.blogPostMeta}>
              <div className={styles.authorInfo}>
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className={styles.authorAvatar}
                />
                <span className={styles.postDetails}>{post.author}</span>
              </div>
              <div className={styles.postDetails}>
                <span>{post.date}</span>
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            <div className={styles.postContent}>
              {post.content?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            {post.title.includes("Clash of Kings") ? (
              <ChessRegistration />
            ) : post.title.includes("Tech Conference Calabar") ? (
              <a
                href="https://luma.com/5t04wsl8?tk=L47on9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#003366",
                  color: "#fff",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Register for {post.title}
              </a>
            ) : null}


          </article>
        </main>

        <aside className={styles.blogSidebar}>
          <h3>Related Posts</h3>
          {relatedPosts.map((related) => (
            <Link
              to={`/more/blog/${related.category.toLowerCase()}/${generateSlug(
                related.title
              )}`}
              key={related.id}
              className={styles.relatedPost}
            >
              <img
                src={related.image}
                alt={related.title}
                className={styles.relatedPostImg}
              />
              <div>
                <h4>{related.title}</h4>
                <span>{related.date}</span>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </>
  );
};

export default BlogPostView;
