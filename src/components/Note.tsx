import Image from "next/image";
import styles from "@/styles/note.module.scss"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import INote  from '../interfaces/INote'
import ColorBar from "./ColorBar";
import { useUpdateMutation } from "@/services/notes/useUpdateMutation";
import { useDeleteMutation } from "@/services/notes/useDeleteMutation";

interface NoteProps {
    noteData: INote;
}

export default function Note({noteData}: NoteProps) {
    const [note, setNote] = useState<INote>(noteData)
    const [isEditing, setIsEditing] = useState(false)
    const prevIsEditing = useRef(isEditing);
    const [choosingColor, setChoosingColor] = useState(false)
    const updateMutation = useUpdateMutation();
    const deleteMutation = useDeleteMutation();

    useEffect(() => {
        if (prevIsEditing.current === true && isEditing === false) {
            refetchNotes();
        }
        prevIsEditing.current = isEditing;
    }, [isEditing])

    function refetchNotes() {
        const { id, name, content, color, favorite } = note
        updateMutation.mutateAsync({id, name, content, favorite, color })
    }

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        setNote({...note, name: e.target.value})
    } 
    function handleContentChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setNote({...note, content: e.target.value })
    }
    function handleFavoriteChange() {
        if(isEditing) {
            setNote({...note, favorite: !note.favorite})
        }
    }

    async function handleEdit() {
        if(isEditing) {
            setIsEditing(false)
        }
        else{
            setIsEditing(true)
        }      
    }

    async function handleDelete() {
        deleteMutation.mutateAsync({id: note.id})
    }

    function handleColor() {
        setChoosingColor(!choosingColor)
    }

    async function setColor(color: string) {
    
        const { id, name, content, favorite } = note
        updateMutation.mutateAsync({id, name, content, favorite, color })
    }

    return (
        <div className={`${styles.noteContainer} ${styles[note.color]}`}>
            <div className={styles.titleContainer}>
                <input type="text" placeholder='Título' readOnly={!isEditing} value={note.name} onChange={handleTitleChange}/>
                {note.favorite ? 
                    <Image alt='Favorite icon' src={'/images/favorite_icon.png'} width={16} height={16} onClick={handleFavoriteChange}></Image> :
                    <Image alt='Favorite icon' src={'/images/not_favorite_icon.png'} width={16} height={16} onClick={handleFavoriteChange}></Image>
                }
            </div>
            <textarea readOnly={!isEditing} value={note.content} onChange={handleContentChange}/>
            <div className={styles.optionsContainer}>
                <div className={`${styles.buttonContainer} ${ isEditing ? styles.editing : styles.editOption }`} onClick={handleEdit} >
                    <button className={styles.optionButton}></button>
                </div>  
                <div className={`${styles.buttonContainer} ${styles.colorOption} ${choosingColor ? styles.selectingColor : ''}`}>
                    <button className={`${styles.optionButton} ${styles.colorButton}`} onClick={handleColor}></button>
                    {choosingColor ? <ColorBar setState={setChoosingColor} setColor={setColor}/> : ''}
                </div>
                <div className={`${styles.buttonContainer} ${styles.deleteOption}`} onClick={handleDelete}>
                    <button className={styles.optionButton}></button>
                </div>
            </div>
        </div>
    )
}