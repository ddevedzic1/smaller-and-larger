import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import {
  removeCharFromString,
  sortDigitsAsc,
  sortDigitsDesc,
  getPositionOfFirstLargerDigit,
  getPositionOfFirstSmallerDigit,
} from "../common/helpers";

export default function Home() {
  const [number, setNumber] = useState("");
  const [smaller, setSmaller] = useState(null);
  const [larger, setLarger] = useState(null);
  const [error, setError] = useState(false);

  const getSmaller = (number) => {
    for (let i = number.length - 1; i > 0; i--) {
      if (number[i - 1] > number[i]) {
        let positionFirstSmaller = getPositionOfFirstSmallerDigit(
          number,
          i - 1
        );
        let rest = removeCharFromString(
          number.slice(i - 1),
          positionFirstSmaller - i + 1
        );
        rest = sortDigitsDesc(rest);
        let result =
          number.slice(0, i - 1) + number[positionFirstSmaller] + rest;
        if (result[0] === "0") return null;
        return result;
      }
    }
    return null;
  };

  const getLarger = (number) => {
    for (let i = number.length - 1; i > 0; i--) {
      if (number[i - 1] < number[i]) {
        let positionFirstLarger = getPositionOfFirstLargerDigit(number, i - 1);
        let rest = removeCharFromString(
          number.slice(i - 1),
          positionFirstLarger - i + 1
        );
        rest = sortDigitsAsc(rest);
        let result =
          number.slice(0, i - 1) + number[positionFirstLarger] + rest;
        if (result[0] === "0") return null;
        return result;
      }
    }
    return null;
  };

  const isValidNumber = (number) => {
    if (
      !isNaN(number) &&
      !isNaN(parseInt(number)) &&
      parseInt(number) >= 100 &&
      parseInt(number) <= 10000
    )
      return true;
    return false;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Smaller and Larger</title>
        <meta
          name="description"
          content="Generating the first smaller and the first larger number with the same digits for the given number."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hi, I'm glad you're here</h1>

        <p className={styles.description}>
          Enter an integer between 100 and 10000
        </p>

        <div>
          <input
            placeholder="Enter number"
            onChange={(e) => {
              setNumber(e?.target?.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              if (!isValidNumber(number)) {
                setError(true);
                setSmaller(null);
                setLarger(null);
                return;
              }
              setSmaller(getSmaller(number));
              setLarger(getLarger(number));
              setError(false);
            }}
          >
            Generate
          </button>
          {error && <p className={styles.error}>Invalid value</p>}

          <div className={styles.grid}>
            <div className={styles.card}>
              <p>Smaller</p>
              <div>{smaller ? smaller : "-"}</div>
            </div>
            <div className={styles.card}>
              <p>Larger</p>
              <div>{larger ? larger : "-"}</div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>Dzenan Devedzic</footer>
    </div>
  );
}
