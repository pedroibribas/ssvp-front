export function objectsInArraysEqual(arrayA: any, arrayB: any) {
  const objectsEqual = (objectA: any, objectB: any) =>
    Object.keys(objectA).length === Object.keys(objectB).length &&
    Object.keys(objectA).every(key => objectA[key] === objectB[key]);

  return arrayA.length === arrayB.length &&
    arrayA.every((object: any, index: string) =>
      objectsEqual(object, arrayB[index])
    );
};
