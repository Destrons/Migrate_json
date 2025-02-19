import styles from "./page.module.css";
import PostList from "@/components/PostList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
          <h1 className="text-4xl font-bold">Bem-vindo ao Next.js</h1>
          <PostList/>        
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
