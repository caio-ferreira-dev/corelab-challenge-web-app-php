import { useNotesQuery } from "@/services/notes/useNotesQuery";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.scss";
import Head from "next/head";
import NewNote from "@/components/NewNote";
import Header from "@/components/Header";
import Note from "@/components/Note";
import INote from "@/interfaces/INote";
import ColorFilter from "@/components/ColorFilter";

export default function Dashboard() {
  const router = useRouter();
  const { data } = useNotesQuery();
  const [query, setQuery] = useState("");
  const [colorSelected, setColorSelected] = useState("white");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      router.push("/login");
    }
  }, [router]);

  function renderList(listType: string, dataArray: INote[] | undefined) {
    if (!dataArray) return;
    const renderSearch = query.length >= 1 ? true : false;
    const filterByColor = colorSelected.length >= 1 ? true : false;
    
    const renderedElements = dataArray.map((note: INote, key: number) => {
      if (
        filterByColor &&
        note.color !== colorSelected &&
        colorSelected !== "white"
      ) {
        return;
      }
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
    });

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
        <div><h2>{listType}</h2></div>
        <div className={styles.notesList}>
          {renderedElements.filter(Boolean).length > 0 ? (
            renderedElements.filter(Boolean)
          ) : (
            <p className={styles.queryResult}>Nenhuma nota encontrada</p>
          )}
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
          <ColorFilter
            color={colorSelected}
            setFilteredColor={setColorSelected}
          />
          {renderList("Favoritas", data)}
          {renderList("Outras", data)}
        </div>
      </div>
    </>
  );
}
