import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "@/styles/newNote.module.scss";
import Image from "next/image";
import INote from "../interfaces/INote";
import { useCreateMutation } from "@/services/notes/useCreateMutation";

const defaultState = {
  id: 0,
  created_at: new Date(),
  updated_at: new Date(),
  name: "",
  content: "",
  favorite: false,
  color: "white",
};

export default function NewNote() {
  const [note, setNote] = useState<INote>(defaultState);
  const [formError, setFormError] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const createNote = useCreateMutation();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [note.content]);

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setNote({ ...note, name: e.target.value });
  }
  function handleFavoriteChange() {
    setNote({ ...note, favorite: !note.favorite });
  }
  function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setNote({ ...note, content: e.target.value });
  }
  async function handleNoteSave() {
    if (note.name.length < 1) {
      setFormError("Adicione um Título à nota.");
      return;
    }
    if (note.content.length < 1) {
      setFormError("Adicione conteúdo à nota.");
      return;
    }
    setFormError("");

    const { name, content, favorite, color } = note;

    createNote.mutateAsync({ name, content, favorite, color });

    setNote(defaultState);
  }

  return (
    <div className={styles.newNoteContainer}>
      <div className={styles.titleContainer}>
        <input
          type="text"
          placeholder="Título"
          value={note.name}
          onChange={handleTitleChange}
        />
        {note.favorite ? (
          <Image
            alt="Favorite icon"
            src={"/images/favorite_icon.png"}
            width={16}
            height={16}
            onClick={handleFavoriteChange}
          ></Image>
        ) : (
          <Image
            alt="Favorite icon"
            src={"/images/not_favorite_icon.png"}
            width={16}
            height={16}
            onClick={handleFavoriteChange}
          ></Image>
        )}
      </div>
      <textarea
        placeholder="Criar nota..."
        value={note.content}
        ref={textAreaRef}
        onChange={handleContentChange}
      />
      <div className={styles.buttonDiv}>
        {formError ? <span>{formError}</span> : ""}
        <button onClick={handleNoteSave}></button>
      </div>
    </div>
  );
}
