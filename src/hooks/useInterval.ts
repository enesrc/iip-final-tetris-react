import { useRef, useEffect } from 'react';

// useInterval hook'u, belirli bir gecikme ile blokları düşürmek için kullanılıyor
export function useInterval(callback: () => void, delay: number | null): void {
  const callbackRef = useRef(callback); // callback işlevini saklamak için useRef kullanılır

  // callback işlevi değiştiğinde callbackRef.current güncellenir
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // delay değiştiğinde veya ilk render'da interval ayarlanır
  useEffect(() => {
    if (delay == null) return; // delay null ise hiçbir şey yapma

    const intervalID = setInterval(() => callbackRef.current(), delay); // interval oluştur ve callbackRef.current'i çağır
    return () => clearInterval(intervalID); // cleanup: interval'i temizle
  }, [delay]);
}