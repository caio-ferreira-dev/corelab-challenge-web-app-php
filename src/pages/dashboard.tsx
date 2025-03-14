import { useNotesQuery } from "@/services/notes/useNotesQuery";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.scss";
import Head from "next/head";
import NewNote from "@/components/NewNote";
import Header from "@/components/Header";
import Note from "@/components/Note";
import INote from "@/interfaces/INote";

export default function Dashboard() {
  const router = useRouter();
  const { data } = useNotesQuery();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      router.push("/login");
    }
  }, [router]);

  function renderList(listType: string, dataArray: INote[] | undefined) {
    if (!dataArray) return;
    const renderSearch = query.length >= 1 ? true : false;
    const favoriteFilter =
      dataArray.filter((note) => note.favorite).length >= 1 ? true : false;
    const otherFilter =
      dataArray.filter((note) => !note.favorite).length >= 1 ? true : false;
    const renderFavorite = renderSearch
      ? dataArray.filter(
          (note) =>
            note.name.toLowerCase().includes(query.toLowerCase()) &&
            note.favorite
        ).length >= 1
      : favoriteFilter;
    const renderOther = renderSearch
      ? dataArray.filter(
          (note) =>
            note.name.toLowerCase().includes(query.toLowerCase()) &&
            !note.favorite
        ).length >= 1
      : otherFilter;

    const render =
      listType === "Favoritas"
        ? renderFavorite
        : listType === "Outras"
        ? renderOther
        : "";

    return (
      <div
        className={`${
          listType === "Favoritas"
            ? styles.favorite
            : listType === "Outras"
            ? styles.other
            : ""
        }`}
      >
        <div>{render ? <h2>{listType}</h2> : ""}</div>
        <div className={styles.notesList}>
          {dataArray.map((note: INote, key: number) => {
            const noteName = note.name.toLocaleLowerCase();
            if (renderSearch) {
              if (noteName.includes(query.toLocaleLowerCase())) {
                if (note.favorite && listType === "Favoritas") {
                  return <Note noteData={note} key={key} />;
                }
                if (!note.favorite && listType === "Outras") {
                  return <Note noteData={note} key={key} />;
                }
              }
              return;
            }
            if (note.favorite && listType === "Favoritas") {
              return <Note noteData={note} key={key} />;
            }
            if (!note.favorite && listType === "Outras") {
              return <Note noteData={note} key={key} />;
            }
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>CoreNotes</title>
      </Head>
      <div className={styles.mainContainer}>
        <Header query={query} setQuery={setQuery} />
        <div className={styles.contentContainer}>
          <NewNote />
          {renderList("Favoritas", data)}
          {renderList("Outras", data)}
        </div>
      </div>
    </>
  );
}
