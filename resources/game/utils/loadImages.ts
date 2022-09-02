export function loadImages(
  images: string[],
  onComplete: (timeStamp: number) => void
) {
  let imageObjects = [];

  let loaded = 0;

  function onLoad() {
    loaded++;
    console.log(loaded);
    if (loaded === images.length) {
      console.log("complete");
      onComplete(0);
    }
  }

  for (let i = 0; i < images.length; i++) {
    let img = new Image();
    img.addEventListener("load", onLoad);
    img.src = images[i];
    imageObjects.push(img);
  }
}
