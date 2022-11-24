import "./App.css";
import { useCallback, useRef, useState } from "react";
import Dropzone from "./Dropzone";
import cuid from "cuid";
import ImageList from "./ImageList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const App = () => {
  const ref = useRef();
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
    const div = ref.current;
    div.className = "no-displayj";
    ref.current.className = "no-display";
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
      <Dropzone
        _ref={ref}
        onDrop={onDrop}
        accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
      />
      <DndProvider backend={HTML5Backend}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
    </main>
  );
};

export default App;
