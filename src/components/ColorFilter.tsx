import styles from "@/styles/colorFilter.module.scss";
import { useEffect, useRef, useState } from "react";
import ColorBar from "./ColorBar";

interface ColorFilterProps {
  color: string;
  setFilteredColor: (color: string) => void;
}

export default function ColorFilter({
  color,
  setFilteredColor,
}: ColorFilterProps) {
  const [showFilter, setShowFilter] = useState(false);
  const filterListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: React.MouseEvent | MouseEvent) {
      if (
        filterListRef.current &&
        !filterListRef.current.contains(e.target as Node)
      ) {
        setShowFilter(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
  }, [setShowFilter]);

  return (
    <section className={styles.colorFilterSection}>
      <div className={styles.colorFilterContainer}>
        <p style={{ color: "#333333" }}>Filtrar por cor </p>
        <div className={styles.colorSelector}>
          <div className={styles[`${color === "white" ? "whiteSelector" : color}`]}></div>
          <button
            style={{ backgroundColor: "#FFFFFF" }}
            onClick={() => setShowFilter(true)}
          >
            <svg
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.4714 4.47139C4.21105 4.73174 3.78894 4.73174 3.5286 4.47139L0.195262 1.13806C-0.0650879 0.877711 -0.0650879 0.455601 0.195262 0.195252C0.455611 -0.0650976 0.877722 -0.0650976 1.13807 0.195252L4 3.05718L6.86193 0.195252C7.12228 -0.0650976 7.54439 -0.0650976 7.80474 0.195252C8.06509 0.455601 8.06509 0.877711 7.80474 1.13806L4.4714 4.47139Z"
                fill="#4B5768"
              />
            </svg>
          </button>
          {showFilter && (
            <ColorBar setColor={setFilteredColor} setState={setShowFilter} />
          )}
        </div>
      </div>
    </section>
  );
}

/*
type ColorClass = "lightBlue" | "green" | "yellow" | "pink" | "red" | "blue" | "purple" | "lime" | "orange" | "gray" | "black" | "brown"

 <ul onClick={handleColorFilterClick} ref={filterListRef}>
                <li className={styles.lightBlue} onClick={() => handleColorSelect("lightBlue")}></li>
                <li className={styles.green} onClick={() => handleColorSelect("green")}></li>
                <li className={styles.yellow} onClick={() => handleColorSelect("yellow")}></li>
                <li className={styles.pink} onClick={() => handleColorSelect("pink")}></li>
                <li className={styles.red} onClick={() => handleColorSelect("red")}></li>
                <li className={styles.blue} onClick={() => handleColorSelect("blue")}></li>
                <li className={styles.purple} onClick={() => handleColorSelect("purple")}></li>
                <li className={styles.lime} onClick={() => handleColorSelect("lime")}></li>
                <li className={styles.orange} onClick={() => handleColorSelect("orange")}></li>
                <li className={styles.gray} onClick={() => handleColorSelect("gray")}></li>
                <li className={styles.black} onClick={() => handleColorSelect("black")}></li>
                <li className={styles.brown} onClick={() => handleColorSelect("brown")}></li>
            </ul>
*/
