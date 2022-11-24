import "./App.css";
import { useCallback, useState } from "react";
import Dropzone from "./Dropzone";
import cuid from "cuid";
import ImageList from "./ImageList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

function App() {
  const [images, setImages] = useState([]);
  const moveImage = (dragIndex, hoverIndex) => {
    const draggableImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggableImage],
        ],
      })
    );
  };
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop Example</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      <DndProvider backend={HTML5Backend}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
    </main>
  );
}

export default App;
