export function fileToBinary(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // reader.result is an ArrayBuffer
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}
