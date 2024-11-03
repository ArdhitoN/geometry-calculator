"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./styles/Home.module.css";

export default function Home() {
  const [squareSide, setSquareSide] = useState("");
  const [cubeSide, setCubeSide] = useState("");
  const [squareArea, setSquareArea] = useState();
  const [cubeSurfaceArea, setCubeSurfaceArea] = useState();
  const [loadingSquare, setLoadingSquare] = useState(false);
  const [loadingCube, setLoadingCube] = useState(false);
  const [error, setError] = useState(null);

  const calculateSquareArea = async () => {
    if (!squareSide) return;
    setLoadingSquare(true);
    setError(null);

    const body = { panjang_sisi: squareSide };
    // console.log("Sending square request with body:", body);

    try {
      const response = await axios.post("/api/square", body);
      // console.log("Square response:", response);
      if (response.data && response.data.luas !== undefined) {
        setSquareArea(response.data.luas);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      // console.error("Square calculation error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to calculate square area"
      );
    } finally {
      setLoadingSquare(false);
    }
  };

  const calculateCubeSurfaceArea = async () => {
    if (!cubeSide) return;
    setLoadingCube(true);
    setError(null);

    const body = { panjang_rusuk: cubeSide };
    // console.log("Sending cube request with body:", body);

    try {
      const response = await axios.post("/api/cube", body);
      // console.log("Cube response:", response);
      if (response.data && response.data.luas_permukaan !== undefined) {
        setCubeSurfaceArea(response.data.luas_permukaan);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      // console.error("Cube calculation error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to calculate cube surface area"
      );
    } finally {
      setLoadingCube(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Area Calculator</h1>

      <div className={styles.card}>
        <h2>Square Area</h2>
        <input
          type="number"
          value={squareSide}
          onChange={(e) => setSquareSide(e.target.value)}
          placeholder="Enter side length"
          className={styles.input}
        />
        <button
          onClick={calculateSquareArea}
          className={styles.button}
          disabled={loadingSquare}
        >
          {loadingSquare ? "Calculating..." : "Calculate"}
        </button>
        {squareArea !== null && squareArea !== undefined && (
          <div className={styles.result}>
            <p>Result:</p>
            <h3>{squareArea}</h3>
          </div>
        )}
      </div>

      <div className={styles.card}>
        <h2>Cube Surface Area</h2>
        <input
          type="number"
          value={cubeSide}
          onChange={(e) => setCubeSide(e.target.value)}
          placeholder="Enter edge length"
          className={styles.input}
        />
        <button
          onClick={calculateCubeSurfaceArea}
          className={styles.button}
          disabled={loadingCube}
        >
          {loadingCube ? "Calculating..." : "Calculate"}
        </button>
        {cubeSurfaceArea !== null && cubeSurfaceArea !== undefined && (
          <div className={styles.result}>
            <p>Result:</p>
            <h3>{cubeSurfaceArea}</h3>
          </div>
        )}
      </div>

      {error && <p className={styles.error}>Error: {error}</p>}
    </div>
  );
}
