import React, { memo, Fragment } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import cn from "classnames";

const baseStyle = {
  // width: 200,
  // height: 200,
  // borderWidth: 2,
  // borderColor: "#666",
  // borderStyle: "dashed",
  // borderRadius: 5
};

const activeStyle = {
  borderStyle: "solid",
  borderColor: "#6c6",
  backgroundColor: "#eee"
};

const rejectStyle = {
  borderStyle: "solid",
  borderColor: "#c66",
  backgroundColor: "#eee"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const ImagePreview = props => {
  const {
    file,
    fileBase64,
    placeholderPath,
    imagePlaceholder,
    uploadPlaceHolder,
    getTranslation
  } = props;

  const fileType = (file && file.type) || "";
  const isImage = fileType.includes("image/");
  console.log(file);

  if (fileBase64 && isImage) {
    return (
      <img
        src={fileBase64}
        alt="preview"
        role="presentation"
        className="imageDropzone__image"
      />
    );
  }

  if (fileBase64 && fileType) {
    const [, fileExtension] = fileType.split("/");
    return (
      <img
        src={`${placeholderPath}/${fileExtension}.png`}
        alt="preview"
        role="presentation"
        className={cn("imageDropzone__image", file)}
      />
    );
  }

  return (
    <img
      alt="Upload Placeholder"
      className="upload-placeholder"
      src={uploadPlaceHolder}
    />
  );
};

const FilePicker = props => {
  const { file, fileBase64, accept, onDrop } = props;

  const handleDrop = files => {
    const [firstFile] = files;
    const reader = new FileReader();

    reader.readAsDataURL(firstFile);
    reader.onload = () => {
      onDrop(firstFile, reader.result);
    };
  };

  console.log({ file, fileBase64 });

  return (
    <div className="FilePicker">
      <Dropzone accept={accept} onDrop={handleDrop}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
          let styles = { ...baseStyle };
          styles = isDragActive ? { ...styles, ...activeStyle } : styles;
          styles = isDragReject ? { ...styles, ...rejectStyle } : styles;

          return (
            <div
              {...getRootProps()}
              style={styles}
              className="FilePicker-wrapper"
            >
              <div className="previewContainer" style={thumbsContainer}>
                <ImagePreview {...props} />
              </div>
              <div className="fileName">{file && file.name}</div>
              <div className="inputContainer">
                <input {...getInputProps()} />
                {!fileBase64 && (
                  <Fragment>
                    <div className="messageInfo">
                      Drag and drop a file, or click here to upload.
                    </div>
                    <div className="allowedFiels">
                      (Allowed file types: .pdf, .png, .jpg, .jpeg)
                    </div>
                  </Fragment>
                )}
              </div>
              {isDragReject && <div>Unsupported file type...</div>}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

FilePicker.defaultProps = {
  imagePlaceholder: "/imgs/app/image_placeholder.png",
  placeholderPath: "",
  uploadPlaceHolder:
    "http://www.wesaturate.com/public/images/upload-placeholder.svg"
};

FilePicker.propTypes = {
  uploadPlaceHolder: PropTypes.string,
  imagePlaceholder: PropTypes.string,
  onDrop: PropTypes.func.isRequired
};

export default memo(FilePicker);
