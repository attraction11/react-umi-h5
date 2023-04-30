import styles from './{{{name}}}{{{ cssExt }}}';

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Page {{{ name }}}</h1>
    </div>
  );
}
