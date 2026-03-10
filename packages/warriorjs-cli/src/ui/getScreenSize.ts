function getScreenSize(): [number, number] {
  return [process.stdout.columns, process.stdout.rows];
}

export default getScreenSize;
