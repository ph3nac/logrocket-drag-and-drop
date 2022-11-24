import { useDropzone } from "react-dropzone";

const Dropzone = ({ onDrop, accept, _ref }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    accept: accept,
    multiple: false,
  });
  return (
    <div ref={_ref}>
      <div className="dropzone-div" {...getRootProps()}>
        <input className="dropzone-input" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Release to drop the files here</p>
          ) : (
            <p className="dropzone-content">
              Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
